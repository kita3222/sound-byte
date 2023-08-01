import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { createArticle } from 'src/graphql/mutations';
import { GraphQLResult, graphqlOperation } from '@aws-amplify/api-graphql';
import {
  CreateArticleMutationVariables,
  GenerateSummaryTextQueryQuery,
  TextToGenerateSpeechQuery,
  TextToGenerateSpeechQueryVariables,
} from 'src/API';
import { generateSummaryTextQuery, textToGenerateSpeech } from 'src/graphql/queries';
import { API, Amplify } from 'aws-amplify';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

Amplify.configure({
  aws_project_region: process.env.NEXT_PUBLIC_AWS_AMPLIFY_REGION,
  aws_appsync_region: process.env.NEXT_PUBLIC_AWS_AMPLIFY_REGION,
  aws_appsync_authenticationType: process.env.NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATION_TYPE,
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_AWS_APPSYNC_ENDPOINT,
  ssr: true,
});

// ----------------------------------------------------------------------

type FormValuesProps = {
  url: string;
};

export default function ArticleCreateForm() {
  const { user } = useAuthContext();
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewArticleSchema = Yup.object().shape({
    url: Yup.string().required('URL is required').url('URL is invalid'),
  });

  const defaultValues = useMemo(
    () => ({
      url: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewArticleSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        const generateSummaryTextResponse = (await API.graphql(
          graphqlOperation(generateSummaryTextQuery, {
            url: data.url,
          })
        )) as GraphQLResult<GenerateSummaryTextQueryQuery>;

        const textToGenerateSpeechResponse = (await API.graphql<TextToGenerateSpeechQueryVariables>(
          graphqlOperation(textToGenerateSpeech, {
            input: {
              convertTextToSpeech: {
                voiceID: 'Emma',
                text: generateSummaryTextResponse.data?.generateSummaryTextQuery.summaryText,
              },
            },
          })
        )) as GraphQLResult<TextToGenerateSpeechQuery>;

        await API.graphql<CreateArticleMutationVariables>(
          graphqlOperation(createArticle, {
            input: {
              title: generateSummaryTextResponse.data?.generateSummaryTextQuery.title,
              content: generateSummaryTextResponse.data?.generateSummaryTextQuery.summaryText,
              sourceUrl: data.url,
              speechUrl: textToGenerateSpeechResponse.data?.textToGenerateSpeech,
              userId: user?.id ?? '',
            },
          })
        );
        reset();
        enqueueSnackbar('Create success!');
        router.push(paths.list);
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Create failed!', { variant: 'error' });
      }
    },
    [enqueueSnackbar, reset, router, user?.id]
  );
  const renderURL = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Create Article
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Register the URL of the article you want to summarize
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Create Article" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">URL</Typography>
              <RHFTextField name="url" placeholder="Ex: https://www.bbc.com/news" />
            </Stack>
            <Stack alignItems="flex-end">
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Send
              </LoadingButton>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {renderURL}
      </Grid>
    </FormProvider>
  );
}

'use client';

import { useEffect, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
import { ArticlesByUserIdQuery, ArticlesByUserIdQueryVariables } from 'src/API';
import { articlesByUserId } from 'src/graphql/queries';
import { GraphQLResult, graphqlOperation } from '@aws-amplify/api-graphql';
import { API, Amplify } from 'aws-amplify';
import { useAuthContext } from 'src/auth/hooks';
import AudioDialog from 'src/components/custom-dialog/audio-dialog';
import ArticleTableRow from '../article-table-row';

// ----------------------------------------------------------------------

Amplify.configure({
  aws_project_region: process.env.NEXT_PUBLIC_AWS_AMPLIFY_REGION,
  aws_appsync_region: process.env.NEXT_PUBLIC_AWS_AMPLIFY_REGION,
  aws_appsync_authenticationType: process.env.NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATION_TYPE,
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_AWS_APPSYNC_ENDPOINT,
  ssr: true,
});

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title' },
  { id: 'content', label: 'Summary' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ArticleListView() {
  const settings = useSettingsContext();

  const { user } = useAuthContext();

  const table = useTable({ defaultOrderBy: 'createDate' });

  const [articles, setArticles] = useState<GraphQLResult<ArticlesByUserIdQuery> | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [openAudio, setOpenAudio] = useState<boolean>(false);

  const isNotFound = articles?.data?.articlesByUserId?.items.length === 0;

  const denseHeight = table.dense ? 56 : 76;

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchArticles() {
    try {
      const articleData = (await API.graphql<ArticlesByUserIdQueryVariables>(
        graphqlOperation(articlesByUserId, { userId: user?.id ?? '' })
      )) as GraphQLResult<ArticlesByUserIdQuery>;

      setArticles(articleData);
    } catch (err) {
      console.log('error fetching articles');
    }
  }

  const onClose = () => {
    setOpenAudio(false);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Article List"
        links={[
          {
            name: 'Create',
            href: paths.create,
          },
          {
            name: 'List',
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.create}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Article
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={articles?.data?.articlesByUserId?.items.length || 0}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                articles?.data?.articlesByUserId?.items.map((row) => row?.id ?? '') ?? ['']
              )
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    articles?.data?.articlesByUserId?.items.map((row) => row?.id ?? '') ?? ['']
                  )
                }
              />

              <TableBody>
                {articles?.data?.articlesByUserId?.items
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ArticleTableRow
                      key={row?.id}
                      row={row}
                      selected={table.selected.includes(row?.id ?? '')}
                      setOpenAudio={setOpenAudio}
                      setAudioUrl={setAudioUrl}
                      setTitle={setTitle}
                      setContent={setContent}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    articles?.data?.articlesByUserId?.items.length ?? 0
                  )}
                />

                <TableNoData notFound={isNotFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={articles?.data?.articlesByUserId?.items.length ?? 0}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
        {openAudio && (
          <AudioDialog
            open={openAudio}
            onClose={onClose}
            title={title}
            content={content}
            url={audioUrl}
          />
        )}
      </Card>
    </Container>
  );
}

/* Amplify Params - DO NOT EDIT
	API_SOUNDBYTE_GRAPHQLAPIENDPOINTOUTPUT
	API_SOUNDBYTE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /**
 *
 * This CloudFormation Trigger creates a handler which awaits the other handlers
 * specified in the `MODULES` env var, located at `./${MODULE}`.
 */
require('isomorphic-fetch');
const gql = require('graphql-tag');
const AWSAppSyncClient = require('aws-appsync').default;

const credentials = {
  accessKeyId: process.env['AWS_ACCESS_KEY_ID'] || '',
  secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'] || '',
  sessionToken: process.env['AWS_SESSION_TOKEN'] || '',
};

exports.handler = async (event, _context) => {
  const createUser = gql`
    mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
      createUser(input: $input, condition: $condition) {
        id
        email
        articles {
          items {
            id
            title
            content
            sourceUrl
            speechUrl
            userId
            createdAt
            updatedAt
            userArticlesId
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
    }
  `;

  const appSyncClient = new AWSAppSyncClient({
    url: process.env['API_SOUNDBYTE_GRAPHQLAPIENDPOINTOUTPUT'] ?? '',
    region: process.env['AWS_REGION'] ?? '',
    auth: {
      type: 'AWS_IAM',
      credentials: credentials,
    },
    disableOffline: true,
  });

  try {
    await appSyncClient.mutate({
      mutation: createUser,
      variables: {
        input: {
          id: event.userName,
          email: event.request.userAttributes.email,
        },
      },
    });

    return event;
  } catch (error) {
    console.error(error);
    throw new Error('internal server error');
  }
};

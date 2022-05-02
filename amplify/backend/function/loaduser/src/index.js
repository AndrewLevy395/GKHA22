/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function getItem(params) {
  try {
    const data = await docClient.get(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  const userid = event.queryStringParameters.username;
  let data = {};
  const params = {
    TableName: "franchiseData-dev",
    /* Item properties will depend on your application concerns */
    Key: {
      username: userid,
    },
  };
  try {
    data = await getItem(params);
  } catch (err) {}
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(data.Item),
  };
};

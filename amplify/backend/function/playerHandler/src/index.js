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
  let player = {};
  const playerId = event.pathParameters.playerId;
  const params = {
    TableName: "playersData",
    /* Item properties will depend on your application concerns */
    Key: {
      playerId: event.pathParameters.playerId,
    },
  };
  try {
    const data = await getItem(params);
    player = {
      playerId: playerId,
      playerName: data.Item.firstName + " " + data.Item.lastName,
    };
  } catch (err) {
    player = { playerId: playerId };
  }
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(player),
  };
};

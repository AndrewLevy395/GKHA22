const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function createItem(params) {
  try {
    const response = await docClient.put(params).promise();
    return response;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  const eventdetails = JSON.parse(event.body);
  const params = {
    TableName: "franchiseData-dev",
    /* Item properties will depend on your application concerns */
    Item: {
      username: eventdetails.username,
      team: eventdetails.team,
    },
    ConditionExpression: "attribute_not_exists(username)",
    ReturnValuesOnConditionCheckFailure: "ALL_OLD",
  };

  try {
    const itemres = await createItem(params);
    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(itemres),
    };
  } catch (err) {
    return { error: err };
  }
};

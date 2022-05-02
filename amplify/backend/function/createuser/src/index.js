const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const teamlist = require("./teamlist.js");

async function createFranchiseItem(params) {
  try {
    const response = await docClient.put(params).promise();
    return response;
  } catch (err) {
    return err;
  }
}

async function createTeamItem(params) {
  try {
    const response = await docClient.put(params).promise();
    return response;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  const eventdetails = JSON.parse(event.body);
  let franchiseres, userteamnum;
  for (let team in teamlist) {
    if (teamlist[team].team === eventdetails.team) {
      userteamnum = Number(team) + 1;
    }
  }
  const mainparams = {
    TableName: "franchiseData-dev",
    /* Item properties will depend on your application concerns */
    Item: {
      username: eventdetails.username,
      userteam: eventdetails.team,
      userteamnum: "team" + String(userteamnum),
      season: 8,
      week: 1,
      team1: teamlist[0].team,
      team2: teamlist[1].team,
      team3: teamlist[2].team,
      team4: teamlist[3].team,
      team5: teamlist[4].team,
      team6: teamlist[5].team,
      team7: "",
      team8: "",
    },
    ConditionExpression: "attribute_not_exists(username)",
    ReturnValuesOnConditionCheckFailure: "ALL_OLD",
  };

  try {
    franchiseres = await createFranchiseItem(mainparams);
  } catch (err) {
    return { error: err };
  }

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(franchiseres),
  };
};

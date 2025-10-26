const msal = require('@azure/msal-node');
require('dotenv').config();

const msalConfig = {
  auth: {
    clientId: process.env.MS_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID || 'common'}`,
    clientSecret: process.env.MS_CLIENT_SECRET,
  },
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getAppToken(scopes = [process.env.MS_SCOPE || 'https://graph.microsoft.com/.default']) {
  const result = await cca.acquireTokenByClientCredential({ scopes });
  return result.accessToken;
}

module.exports = { getAppToken };

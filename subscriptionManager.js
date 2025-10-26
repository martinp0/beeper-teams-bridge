const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const { getAppToken } = require('./msalAuth');

const CLIENT_STATE = 'beeper-bridge-clientstate';

async function createSubscription(resource, notificationUrl, expirationDateTimeIso) {
  const token = await getAppToken();
  const body = {
    changeType: 'created,updated',
    notificationUrl,
    resource,
    expirationDateTime: expirationDateTimeIso,
    clientState: CLIENT_STATE,
  };
  const res = await fetch('https://graph.microsoft.com/v1.0/subscriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Create subscription failed ${res.status}: ${text}`);
  }
  return await res.json();
}

async function forwardToBeeper(notification) {
  // Placeholder: zde zavolat interní Beeper API / Matrix bridge mapping
  // Např. POST do místního bridge management endpointu, nebo přímo zpracovat notifikaci
  // For scaffold, just log and optionally fetch full message if resourceData is absent
  console.log('Forwarding to Beeper (placeholder):', JSON.stringify(notification).slice(0, 500));

  // If resourceData not present, optionally fetch message details from Graph
  if (notification.resource && !notification.resourceData) {
    // extract id from resource e.g. /teams/{team-id}/channels/{channel-id}/messages/{message-id}
    // implement Graph call if needed
  }
}

module.exports = { createSubscription, forwardToBeeper };

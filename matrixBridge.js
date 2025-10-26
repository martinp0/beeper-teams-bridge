// Minimal matrix-appservice-bridge scaffold that maps incoming Teams events to Matrix events
const Bridge = require('matrix-appservice-bridge').Bridge;
const YAML = require('yaml');
const fs = require('fs');

function startMatrixBridge() {
  const port = process.env.MATRIX_APP_SERVICE_PORT || 9000;
  const bridge = new Bridge({
    homeserverUrl: process.env.MATRIX_HS_URL || 'http://localhost:8008',
    domain: process.env.MATRIX_BRIDGE_DOMAIN || 'localhost',
    registration: './registration.yaml',
    controller: {
      // You can implement controllers to react to bridge events
      onUserQuery: (queried) => {
        return {
          user_id: `@${queried.localpart}:${bridge.getDomain()}`
        };
      }
    }
  });

  // Example: expose an API for the webhook to call to post messages
  bridge.on('ready', () => {
    console.log('Matrix bridge ready.');
  });

  bridge.run(port);
  console.log(`Matrix bridge running on port ${port}`);
}

module.exports = { startMatrixBridge };

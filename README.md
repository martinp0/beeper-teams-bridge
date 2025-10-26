# Beeper MS Teams Bridge - Scaffold

This scaffold provides a basic webhook for Microsoft Graph (validation handshake + forwarding), a simple subscription manager (create/renew stub), an MSAL client-credentials helper, and a minimal matrix-appservice-bridge. It follows Beeper's best practices for custom bridges.

## Contents

- `index.js` - Express webhook with validation handshake and forwarding stub.
- `msalAuth.js` - MSAL ConfidentialClientApplication helper (client credentials flow).
- `subscriptionManager.js` - createSubscription function + placeholder forward function.
- `matrixBridge.js` - minimal matrix-appservice-bridge starter.
- `registration.yaml` - skeleton registration file for bridge-manager.
- `.env.example` - environment variables to configure.

## Quick Start (Local with ngrok)

1. Copy `.env.example` to `.env` and fill in your credentials.
2. Install dependencies:
\`\`\`
npm install
\`\`\`
3. Start ngrok to expose your local webhook:
\`\`\`
ngrok http 3000
\`\`\`
4. Set `NGROK_URL` in `.env` or use it directly when creating a subscription.
5. Start the bridge:
\`\`\`
npm start
\`\`\`
6. Create a subscription in MS Graph using `createSubscription()` with `notificationUrl` set to `{NGROK_URL}/ms-teams-webhook`.

## Next Steps (According to Beeper Best Practices)

- Map Teams users → Matrix users (puppeting pattern) and channels → rooms.
- Implement secure storage and refresh handling for tokens.
- Validate notifications (`clientState`, JWT signature as per Graph docs).
- Add automatic subscription renewal (cron job or background task).
- Adjust `registration.yaml` according to bridge-manager instructions and register the bridge.

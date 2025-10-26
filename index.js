require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { forwardToBeeper } = require('./subscriptionManager');
const { startMatrixBridge } = require('./matrixBridge');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

// Webhook endpoint exposed via MCP/ngrok
app.post('/ms-teams-webhook', async (req, res) => {
  try {
    // Validation token (during subscription creation MS sends validationToken query or body)
    const validationToken = req.query.validationToken || (req.body && req.body.validationToken);
    if (validationToken) {
      res.set('Content-Type', 'text/plain');
      return res.status(200).send(validationToken);
    }

    // Normal change-notifications
    const notifications = Array.isArray(req.body.value) ? req.body.value : [req.body];
    for (const n of notifications) {
      // Basic clientState check if provided
      // NOTE: for production validate more strictly (clientState, JWT signature if available)
      console.log('Received MS notification:', JSON.stringify(n).slice(0, 500));
      // Forward to internal Beeper/bridge handling
      await forwardToBeeper(n);
    }

    return res.status(202).send();
  } catch (err) {
    console.error('Webhook handler error', err);
    return res.status(500).send('error');
  }
});

app.get('/', (req, res) => res.send('Beeper-Teams bridge scaffold running'));

app.listen(PORT, async () => {
  console.log(`Webhook listening on http://localhost:${PORT}`);
  // Start Matrix bridge in same process (optional)
  startMatrixBridge();
});

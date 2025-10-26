# Beeper MS Teams Bridge - scaffold

Tento scaffold ti dá základní webhook pro Microsoft Graph (validation handshake + forwarding), jednoduchý subscription manager (create/renew stub), MSAL client-credentials helper a minimální matrix-appservice-bridge + `registration.yaml` a `README` podle Beeper best-practices.

## Co obsahuje
- `index.js` - Express webhook, validation handshake, forward stub.
- `msalAuth.js` - MSAL ConfidentialClientApplication helper (client credentials flow).
- `subscriptionManager.js` - createSubscription + placeholder forward function.
- `matrixBridge.js` - minimal matrix-appservice-bridge starter.
- `registration.yaml` - skeleton registračního souboru pro bridge-manager.
- `.env.example` - env variables které je potřeba nastavit.

## Rychlé spuštění (lokálně s ngrok)
1. `cp .env.example .env` a doplnit hodnoty.
2. `npm install`
3. Spusť ngrok: `ngrok http 3000` a zkopíruj HTTPS URL.
4. Nastav `NGROK_URL` nebo použij přímo při volání `createSubscription`.
5. `npm start`
6. Vytvoř subscription k MS Graph (přes `createSubscription`) s `notificationUrl` nastaveným na `{NGROK_URL}/ms-teams-webhook`.

## Další kroky (doplnit podle Beeper best-practices)
- Doplň mapping Teams user -> Matrix user (puppeting pattern) a rooms.
- Implementuj bezpečné uložení tokenů + refresh handling.
- Validuj notifikace (clientState, případné JWT podpisy podle Graph docs).
- Přidej automatickou obnovu subscription (cron, background task).
- Přizpůsob `registration.yaml` podle `bridge-manager` instrukcí a zaregistruj bridge.

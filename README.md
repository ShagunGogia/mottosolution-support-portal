# Motto Solution D365 F&O Support Portal

Independent React and Vite frontend for AGRSoft customer support. Ticket and session data are mock frontend state only; this project does not connect to a backend or provide production authentication.

## Run locally

```sh
npm install
npm run dev
```

## Demo sign-in

Use any valid email and password to enter the mock Customer portal. Admin sign-in is available for this local demo only. Authentication is implemented in client-side mock code and is not secure; do not use it to protect real accounts or data.

Newly registered users always receive the Customer role. Customer users land on `/dashboard` and can manage their own tickets and profile. Admin users land on `/admin/dashboard` and can view, assign, and update all tickets and browse the customer directory. The frontend route guards and local storage session are for demo purposes only.

## Validation

```sh
npm run build
npm run lint
```

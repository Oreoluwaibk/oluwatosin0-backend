# oluwatosin0 API

API for the oluwatosin0 fashion shop: accounts, products, users, and the blog. The storefront is [oluwatosin0](https://github.com/Oreoluwaibk/oluwatosin0).

## Stack

Node.js, Express, and TypeScript. MongoDB via Mongoose. Passwords use bcrypt. Sessions use JSON Web Tokens. Mail uses Nodemailer.

## Routes

| Prefix | Area |
| --- | --- |
| `/auth` | Register and login |
| `/user` | User profile |
| `/product` | Products |
| `/blog` | Blog posts |

`GET /` responds with a short "running" message. Schemas for users, products, orders, and blog posts are in `src/schema`. `src/routes/orders.ts` is an empty file and is not mounted from `src/routes/index.ts`.

## Run locally

```bash
npm install
npm run dev
```

The server listens on `PORT`, or on port 5001 when that variable is not set. Set the MongoDB connection and mail settings in the environment before starting. Do not commit those values.

`npm run build` compiles TypeScript. `npm start` runs the compiled server.

`node_modules` is committed in this repository. A fresh `npm install` is still the right way to set the project up.

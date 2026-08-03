# QKart Backend

QKart is a full-stack e-commerce application. This repository contains the **backend API** — a Node.js/Express REST service backed by MongoDB — along with a bundled React frontend client.

The API handles user registration & authentication, product listings, and a shopping cart with checkout, and issues JWTs to protect user-specific routes.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB with Mongoose ODM
- **Auth:** Passport.js (JWT strategy) + jsonwebtoken + bcryptjs
- **Validation:** Joi
- **Testing:** Jest + Supertest + mockingoose
- **Other:** Helmet (security headers), CORS, Morgan (logging), Winston (error logging), compression

## Project Structure

```
Qkart-Backend-main/
├── src/
│   ├── config/          # Environment config, Passport strategy, token settings
│   ├── controllers/     # Route handlers (auth, user, product, cart)
│   ├── middlewares/     # auth, request validation, error handling
│   ├── models/          # Mongoose schemas (User, Product, Cart)
│   ├── routes/v1/       # Versioned API route definitions
│   ├── services/        # Business logic layer
│   ├── utils/           # ApiError, catchAsync, pick helpers
│   ├── validations/     # Joi schemas per resource
│   ├── app.js           # Express app setup
│   └── index.js         # DB connection + server bootstrap
├── tests/
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests (Supertest)
│   └── fixtures/        # Test data/fixtures
├── frontend/             # React client for the QKart storefront
├── setup.sh              # Local MongoDB setup script
├── setupRemoteMongo.sh   # Remote/Atlas MongoDB setup script
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 12
- MongoDB (local instance or a MongoDB Atlas connection string)

### Installation

```bash
git clone <this-repo-url>
cd Qkart-Backend-main
npm install
```

### Environment Variables

Create a `.env` file in the project root (see `.env` for reference) with the following keys:

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Environment mode | `development` / `production` / `test` |
| `PORT` | Port the server listens on | `8082` |
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017/qkart` |
| `JWT_SECRET` | Secret used to sign JWTs | any secure random string |
| `JWT_ACCESS_EXPIRATION_MINUTES` | Access token lifetime (minutes) | `240` |
| `JWT_REFRESH_EXPIRATION_DAYS` | Refresh token lifetime (days) | `30` |

> **Note:** Never commit real database credentials or secrets to source control. Rotate any credentials that may already be present in this repo's `.env` file before deploying.

### Running the Server

```bash
npm start
```

This runs the app with `nodemon` on the port defined by `PORT` (defaults to `3000` if unset), and connects to MongoDB using `MONGODB_URL`.

### Running Tests

```bash
npm test
```

Runs the Jest suite (unit + integration tests) in-band.

## API Overview

All routes are prefixed with `/v1`.

### Auth — `/v1/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Log in and receive a JWT |

### Users — `/v1/users`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/:userId` | Get a user's profile | ✅ |
| PUT | `/:userId` | Set/update a user's shipping address | ✅ |

### Products — `/v1/products`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/` | List all products | — |
| GET | `/:productId` | Get a single product by ID | — |

### Cart — `/v1/cart`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/` | Get the current user's cart | ✅ |
| POST | `/` | Add a product to the cart | ✅ |
| PUT | `/` | Update quantity of a product in the cart | ✅ |
| PUT | `/checkout` | Checkout the cart (deducts wallet balance) | ✅ |

Authenticated routes require an `Authorization: Bearer <token>` header with a valid access token obtained from `/v1/auth/login`.

## Data Models

- **User** — `name`, `email` (unique), `password` (hashed, min 8 chars with a letter + number), `walletMoney` (default `500`), `address` (defaults to `ADDRESS_NOT_SET`)
- **Product** — `name`, `category`, `cost`, `rating`, `image`
- **Cart** — `email` (unique, one cart per user), `cartItems` (array of `{ product, quantity }`), `paymentOption`

## Frontend

The `frontend/` directory contains a React client that consumes this API. See `frontend/setup.sh` and `frontend/src/ipConfig.json` to point it at your running backend instance.

## License

Add a license of your choice (e.g. MIT) here.

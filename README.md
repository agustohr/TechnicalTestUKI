# TechnicalTestUKI (BE + FE)

Simple Employee CRUD application:
- Backend: Node.js + Express + MongoDB (Mongoose)
- Frontend: Angular 6 + Angular Material

## Tech Stack / Versions
### Frontend (FE)
- Angular: 6
- Angular CLI (via npx): 6.2.9
- Angular Material/CDK: 6.4.7
- Node.js: 10.x (tested with Node 10.24.1 via nvm-windows)
- npm: 6.x

### Backend (BE)
- Node.js: 10.x (tested with Node 10.24.1 via nvm-windows)
- npm: 6.x
- Express: 4.x
- Mongoose: 5.x

---

## Prerequisites
- Node.js 10.x and npm 6.x
- MongoDB running locally or accessible via connection string.

---

## How to Run

### 1) Run Backend (BE)
Open terminal:

```bash
cd be
npm install
# seed initial data to MongoDB
npm run seed

# run backend (dev)
npm run dev
```

Backend runs on:
http://localhost:3000

### 2) Run Backend (BE)
Open terminal:

```bash
cd fe
npm install
npx -p @angular/cli@6.2.9 ng serve -o
```

Frontend runs on:
http://localhost:4200
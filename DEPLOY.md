# Deploy

This project is prepared for a single Render web service. The Express backend serves the built Vite frontend from `dist`, and the frontend calls the backend on the same domain with `/api`.

## Required environment variable

Set this in Render:

```text
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

Use MongoDB Atlas or another hosted MongoDB database. A local URL like `mongodb://127.0.0.1:27017/smartExpenseDB` will not work after deployment because Render cannot access your laptop's MongoDB.

## Render deploy

1. Push this folder to GitHub.
2. In Render, create a new Blueprint and select this repo.
3. Render will read `render.yaml`.
4. Add `MONGO_URI` when Render asks for environment variables.
5. Deploy.

## Local verification

```bash
npm install
npm --prefix backend install
npm run build
npm --prefix backend start
```

Then open:

```text
http://localhost:5000
http://localhost:5000/api/health
```

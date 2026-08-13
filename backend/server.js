import express from 'express';
import cors from 'cors';
import '/config';
import { requireAuth } from './auth.js';
import { secretsRouter } from './secrets.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/secrets', requireAuth, secretsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Vault backend escuchando en :${port}`));

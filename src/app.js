import express from 'express';
import db from './config/dbConnect.js';
import books from './models/Book.js';
import routes from './routes/index.js';

const port = process.env.port || 3000;

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso');
});

const app = express();

app.use(express.json());

routes(app);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
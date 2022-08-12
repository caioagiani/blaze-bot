import * as express from 'express';
import * as cors from 'cors';
import { router } from './routes';
import { engine } from 'express-handlebars';
import { join } from 'path';
import './services/mongoose';
import './jobs/double';
import './jobs/heroku';

const app = express();

app.engine(
  '.hbs',
  engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: join(__dirname, 'views/layouts'),
    partialsDir: join(__dirname, 'views/partials'),
  }),
);

app.set('view engine', '.hbs');
app.set('views', join(__dirname, 'views'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(process.env.PORT || 3333, () => console.log('SERVER: ON'));

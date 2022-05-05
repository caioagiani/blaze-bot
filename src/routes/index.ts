import { join } from 'path';
import * as express from 'express';
import double from '../controllers/double';

const router = express.Router();

router.use('/', express.static(join(__dirname, '..', '..', 'public')));
router.get('/', (_req, res) => res.json({ status: 'online' }));
router.get('/double', double.index);

export { router };

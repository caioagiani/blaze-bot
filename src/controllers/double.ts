import { Request, Response } from 'express';
import axios from 'axios';
import Double from '../database/schemas/double';
import colors from '../utils/double-brands';

export default {
  async crawl() {
    const { data: doubleRequest } = await axios.get(
      'https://blaze.com/api/roulette_games/recent/history?page=1',
    );

    return doubleRequest;
  },
  async index(_req: Request, res: Response) {
    const values = await Double.find({ color: { $ne: null } })
      .sort({ created_at: -1 })
      .limit(234);

    const doubles = values.map((value: any) => {
      const { name, color } = colors[value.color];
      const number = value.roll == '0' ? null : value.roll;

      return {
        ...value['_doc'],
        name,
        color,
        number,
      };
    });

    return res.render('double', { doubles });
  },
};

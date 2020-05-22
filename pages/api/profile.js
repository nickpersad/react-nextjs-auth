import cookie from 'cookie';
import { SECRET_COOKIE } from '../../utils/cookie-auth';

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const secret = cookies[SECRET_COOKIE];

  if (!secret) {
    return res.status(401).send('Auth cookie missing.');
  }
}

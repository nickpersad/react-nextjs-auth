import cookie from 'cookie'
import { SECRET_COOKIE } from '../../utils/cookie-auth'

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const secret = cookies[SECRET_COOKIE]
  if (!secret) {
    // Already logged out.
    return res.status(200).end()
  }
  // Invalidate secret (ie. logout from mongo).
  // await faunaClient(faunaSecret).query(q.Logout(false))
  // Clear cookie.
  const cookieSerialized = cookie.serialize(SECRET_COOKIE, '', {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1,
    httpOnly: true,
    path: '/',
  })
  res.setHeader('Set-Cookie', cookieSerialized)
  res.status(200).end()
}

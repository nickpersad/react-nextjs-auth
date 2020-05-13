import cookie from 'cookie'

export const SECRET_COOKIE = 'secret';

export const serializeCookie = userSecret => {
  const cookieSerialized = cookie.serialize(SECRET_COOKIE, userSecret, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 72576000,
    httpOnly: true,
    path: '/',
  })
  return cookieSerialized
}

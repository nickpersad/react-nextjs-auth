import { serializeCookie } from '../../utils/cookie-auth'

export default async (req, res) => {
  const { username, password } = await req.body

  try {
    if (!username || !password) {
      throw new Error('Username and password must be provided.')
    }

    const response = await fetch(`${process.env.SERVER}:${process.env.PORT}/api/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const loginRes = await response.json();

    if (!loginRes.id) {
      throw new Error('No id present in login query response.')
    }

    const cookieSerialized = serializeCookie(loginRes.id)

    res.setHeader('Set-Cookie', cookieSerialized)
    res.status(200).end()
  } catch (error) {
    res.status(400).send(error.message)
  }
}

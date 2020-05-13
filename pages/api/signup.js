import { serializeCookie } from '../../utils/cookie-auth'

export default async (req, res) => {
  const { email, password } = await req.body

  try {
    if (!email || !password) {
      throw new Error('Email and password must be provided.')
    }
    console.log(`email: ${email} trying to create user.`)

    let response

    try {
      response = await fetch(`${process.env.SERVER}:${process.env.PORT}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
    } catch (error) {
      console.error('Fauna create user error:', error)
      throw new Error('User already exists.')
    }

    const user = await response.json();

    if (!user.id) {
      throw new Error('No ID present in create query response.')
    }

    const cookieSerialized = serializeCookie(user.id)

    res.setHeader('Set-Cookie', cookieSerialized)
    res.status(200).end()
  } catch (error) {
    res.status(400).send(error.message)
  }
}

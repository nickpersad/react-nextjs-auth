import cookie from 'cookie'
import Router from 'next/router'
import { withAuthSync } from '../utils/auth'
import { SECRET_COOKIE } from '../utils/fauna-auth'
import { profileApi } from './api/profile'
import Layout from '../components/layout'

const Profile = props => {
  const { userId } = props

  return (
    <Layout>
      <h1>Your session id is {userId}</h1>

      <style jsx>{`
        h1 {
          margin-bottom: 0;
        }
      `}</style>
    </Layout>
  )
}

Profile.getInitialProps = async ctx => {
  const { req, res } = ctx;
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const secret = cookies[SECRET_COOKIE];

  // check if valid session
  // const profileInfo = await profileApi(faunaSecret);

  return { userId: secret };
}

export default withAuthSync(Profile)

import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers";

const options = {
  providers: [
    Auth0Provider.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    })
  ],
}

// export default (req: NextApiRequest, res: NextApiResponse): void |Promise <void> =>
//  NextAuth(req, res, options);

// export default NextAuth({
//     providers: [
//     Auth0Provider.Auth0({
//       clientId: process.env.AUTH0_CLIENT_ID,
//       clientSecret: process.env.AUTH0_CLIENT_SECRET,
//       domain: process.env.AUTH0_DOMAIN,
//     })
//   ],
// });


import Google from "@auth/core/providers/google"
import Credentials from "@auth/core/providers/credentials"
import FacebookProvider from "@auth/core/providers/facebook"
import type { AuthConfig, SignInPageErrorParam } from "@auth/core/types"
import { NuxtAuthHandler } from "#auth"
import { getUserFromAPI, registerUserToAPI } from "~/server/utils"

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig()

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  providers: [
    Google({
      clientId: runtimeConfig.google.clientId,
      clientSecret: runtimeConfig.google.clientSecret
    }),
    FacebookProvider({
      clientId: runtimeConfig.gitHub.clientId,
      clientSecret: runtimeConfig.gitHub.clientSecret
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
        
      },
      authorize: async (credentials) => {
        // logic to verify if user exists
        let user = await getUserFromAPI(credentials)

        if (user?.error) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error(user.error)
        } else {
          // return user object with the their profile data
          return user
        }
      },
    }),
  ],
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({token, user}) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user ? (user as any).access_token || '' : '';
        token.id = user ? user.userId || '' : '';
        token.role = user ? (user as any).role || '' : '';
        token.uuid = user ? (user as any).id || '' : '';
      }
      return Promise.resolve(token);
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({session, token}) => {
      // (session as any).role = token.role;
      (session as any).uid = token.id;
      return Promise.resolve(session);
    },
  },

}


export default NuxtAuthHandler(authOptions, runtimeConfig)
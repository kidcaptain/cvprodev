import { resolve } from "node:path"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia/nuxt",
    "@hebilicious/authjs-nuxt",
    'shadcn-nuxt',
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "nuxt-swiper",
    "nuxt-time"
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  app: {
    head: {
      script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js' }
      ],
    },
  },

  alias: {
    cookie: resolve(__dirname, "node_modules/cookie")
  },
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  authJs: {
    verifyClientOnEveryRequest: true,
    guestRedirectTo: "/auth/login", // where to redirect if the user is not authenticated
    authenticatedRedirectTo: "/app", // where to redirect if the user is authenticated
    baseUrl: "https://www.cv-pro.com" // should be something like 
  },

  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET // You can generate one with `openssl rand -base64 32`
    },
    google: {
      clientId: process.env.NUXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET
    },
    gitHub: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET
    },
    public: {
      backendAPI: process.env.NUXT_PUBLIC_API_BASE_URL,
      filesAPI: process.env.NUXT_PUBLIC_API_FILE_BASE_URL,
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true // whether to hit the /auth/session endpoint on every client request
      }
    }
  }
})
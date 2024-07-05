declare module "@auth/core/types" {
    interface Session {
      user?: User,
      uid: string,
      uuid: string,
      role: string
    }
    interface User {
      userId?: string,
      role?: string,
      isBlocked?: number,
      error?: string
    }
  }
  
  export {}
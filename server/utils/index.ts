import { User } from "@auth/core/types"

const BASE_URL = useRuntimeConfig().public.backendAPI

export const getUserFromAPI = async (credentials: Partial<Record<"email" | "password", unknown>>): Promise<User> => {
    //on fait la requette à l'api ici, aec le login et le mdp
    // const user : User = {
    //     id: "id",
    //     name: "Hermann",
    //     email: 'hermann@gmail.com'
    // }

    const res = await $fetch<{ status: boolean, isLogged: boolean, user: User, message: string }>(BASE_URL + 'login', {
        method: 'POST',
        body: credentials
    })
    if (res.status)
        return {
            id: res.user.id,
            email: res.user.email,
            name: res.user.name,
            role: res.user.role,
            isBlocked: res.user.isBlocked,
            userId: res.user.userId,
            error: ""
        }
    else {
        return {
            id: "undefined",
            error: res.message ? res.message : " Something went wrong"
        }
    }
}

export const registerUserToAPI = async (credentials: Partial<Record<"email" | "password" | 'name', unknown>>): Promise<User> => {
    const res = await $fetch<{ status: boolean, isLogged: boolean, user: User, message: string }>(BASE_URL + 'user/save', {
        method: 'POST',
        body: credentials
    })
    if (res.status)
        return {
            id: res.user.id,
            email: res.user.email,
            name: res.user.name,
            role: res.user.role,
            isBlocked: res.user.isBlocked,
            userId: res.user.userId,
            error: ""
        }
    else {
        return {
            id: "undefined",
            error: res.message ? res.message : " Something went wrong"
        }
    }
}

export const saltAndHashPassword = (password: string) => {
    return password //on aura hashé
}
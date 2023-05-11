import { api } from "@libs/axios";
import { getUserInLocalStorage, removeUserInLocalStorage, SaveUserInLocalSotorage } from "@storage/storageUser";
import { getAuthTokensInLocalStorage, removeTokenInLocalStorage, SaveTokensInLocalStorage } from "@storage/tokens";
import { createContext, ReactNode, useEffect, useState } from "react";
import { AUTH_TOKENS_DTO } from "src/DTO/authTokensDTO";
import { USER_DTO } from "src/DTO/userDTO";

interface AuthContextProps {
    signIn: (email: string, password: string) => Promise<void>;
    user: USER_DTO;
    appIsLoading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);


interface AuthContextProviderProps {
    children: ReactNode;
}


interface SignInProps {
    token: string;
    'refresh-token': string;
    user: USER_DTO;
}


export function AuthContextProvider({children}: AuthContextProviderProps){
    const [user, setUser] = useState<USER_DTO>({} as USER_DTO)
    const [appIsLoading, setAppIsLoading] = useState(true)

    function SaveAuthTokens({token,refresh_token}:AUTH_TOKENS_DTO){
        api.defaults.headers['Authorization'] = `Bearer ${token}`
        SaveTokensInLocalStorage({token, refresh_token })
    }
    function SaveUser(user: USER_DTO){
        SaveUserInLocalSotorage(user)
        setUser(user)
    }
    function removeUser(){
        setUser({} as USER_DTO)
        removeUserInLocalStorage()
        removeTokenInLocalStorage()
    }

    async function fetchUserDatas(){
        try {
            const user = await getUserInLocalStorage()
            const authTokens = await getAuthTokensInLocalStorage()
            
            setUser(user)
            api.defaults.headers['Authorization'] = `Bearer ${( authTokens).token}`
            
        } catch (error) {
            console.log(error)
        }
        finally {
            setAppIsLoading(false)
        }
       
    }

    async function signIn(email: string, password: string) {
        try {
            const response = await api.post<SignInProps>('/sessions', {
                email,
                password
            })

            const { "refresh-token": refresh_token , user, token} = response.data

            if(!user&& token && !refresh_token){
                return
            }

            SaveUser(user)
            SaveAuthTokens({
                token,
                refresh_token
            })

        }catch (error) {
            throw error
        }

    }

    useEffect(() => {
        fetchUserDatas()
    }, [])



    return (
        <AuthContext.Provider value={{ signIn, user, appIsLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
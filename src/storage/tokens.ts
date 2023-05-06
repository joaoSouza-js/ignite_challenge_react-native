import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE_AUTH_TOKENS_KEY } from "."
import { AUTH_TOKENS_DTO } from "src/DTO/authTokensDTO"


export async function SaveTokensInLocalStorage({refresh_token,token}: AUTH_TOKENS_DTO) {
    const authTokensInLocalStorage = JSON.stringify({token,refresh_token})
    await AsyncStorage.setItem(STORAGE_AUTH_TOKENS_KEY, authTokensInLocalStorage)
}

export async function getAuthTokensInLocalStorage(){
    const authTokensResponse = await AsyncStorage.getItem(STORAGE_AUTH_TOKENS_KEY)
    const authTokens: AUTH_TOKENS_DTO = authTokensResponse ? JSON.parse(authTokensResponse) : {}

    return authTokens as AUTH_TOKENS_DTO

}

export async function removeTokenInLocalStorage(){
    await AsyncStorage.removeItem(STORAGE_AUTH_TOKENS_KEY)
}
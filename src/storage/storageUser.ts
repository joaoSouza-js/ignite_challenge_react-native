
import AsyncStorage from "@react-native-async-storage/async-storage"
    import { STORAGE_USER_KEY } from "."
import { USER_DTO } from "src/DTO/userDTO"

export async function SaveUserInLocalSotorage(user: USER_DTO){
    try {
        const userInStringfly =  JSON.stringify(user)
        await AsyncStorage.setItem(STORAGE_USER_KEY, userInStringfly)
    } catch (error) {
       throw error
    }
}


export async function getUserInLocalStorage(){
        try {
         
            const localStorageResponse = await AsyncStorage.getItem(STORAGE_USER_KEY)

            const userLogged : USER_DTO = localStorageResponse ? JSON.parse(localStorageResponse) : {}

            return userLogged

        } catch (error) {
           throw error
        }

}

export async function  removeUserInLocalStorage(){
    try {
        await AsyncStorage.removeItem(STORAGE_USER_KEY)
    } catch (error) {
        throw error
    }
}
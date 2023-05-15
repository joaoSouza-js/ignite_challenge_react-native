import { useAuth } from "@hooks/useAuth";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { DashBoardParamList } from "@routes/app/DashBoard";
import { VStack, useToast } from "native-base";
import { useCallback, useEffect } from "react";
import {Alert} from 'react-native'

export function SignOut({ navigation }: BottomTabScreenProps<DashBoardParamList, 'SignOut'>){
    const {signOut} = useAuth()
    const Toast = useToast()

    async function handleSignOut(){
        try {
            await signOut()
        } catch (error) {
            Toast.show({
                title: 'Erro ao sair',
            })
        }
    }

    async function showSignOutAlert(){
        Alert.alert(
            "Sair",
            "Deseja realmente sair?",
            [
                {
                    text: "Cancelar",
                    onPress: () => navigation.goBack(),
                    style: "cancel"
                },
                { 
                    text: "Sair", 
                    onPress: () => handleSignOut(), 
                    style: 'destructive', 
                    
                    

                }
            ]
        );
    }
    useFocusEffect(useCallback(() => {
        showSignOutAlert()
    }, []))
    return (
        <VStack>
            
        </VStack>
    )
}
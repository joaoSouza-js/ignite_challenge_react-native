import { useTheme } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AppRoutes } from './app'
import { AuthRoutes } from './authRoutes'
import { useAuth } from '@hooks/useAuth'
import { Loader } from '@components/Loader'

export function Router(){
    const {user,appIsLoading} = useAuth()
    const { colors } = useTheme()
    const NavigationTheme = DefaultTheme
    NavigationTheme.colors.background = colors.gray[300]

    if(appIsLoading){
        return <Loader/>
    }


    return (
        <NavigationContainer theme={NavigationTheme}>
            {user.id ? <AppRoutes/> : <AuthRoutes/>}
        </NavigationContainer>

    )
}
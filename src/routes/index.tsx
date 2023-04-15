import { useTheme } from 'native-base'
import { AuthRoutes } from './authRoutes'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

export function Router(){
    const { colors } = useTheme()
    const NavigationTheme = DefaultTheme
    NavigationTheme.colors.background = colors.gray[300]
    return (
        <NavigationContainer theme={NavigationTheme}>
            <AuthRoutes/>
        </NavigationContainer>

    )
}
import { useTheme } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AppRoutes } from './app'

export function Router(){
    const { colors } = useTheme()
    const NavigationTheme = DefaultTheme
    NavigationTheme.colors.background = colors.gray[300]
    return (
        <NavigationContainer theme={NavigationTheme}>
            <AppRoutes/>
        </NavigationContainer>

    )
}
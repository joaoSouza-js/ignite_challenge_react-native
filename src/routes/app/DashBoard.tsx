import {  NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '@screens/Home'

import { UserAnnouncements } from '@screens/UserAnnouncements'
import { useTheme } from 'native-base'
import { Platform,  Alert} from 'react-native'
import { House, SignOut as SignOutIcon, Tag } from 'phosphor-react-native'
import { SignOut } from '@screens/SignOut'



export type DashBoardParamList = {
    Home: undefined,
    UserAnnoucements: undefined,
    SignOut: undefined,
}

export type DashBoardNavigatorRoutesProps = NativeStackNavigationProp<DashBoardParamList>

const { Navigator, Screen } = createBottomTabNavigator<DashBoardParamList>()

export function DashBoard() {
    const { colors, sizes } = useTheme()
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarLabelPosition: 'beside-icon',
                tabBarActiveTintColor: colors.gray[900],
                tabBarInactiveTintColor: colors.gray[600],
                tabBarStyle: {
                    backgroundColor: colors.gray[300],
                    borderTopWidth: 0,
                    height: 60,
                    position: 'absolute',

                },
                tabBarItemStyle: {
                    position: 'relative',
                    marginTop: Platform.OS === 'android' ? -10 : 0
                }


            }}
        >
            <Screen 
                name='Home' 
                component={Home} 
                options={{
                    title: 'Novo Bolão',
                    tabBarIcon: ({ color, size }) => (<House size={size} color={color} />)
                }}
            />
            <Screen 
                name='UserAnnoucements' component={UserAnnouncements}
                options={{
                    title: 'Novo Bolão',
                    tabBarIcon: ({ color, size }) => (<Tag size={size} color={color} />)
                }}
             />
            <Screen
                name='SignOut' 
                component={SignOut} 
                options={{
                    title: 'Novo Bolão',
                    tabBarIcon: ({  size }) => (<SignOutIcon color={colors.red[400]} size={size}/>)
                }}
            />
        </Navigator>
    )
}

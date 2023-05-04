import {  NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '@screens/Home'

import { EditAnnouncement } from '@screens/EditAnnouncement'
import { UserAnnouncements } from '@screens/UserAnnouncements'
import { useTheme } from 'native-base'
import { Platform } from 'react-native'
import { House, SignOut, Tag } from 'phosphor-react-native'



export type DashBoardParamList = {
    Home: undefined,
    UserProductsTabs: undefined,
    Exit: undefined,
}

export type HomeNavigatorRoutesProps = NativeStackNavigationProp<DashBoardParamList>

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
                name='UserProductsTabs' component={UserAnnouncements}
                options={{
                    title: 'Novo Bolão',
                    tabBarIcon: ({ color, size }) => (<Tag size={size} color={color} />)
                }}
             />
            <Screen  
                name='Exit' 
                listeners={{}}
                component={EditAnnouncement} 
                options={{
                    title: 'Novo Bolão',
                    tabBarActiveTintColor: '#ff00ff',
                    tabBarIcon: ({ color, size }) => (<SignOut size={size}/>)
                }}
            />
        </Navigator>
    )
}

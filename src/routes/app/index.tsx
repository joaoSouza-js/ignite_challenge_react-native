import { DashBoard } from './DashBoard'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import { EditAnnouncement } from '@screens/EditAnnouncement'
import { CreateAnnouncement } from '@screens/CreateAnnouncement'
import { AnnouncementDetails } from '@screens/AnnouncementDetails'

export type AppRouteParamList  = {
    HomeTabs: undefined,
    CreateAnnouncement: undefined,
    AnnouncementDetails: undefined,
    EditAnnouncement: undefined,

}

const { Screen, Navigator } = createNativeStackNavigator<AppRouteParamList>()

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRouteParamList>


export function AppRoutes(){
    return (
    <Navigator screenOptions={{headerShown:false}}>
        <Screen name='HomeTabs' component={DashBoard}/>
        <Screen name='CreateAnnouncement' component={CreateAnnouncement} />
        <Screen name='AnnouncementDetails' component={AnnouncementDetails} />
        <Screen name='EditAnnouncement' component={EditAnnouncement} />
    </Navigator>

    )
}
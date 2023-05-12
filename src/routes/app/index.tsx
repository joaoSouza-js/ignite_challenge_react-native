import { DashBoard } from './DashBoard'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'

import { EditAnnouncement } from '@screens/EditAnnouncement'
import { CreateAnnouncement } from '@screens/CreateAnnouncement'
import { AnnouncementDetails } from '@screens/AnnouncementDetails'
import { UserAnnoucementDtails } from '@screens/UserAnnouncementDetails'

export type AppRouteParamList  = {
    HomeTabs: undefined,
    CreateAnnouncement: undefined,
    AnnouncementDetails: {productId: string},
    EditAnnouncement: { productId: string },
    UserAnnouncementDetails: {productId: string}

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
        <Screen name='UserAnnouncementDetails' component={UserAnnoucementDtails} />
    </Navigator>

    )
}
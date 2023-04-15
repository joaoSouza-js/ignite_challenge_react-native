import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack' 
import { SignUp } from '@screens/SignUp'
import { SignIn } from '@screens/SignIn'


export type AuthRoutesParamList = {
    SignIn: undefined,
    SignUp: undefined,
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesParamList>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesParamList>()

export function AuthRoutes(){
    return (
        <Navigator screenOptions={{headerShown:false}}>
            <Screen name='SignIn' component={SignIn}/>
            <Screen name='SignUp' component={SignUp} />
        </Navigator>
    )
}

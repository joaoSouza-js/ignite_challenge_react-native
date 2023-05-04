import { useTheme } from "native-base";
import { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppContainerProps {
    children: ReactNode
}
export function AppContainer({ children }: AppContainerProps){
    const {colors} = useTheme()
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: colors.gray[300]
                }}
            >
                {children}
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
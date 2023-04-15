import { useTheme } from "native-base";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


interface AppContainerProps {
    children: ReactNode
}
export function AppContainer({ children }: AppContainerProps){
    const {colors} = useTheme()
    return (
    
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.gray[300]
            }}
        >
            {children}
        </SafeAreaView>
    )
}
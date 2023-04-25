import { Box, HStack, IconButton } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { Heading } from "./Heading";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
    title: string,
    onScreenNavigate: () => void
}

export function Header({ onScreenNavigate, title}: HeaderProps){
    function handleScreenNavigate(){
        onScreenNavigate()
    } 

    return (
   
        <HStack paddingX={6} marginTop={5} alignItems={'center'}>
            <IconButton
                variant={'unstyled'} 
                width={8} 
                height={8}
                _pressed={{
                    opacity: .7
                }}
                hitSlop={50}
                onPress={handleScreenNavigate}
            >
                <ArrowLeft size={24}/>
            </IconButton>
            <Box alignItems={'center'} flex={1}>

            <Heading marginLeft={-8}>{title}</Heading>  
            </Box>
        </HStack>
    
    )
}
import { Input as NativeBaseInput, IInputProps, VStack, IconButton, useTheme} from 'native-base'
import {ComponentProps, ReactNode, useState} from 'react'
import {Text} from '@components/Text'
import { Entypo } from '@expo/vector-icons'
import { Eye, EyeSlash} from 'phosphor-react-native'

type VStackProps = ComponentProps<typeof VStack>

interface TextInputRoot extends VStackProps {
    children: ReactNode
}

 function TextInputRoot({ children, ...rest }: VStackProps){
    return (
    <VStack {...rest}>
        {children}
    </VStack>

    )
}
TextInputRoot.displayName = 'TextInput'

function Input(props: IInputProps) {
    return (
        <NativeBaseInput 
            height={45}
            paddingLeft={4}
            paddingRight={4}
            width={'full'}
            backgroundColor={'gray.100'}
            rounded={'md'}
            fontSize={'md'}
            borderWidth={1}
            borderColor={'gray.100'}
            _focus={{
                borderColor: 'gray.500'
            }}
            {...props}
            
        />
    )
}
Input.displayName = 'Input'




function PasswordInput(props: IInputProps){
    const [passWordIsHiding,setPassWordIsHiding] = useState(true)
    const { colors} = useTheme()
    function handleChangePasswordVisibility(){
        setPassWordIsHiding(!passWordIsHiding)
    }
    return (
        <Input
         
            secureTextEntry={passWordIsHiding}
            InputRightElement={
              <IconButton
                variant={'unstyled'}
                onPress={handleChangePasswordVisibility}
              > 
                { 
                    passWordIsHiding 
                    ? <EyeSlash size={20} color={colors.gray[700]} /> 
                    : <Eye size={20} color={colors.gray[600]} /> 
                }
              </IconButton>
            }
            {...props}
        />
    )
}

PasswordInput.displayName = 'PasswordInput'

function TextInputError(){
    return (
        <Text
            marginTop={2}
            color={'red.400'}
            fontSize={'xs'}
        />
    )
}
TextInputError.displayName = 'TextInputError'

export const TextInput = {
    Root: TextInputRoot,
    Input: Input,
    Error: TextInputError,
    PasswordInput: PasswordInput
}
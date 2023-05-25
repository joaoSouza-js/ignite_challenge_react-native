import { Input as NativeBaseInput, IInputProps, VStack, IconButton, useTheme} from 'native-base'
import {ComponentProps, ReactNode, useState} from 'react'
import {Text} from '@components/Text'
import { Eye, EyeSlash} from 'phosphor-react-native'
import { Control, Controller } from 'react-hook-form'

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




interface PasswordInputProps extends IInputProps {
    visible?: boolean
}

function PasswordInput({visible=true, ...rest}: PasswordInputProps){

    const [passWordIsHiding, setPassWordIsHiding] = useState(visible)

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
            {...rest}
        />
    )
}

PasswordInput.displayName = 'PasswordInput'


interface TextInputErrorProps {
    children: string | number | undefined
}
function TextInputError({children}: TextInputErrorProps){
    
    return (
        <Text
            marginTop={2}
            color={'red.400'}
            fontSize={'xs'}
        >{children}</Text>
    )
}
TextInputError.displayName = 'TextInputError'


interface ITextInputControlledProps extends IInputProps {
    name: string,
    control: Control<any>
}

function InputControlled({ name, control, ...rest }: ITextInputControlledProps){
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                    onChangeText={onChange}
                    value={value === undefined ? value : String(value) } 
                    onBlur={onBlur}
                    {...rest}
                />
            )}
        />
        
    ) 
}

InputControlled.displayName = 'InputControlled'

function PasswordInputControlled({ name, control, ...rest }: ITextInputControlledProps){

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    {...rest}
                />
            )}
        />
        
    )
}

PasswordInputControlled.displayName = 'PasswordInputControlled'


export const TextInput = {
    Root: TextInputRoot,
    Input: Input,
    Error: TextInputError,
    PasswordInput: PasswordInput,
    InputControlled: InputControlled,
    PasswordInputControlled: PasswordInputControlled
}
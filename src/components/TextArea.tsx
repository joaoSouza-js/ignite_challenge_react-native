import {ITextAreaProps, VStack, TextArea as NativeBaseTextArea} from 'native-base'
import {ComponentProps, ReactNode, useState} from 'react'
import {Text} from '@components/Text'
import { Control, Controller } from 'react-hook-form'


type VStackProps = ComponentProps<typeof VStack>

interface TextAreaRoot extends VStackProps {
    children: ReactNode
}

 function TextAreaRoot({ children, ...rest }: VStackProps){
    return (
    <VStack {...rest}>
        {children}
    </VStack>

    )
}
TextAreaRoot.displayName = 'TextArea'

function TextAreaArea(props: ITextAreaProps) {
    return (
        <NativeBaseTextArea 
            autoCompleteType={''}
            paddingLeft={4}
            paddingRight={4}
            width={'full'}
            h={40}
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

TextAreaArea.displayName = 'TextAreaArea'

interface ITextInputControlledProps extends ITextAreaProps {
    name: string,
    control: Control<any>
}

function TextAreaControled({ name, control, ...rest }: ITextInputControlledProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextAreaArea
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    {...rest}
                />
            )}
        />

    )
}

TextAreaControled.displayName = 'TextAreaControled'

interface TextAreaErrorProps {
    children: string | number | undefined
}

function TextAreaError({children}: TextAreaErrorProps){
    return (
        <Text
            marginTop={2}
            color={'red.400'}
            fontSize={'xs'}
        >
            {children}
        </Text>
    )
}
TextAreaError.displayName = 'TextAreaError'

export const TextArea = {
    Root: TextAreaRoot,
    TextArea: TextAreaArea,
    TextAreaControled: TextAreaControled,
    Error: TextAreaError,
}
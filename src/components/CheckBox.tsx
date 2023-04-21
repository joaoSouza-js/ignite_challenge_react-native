import {ICheckboxProps, Checkbox as NativeCheckBox} from 'native-base'

interface CheckboxProps extends ICheckboxProps {
    label: string
}

export function CheckBox({label,...rest}: CheckboxProps){
    return (
        <NativeCheckBox _checked={{
            backgroundColor: 'blue.400',
            borderColor: 'blue.500',
            
        }} 
        marginTop={2}
        _text={{
            textTransform: 'capitalize',
            fontFamily: 'body'
        }}
        {...rest}>
            {label}
        </NativeCheckBox>
    )
}
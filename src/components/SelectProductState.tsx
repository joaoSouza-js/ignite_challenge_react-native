import { HStack, IRadioGroupProps, Radio } from "native-base";
import { Control, Controller } from 'react-hook-form'
import { resolveTypeReferenceDirective } from "typescript";



export function SelectSelectProductState(props:IRadioGroupProps){
    return (

    <Radio.Group
        defaultValue="new"
        width={'full'}
        {...props}
   
    >
        <HStack
            marginTop={'4'}
            width={'full'}
            colorScheme={'purple'}
            justifyContent={'space-between'}
        >
            <Radio
                value="new"
                _checked={{
                    borderColor: 'blue.400',

                }}
                colorScheme={'blue'}
            >
                Produto novo
            </Radio>
            <Radio
                value="old"
                _checked={{
                    borderColor: 'blue.400',

                }}
                colorScheme={'blue'}
            >
                Produto Usado
            </Radio>

        </HStack>
    </Radio.Group>
    )
}

interface ISelectProductStateControledProps extends IRadioGroupProps{
    name: string,
    control: Control<any>

}
export function SelectProductStateControled({name, control,...props}: ISelectProductStateControledProps){
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <SelectSelectProductState 
                    onChange={value => onChange(value === 'new')}
                    name={name}
                    {...props}
                />
            )}
        />
    )
}

export const SelectProductState = {
    Controled: SelectProductStateControled,
    Select: SelectSelectProductState,
}
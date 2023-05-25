import {Switch as SwitchReactNative, SwitchProps} from 'react-native'
import { Control, Controller } from 'react-hook-form'
import { useTheme } from 'native-base'



function SwitchBase(props: SwitchProps ) {
    const { colors } = useTheme()
    return (
        <SwitchReactNative 
            {...props} 
            trackColor={{false: colors.gray[400], true: colors.blue[400]}}
           
            thumbColor={colors.gray[100]}
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            
        />
    )
}

SwitchBase.displayName = 'Switch'

interface SwitchControleProps extends SwitchProps {
    name: string;
    control: Control<any>
}



function SwitchControlled({ name, control, ...rest }: SwitchControleProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <SwitchBase
                {...rest}
                    onValueChange={onChange}
                    value={value}
                />
            )}
        />
    )
}


SwitchControlled.displayName = 'SwitchControlled'


export const SwitchInput = {
    Switch: SwitchBase,
    SwitchControlled: SwitchControlled
}
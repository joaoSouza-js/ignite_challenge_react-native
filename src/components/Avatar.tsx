import { 
    HStack, 
    Avatar as NativeBaseAvatar, 
    IAvatarProps, 
    IconButton as IconButtonNativeBase, 
    Skeleton, 
    useTheme, 
    Center, 
    IIconButtonProps 
} from "native-base";
import { ComponentType, ReactNode } from "react";
import {IconProps as IconPropsPhospor, User} from 'phosphor-react-native'
import { Slot,SlotProps} from '@radix-ui/react-slot'
interface AvatarRootProps {
    children: ReactNode,
}

function AvatarRoot({children}:AvatarRootProps){
    return (
        <HStack>
            {children}
        </HStack>
    )
}
interface AvatarProps extends IAvatarProps {
    variant?: 'default' | 'small'
}
function AvatarAvatar({ size = 20, variant='default', ...props }: AvatarProps){
    return (
        <NativeBaseAvatar
            borderWidth={'3'}
            borderColor={'blue.500'}
            overflow={'hidden'}
            width={size}
            height={size}
            {...props}
         >
            <Center backgroundColor={'gray.400'} height={'full'} width={'full'}>
                <User size={variant === 'default' ? 24: 16} />
            </Center>
         </NativeBaseAvatar>
    )
}

interface IconProps extends IIconButtonProps {
    
}



function IconButton({children,...rest} :IconProps){
    const {colors} = useTheme()
    return (
        <IconButtonNativeBase 
            width={'10'}
            height={'10'}
            rounded={'full'}
            alignItems={'center'}
            justifyContent={'center'}
            position={'relative'}
            alignSelf={'flex-end'}
            marginLeft={'-7'}
            backgroundColor={'blue.400'} 
            _pressed={{
                backgroundColor: 'blue.500'
            }}
            {...rest}
            _icon={{
                color: 'white'
            }}
        />
            
    )
}

export function AvatarSkeleton(){
    return (
        <Skeleton
            rounded={'full'}
            startColor={'gray.400'}
            endColor={'gray.300'}
            width={"20"}
            height={'20'}
        />
    )
}

export const Avatar =  {
    Root: AvatarRoot,
    Avatar: AvatarAvatar,
    Button: IconButton,
    AvatarSkeleton: AvatarSkeleton
}
import { Heading as NativeBaseHeading, IHeadingProps } from 'native-base'

export function Heading(props: IHeadingProps) {
    return (
        <NativeBaseHeading
            fontFamily={'heading'}
            color={'gray.900'}
            fontSize={'sm'}
            {...props}
        />
    )
}
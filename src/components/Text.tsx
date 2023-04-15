import {Text as NativeBaseText, ITextAreaProps} from 'native-base'

export function Text(props: ITextAreaProps){
    return (
        <NativeBaseText
            fontFamily={'body'} 
            color={'gray.800'}
            fontSize={'sm'}
            {...props}
        />
    )
}
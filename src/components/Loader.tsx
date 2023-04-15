import { Center,Spinner } from 'native-base'


export function Loader(){
    return (
        <Center flex={1}>
            <Spinner 
                color={'blue.400'}
                size={'lg'}
            />
        </Center>

    )
}
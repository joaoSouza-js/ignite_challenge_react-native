import { Pressable, Image, Box, HStack, IPressableProps, VStack } from 'native-base'
import {ImageBackground} from 'react-native'
import { Avatar } from './Avatar'
import { Text } from './Text'
import { Heading } from './Heading'

interface CardProps extends IPressableProps {
    isUsed: boolean,
    isDeprecated?: boolean
    name: string,
    price: string
}

export function Card({ isUsed, isDeprecated=false, name, price, ...rest}:CardProps){
    return (
        <VStack 
      
            position={'relative'}  
            width={'45%'}
          
            marginBottom={'6'}
            marginRight={'10%'}
         
        >
            <Pressable
                _pressed={{
                    opacity: .7
                }}
                isDisabled={isDeprecated}
                backgroundColor={isDeprecated? 'black' : 'gray.300'}
                opacity={isDeprecated ? .6 : 1}
                rounded={'lg'}
                {...rest}
            >
                <Image 
                    rounded={'lg'}
                    alt=''
                    width={'full'}
                    height={100}
                    position={'absolute'}
                    source={{ uri:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=100'}}
                />
                <HStack
                    justifyContent={'space-between'}
                    height={100}
                    padding={1}
                >
                    <Avatar.Avatar borderWidth={2} borderColor={'white'} size={'6'} variant='small'/>
                    <Box 
                    
                    justifyContent={'center'}
                        h={7}
                    
                        paddingX={2}
                        rounded={'full'}
                        backgroundColor={isUsed ? 'gray.800' : 'blue.500'}
                    >
                        <Text
                            fontFamily={'heading'}
                            fontSize={'xs'}
                            textTransform={'uppercase'}
                            color={'white'}
                        
                        >
                            {isUsed ? 'usado' : 'Novo'}
                        </Text>
                    </Box>
                </HStack>

            </Pressable>
                {
                    isDeprecated && (
                    <Box  alignItems={'center'} >
                            <Text marginTop={-8} fontSize={'xs'} textTransform={'uppercase'} color={'white'}>Anúncio desativado</Text>

                        </Box>
                    )
                }
            <VStack padding={1}>
                <Text fontSize={'sm'} numberOfLines={1} color={isDeprecated ? 'gray.600' : 'gray.900'} fontFamily={'mono'}>{name}</Text>
                <HStack alignItems={'center'}>
                    <Text fontSize={'xs'} color={ isDeprecated ? 'gray.600': 'gray.900'} fontFamily={'heading'}>R$ </Text>
                    <Text fontSize={'md'} color={ isDeprecated ? 'gray.600': 'gray.900'} fontFamily={'heading'}> 
                        {price} 
                    </Text>

                </HStack>
            </VStack>

        </VStack>
    )
}
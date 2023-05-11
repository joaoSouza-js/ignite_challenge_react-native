import { Text } from './Text'
import { Avatar } from './Avatar'
import { Pressable, Image, Box, HStack, IPressableProps, VStack } from 'native-base'


interface CardProps extends IPressableProps {
    IsNew: boolean,
    isDeprecated?: boolean
    name: string,
    price: string,
    productUrl: string,
    userAvatarUrl: string,
}

export function Card({ IsNew, isDeprecated = false, name, price, productUrl, userAvatarUrl, ...rest}:CardProps){
    console.log(productUrl)
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
                    resizeMode='contain'
                    source={{ uri: productUrl }}
                />
                <HStack
                    justifyContent={'space-between'}
                    height={100}
                    padding={1}
                >
                    <Avatar.Avatar 
                        borderWidth={2} 
                        borderColor={'white'} 
                        size={'6'} 
                        source={{ uri: userAvatarUrl }}
                        variant='small'
                    />
                    <Box 
                    
                    justifyContent={'center'}
                        h={7}
                    
                        paddingX={2}
                        rounded={'full'}
                        backgroundColor={IsNew ? 'blue.500' : 'gray.800' }
                    >
                        <Text
                            fontFamily={'heading'}
                            fontSize={'xs'}
                            textTransform={'uppercase'}
                            color={'white'}
                        
                        >
                            {IsNew ? 'Novo': 'usado' }
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
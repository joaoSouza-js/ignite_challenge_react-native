import { Text } from './Text'
import { Avatar } from './Avatar'
import { Pressable, Image, Box, HStack, IPressableProps, VStack } from 'native-base'
import { priceFormatter } from '@utils/formates'


interface CardProps extends IPressableProps {
    IsNew: boolean,
    isActived?: boolean
    name: string,
    price: number,
    productUrl: string,
    userAvatarUrl?: string,
}

export function Card({ IsNew, isActived = true, name, price, productUrl, userAvatarUrl, ...rest}:CardProps){
  
    const priceFormated = priceFormatter.format(price).replace('R$', '')

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
         
                backgroundColor={isActived ? 'gray.300': 'black' }
                opacity={isActived ? 1 : .6}
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
                    {userAvatarUrl ? (
                        <Avatar.Avatar 
                            borderWidth={2} 
                            borderColor={'white'} 
                            size={'6'} 
                            source={{ uri: userAvatarUrl }}
                            variant='small'
                        />

                    ) : <Box/>}
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
                    !isActived && (
                    <Box  alignItems={'center'} >
                            <Text marginTop={-8} fontSize={'xs'} textTransform={'uppercase'} color={'white'}>Anúncio desativado</Text>

                        </Box>
                    )
                }
            <VStack padding={1}>
                <Text fontSize={'sm'} numberOfLines={1} color={isActived ? 'gray.900' :'gray.600' } fontFamily={'mono'}>{name}</Text>
                <HStack alignItems={'center'}>
                    <Text fontSize={'xs'} color={ isActived ?  'gray.900': 'gray.600'} fontFamily={'heading'}>R$ </Text>
                    <Text fontSize={'md'} color={ isActived ?  'gray.900': 'gray.600'} fontFamily={'heading'}> 
                        {priceFormated} 
                    </Text>

                </HStack>
            </VStack>

        </VStack>
    )
}
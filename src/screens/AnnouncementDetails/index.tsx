import { Dimensions ,ImageBackground } from 'react-native';
import Carousel from "react-native-reanimated-carousel";
import { PhotosMarkIndicator } from "./components/photosIndicator";
import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, WhatsappLogo } from "phosphor-react-native";
import { Box, HStack, IconButton, ScrollView, VStack, useTheme } from "native-base";

import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";
import { Heading } from "@components/Heading";

export function AnnouncementDetails(){
    const annoucementPhotos = [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=100',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=100',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',

    ]
    const screenWidth = Dimensions.get('screen').width;

    const {colors} = useTheme()

    console.log(Array.from({ length: 5 }).map((_, i) => i +1).map(index => 100 / index))

    return (
        <VStack flex={1}>
            <IconButton
                variant={'unstyled'}
                marginLeft={2} 
                marginBottom={3} 
                marginTop={2} 
                width={10}
                hitSlop={40}
                _pressed={{
                    opacity: '.5'
                }}
            >
                <ArrowLeft color="black" size={24}/>
            </IconButton>
           
            <Carousel
                loop
                width={screenWidth}
                height={280}
                data={annoucementPhotos}
                scrollAnimationDuration={300}
                renderItem={({ item, index})=> (
                    <ImageBackground
                        key={index} 
                        resizeMode="cover"
                        source={{uri: item}}
                        alt=""
                        style={{
                            height: '100%',
                            justifyContent: 'flex-end',
                            flex: 1
                        }}
                    >
                        <PhotosMarkIndicator length={annoucementPhotos.length} current={index} />
                    </ImageBackground>
                
                )}
            />
     
            <ScrollView contentContainerStyle={{padding: 24}}>
                <HStack alignItems={'center'}>
                    <Avatar.Avatar 
                        size={6}  
                        borderWidth={2} 
                        source={{
                            uri: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
                         }} 
                    />
                    <Text 
                        color={'gray.900'}
                        marginLeft={'2'}
                    >
                        Makenna Baptista
                    </Text>
                </HStack>
                <VStack marginTop={6}>
                    <Button
                        width={11}
                        padding={'0'}
                        
                        variant="secundary"
                    flex={0}
                        fontSize={'xs'}
                        _text={{
                            fontSize: 'xs',
                            fontFamily: 'heading'
                        }}
                        rounded={'full'}
                    
                    >
                        Novo
                    </Button>
                    <HStack  
                        marginTop={'2'} 
                        alignItems={'center'} 
                        justifyContent={'space-between'}
                    >
                        <Heading>Bicicleta</Heading>
                        <Text
                            color={'blue.500'}
                            fontFamily={'heading'}
                            fontSize={'xl'}
                        >
                            <Text color={'blue.500'} fontFamily={'heading'}>
                                R$ 
                            </Text> 
                            120,00
                        </Text>

                    </HStack>
                    <Text marginTop={2} >
                        Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.
                        
                    </Text>
                </VStack>

                <HStack marginTop={6}>
                    <Text fontFamily={'heading'}>Aceita troca? </Text>
                    <Text>{' '}Sim</Text>
                </HStack>

                <VStack marginTop={6} >
                    <Heading marginTop={2}>Meios de pagamento:</Heading>
                    <HStack alignItems={'center'}> 
                        <Barcode color={colors.gray[900]} size={20} /> 
                        <Text marginLeft={2} >Boleto </Text>
                    </HStack>
                    <HStack alignItems={'center'} marginTop={1}>
                        <QrCode color={colors.gray[900]} size={20}  />
                        <Text marginLeft={2} >Pix </Text>
                    </HStack>
                    <HStack alignItems={'center'} marginTop={1}>
                        <Money  color={colors.gray[900]} size={20} />
                        <Text marginLeft={2} >Dinheiro </Text>
                    </HStack>
                    <HStack alignItems={'center'} marginTop={1}>
                        <CreditCard  color={colors.gray[900]} size={20} />
                        <Text marginLeft={2} >Cartão de Crédito </Text>
                    </HStack>
                    <HStack alignItems={'center'} marginTop={1}>
                        <Bank color={colors.gray[900]} size={20}  />
                        <Text marginLeft={2} >Depósito Bancário </Text>
                    </HStack>
                    
                </VStack>

            </ScrollView>

            <HStack 
                paddingX={6} 
                paddingY={5} 
                alignItems={'center'}
                backgroundColor={'gray.100'} 
                justifyContent={'space-between'}
            >
                <Text
                    color={'blue.500'}
                    fontFamily={'heading'}
                    fontSize={'xl'}
                >
                    <Text color={'blue.500'} fontFamily={'heading'}>
                        R$ 
                    </Text> 
                    120,00
                </Text>
                <Button 
                    leftIcon={<WhatsappLogo color={colors.gray[100]} weight="fill" size={20}/>} 
                    variant="tertiary" width={'50%'}
                >
                    Entrar em contato
                </Button>
            </HStack>
        </VStack>
    )
}
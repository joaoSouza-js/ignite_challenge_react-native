
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, WhatsappLogo } from "phosphor-react-native";
import {NativeStackScreenProps } from '@react-navigation/native-stack'
import { HStack, IconButton, ScrollView, VStack, useTheme } from "native-base";

import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";
import { Heading } from "@components/Heading";
import { PhotosCarousel } from '@components/PhotosCarousel';

import { api } from '@libs/axios';
import { AppRouteParamList } from '@routes/app';
import { ProductsProps } from 'src/DTO/productDTO';

import { imageBaseUrl } from '@utils/ImageBaseUrl';
import { paymentsForm } from '@utils/paymets';

interface ProductUserProps extends ProductsProps {
    description: string;
    user: {
        avatar: string;
        name: string;
        tel:  string

    }
}

export function AnnouncementDetails({route: {params},navigation }: NativeStackScreenProps<AppRouteParamList, 'AnnouncementDetails' >){
  
   
    const { colors } = useTheme()

    const {data: product} = useQuery<ProductUserProps>(['productDetais', params.productId], async () => {
        const response = await api.get<ProductUserProps>(`/products/${params.productId}`)

        return response.data
    })

    const annoucementPhotosUrl =  product?.product_images.map(productImage => {
        const imageUrl = `${imageBaseUrl}/${productImage.path}`
        return imageUrl
    }) || []

    const acceptPayments =  paymentsForm.filter(payment => {
        if (!product?.payment_methods) return false

        const PaymentFormExist = product.payment_methods.some(paymentForm => paymentForm.key === payment.name)

        return PaymentFormExist
    }) 

    
  

    
    
    return (
        <VStack flex={1}>
            <IconButton
                onPress={() => navigation.goBack()}
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
           
            <PhotosCarousel
                images={annoucementPhotosUrl}
            />
     
            <ScrollView contentContainerStyle={{padding: 24}}>
                <HStack alignItems={'center'}>
                    <Avatar.Avatar 
                        size={6}  
                        borderWidth={2} 
                        source={{
                            uri: `${imageBaseUrl}/${product?.user.avatar}`,
                         }} 
                    />
                    <Text 
                        color={'gray.900'}
                        marginLeft={'2'}
                    >
                        {product?.user.name}
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
                        <Heading>{product?.name}</Heading>
                        <Text
                            color={'blue.500'}
                            fontFamily={'heading'}
                            fontSize={'xl'}
                        >
                            <Text color={'blue.500'} fontFamily={'heading'}>
                                R$ 
                            </Text> 
                            {product!?.price  / 100}
                        </Text>

                    </HStack>
                    <Text marginTop={2} >{product?.description}</Text>
                </VStack>

                <HStack marginTop={6}>
                    <Text fontFamily={'heading'}>Aceita troca? </Text>
                    <Text>{' '}{product?.accept_trade ? 'Sim' : 'Não'}</Text>
                </HStack>

                <VStack marginTop={6} >
                    <Heading marginTop={2}>Meios de pagamento:</Heading>
                    {
                        acceptPayments.map(({ Icon, label, name }) => (
                            <HStack marginTop={1} key={name} alignItems={'center'}>
                                <Icon color={colors.gray[900]} size={20} />
                                <Text marginLeft={2} >{label} </Text>
                            </HStack>

                        ))
                    }
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
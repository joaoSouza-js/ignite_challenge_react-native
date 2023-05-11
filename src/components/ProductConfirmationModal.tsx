import uuid from 'react-native-uuid';
import { ScrollView } from 'react-native';
import { Modal, ModalProps} from 'react-native'
import { ArrowLeft, Tag } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {  Center, HStack, VStack, useTheme, useToast } from "native-base";


import { paymentsForm } from "@utils/paymets";

import { Text } from "@components/Text";
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Heading } from "@components/Heading";
import { PhotosCarousel } from "@components/PhotosCarousel";
import { ImageProps } from './AddPhotoButton';
import { api } from '@libs/axios';
import { useState } from 'react';
import { AppError } from '@utils/AppError';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app';


interface ProductConfirmationModal extends ModalProps {
    closeProductConfirmationModal: () => void;
    images: ImageProps[];
    name: string;
    price: number | string;
    description: string;
    acceptTrade: boolean;
    isNew: boolean;
    acceptPaymentsForm: string[]
}

export function ProductConfirmationModal(
    { 
        closeProductConfirmationModal, 
        images, 
        acceptTrade, 
        description, 
        name,  
        price,
        isNew,
        acceptPaymentsForm,
         ...rest
    }: ProductConfirmationModal){

    const {colors} = useTheme()
    const imagesWithOnlyUri  = images.map(image  => image.uri)
    const [appIsLoading, setAppIsLoading] = useState(false)
    const acceptPayments = paymentsForm.filter(payment =>{
        const PaymentExist = acceptPaymentsForm.some(paymentForm => paymentForm === payment.name )
        return PaymentExist
    })
    const Toast = useToast()

    const Navigation = useNavigation<AppNavigatorRoutesProps>()

    function handldeGoToHomeScreen(){
        Navigation.navigate('HomeTabs')
    }

    async function handleConfirmProduct(){
        try {
            setAppIsLoading(true)
            const productResponse = await api.post<{id:string}>('/products', {
                name: name,
                description: description,
                is_new: isNew ,
                price: price as number * 100,
                accept_trade: acceptTrade,
                payment_methods: acceptPaymentsForm
            })
            
            const imagesFormated = images.map(image => {
                const fileExtension = image.uri.split('.').pop()
                const photoFileName = `${uuid.v4()}.${fileExtension}`.toLowerCase()
    
                const imageFormated = {
                    name: photoFileName,
                    uri: image.uri,
                    type: `${image.type}/${fileExtension}`
                }
                return imageFormated
            })

            const photosForm = new FormData()

            photosForm.append('images', imagesFormated[0] as any)


            imagesFormated.forEach((image) => {
                photosForm.append('images', image as any);
            })
            
            photosForm.append('product_id', productResponse.data.id)
    
            const photosResponse = await api.post('/products/images', photosForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            handldeGoToHomeScreen()
           
        } catch (error) {
            const isAppError = error instanceof AppError
            Toast.show({
                title: isAppError ? error.message : 'Ocorreu um erro ao criar o produto',
            })
            setAppIsLoading(false)   
        }
        finally{
            setAppIsLoading(false)
        }
        
    }

    return (
        <Modal animationType="fade" {...rest} statusBarTranslucent >
                <VStack
                
                    backgroundColor={'gray.300'}
                    flex={1}
                >
                    <SafeAreaView
                        style={{
                            alignItems:'center',
                            backgroundColor: colors.blue[400],
                            paddingBottom: 16,
                            paddingTop: 20,
                            paddingHorizontal: 24,

                        }}
                    >
                     
                            <Heading color={'green.100'} fontSize={'md'} >
                                Pré visualização do anúncio
                            </Heading>
                            <Text color={'green.100'} fontSize={'sm'}>
                                É assim que seu produto vai aparecer!
                            </Text>

                
        
                    </SafeAreaView>
                    <PhotosCarousel
                        images={imagesWithOnlyUri}
                    />
                <ScrollView contentContainerStyle={{ padding: 24 }}>
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
                        <Center
                            width={14}
                            paddingY={'px'}

                            backgroundColor={isNew ?  'blue.400': 'gray.400'}
                            rounded={'full'}

                        >
                            <Text
                                fontSize={'xs'}
                                fontFamily={'heading'}
                                color={isNew ?'gray.100' : 'gray.700' }
                            >
                                {isNew ? 'Novo' : 'Usado'}
                                
                            </Text>
                        </Center>

                        <HStack
                            marginTop={'2'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                        >
                            <Heading>{name}</Heading>
                            <Text
                                color={'blue.500'}
                                fontFamily={'heading'}
                                fontSize={'xl'}
                            >
                                <Text color={'blue.500'} fontFamily={'heading'}>
                                    R$
                                </Text>
                               {price}
                            </Text>

                        </HStack>
                        <Text marginTop={2} >{description}</Text>
                    </VStack>

                    <HStack marginTop={6}>
                        <Text fontFamily={'heading'}>Aceita troca? </Text>
                        <Text>{' '}{acceptTrade ? 'Sim' : 'Não'}</Text>
                    </HStack>

                    <VStack marginTop={6} >
                        <Heading marginTop={2}>Meios de pagamento:</Heading>
                        {
                            acceptPayments.map(( {Icon,label,name})=> (
                                <HStack marginTop={1}  key={name} alignItems={'center'}>
                                    <Icon color={colors.gray[900]} size={20} />
                                    <Text marginLeft={2} >{label} </Text>
                                </HStack>

                            ))
                        }
                      

                    </VStack>

                </ScrollView>

                    <HStack
                        backgroundColor={'white'}
                        justifyContent={'space-between'}
                        paddingX={6}
                        paddingTop={5}
                        paddingBottom={4}
                    >
                        <Button 
                            onPress={closeProductConfirmationModal}
                            variant="secundary" 
                            width={'48%'}
                            leftIcon={<ArrowLeft color={colors.gray[900]} size={20}/>
                            
                        }
                            >
                                Voltar e editar 
                        </Button>
                        <Button 
                            variant="tertiary"
                            onPress={handleConfirmProduct}
                            isLoading={appIsLoading}
                            leftIcon={<Tag size={20} color={colors.white} />}
                            width={'48%'}
                        >Publicar 
                        </Button>
                    </HStack>

                  

                 
                </VStack>

         
        </Modal>
    )
}
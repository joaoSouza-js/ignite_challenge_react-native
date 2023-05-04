import { ScrollView } from 'react-native';
import { Modal, ModalProps} from 'react-native'
import { ArrowLeft, Tag } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {  Center, HStack, VStack, useTheme } from "native-base";


import { paymentsForm } from "@utils/paymets";

import { Text } from "@components/Text";
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Heading } from "@components/Heading";
import { PhotosCarousel } from "@components/PhotosCarousel";
import { ImageProps } from './AddPhotoButton';


interface ProductConfirmationModal extends ModalProps {
    closeProductConfirmationModal: () => void;
    images: ImageProps[];
    name: string;
    price: number | string;
    description: string;
    acceptTrade: boolean;
    isUsed: boolean;
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
        isUsed,
        acceptPaymentsForm,
         ...rest
    }: ProductConfirmationModal){

    const {colors} = useTheme()
    const imagesWithOnlyUri  = images.map(image  => image.uri)
    const acceptPayments = paymentsForm.filter(payment =>{
        const PaymentExist = acceptPaymentsForm.some(paymentForm => paymentForm === payment.name )
        return PaymentExist
    })

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

                            backgroundColor={isUsed ? 'gray.400': 'blue.400'}
                            rounded={'full'}

                        >
                            <Text
                                fontSize={'xs'}
                                fontFamily={'heading'}
                                color={isUsed ? 'gray.700' : 'gray.100'}
                            >
                                {isUsed ? 'Usado': 'Novo'}
                                
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
                            leftIcon={<Tag size={20} color={colors.white} />}
                            width={'48%'}
                        >Publicar 
                        </Button>
                    </HStack>

                  

                 
                </VStack>

         
        </Modal>
    )
}
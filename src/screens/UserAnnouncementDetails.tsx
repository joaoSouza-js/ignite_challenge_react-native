import { HStack, IconButton, ScrollView, VStack, useTheme, useToast } from "native-base";
import { ArrowLeft, PencilSimpleLine, Power, TrashSimple} from "phosphor-react-native";
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { AppRouteParamList } from "@routes/app";
import { useQuery } from "@tanstack/react-query";
import { api } from "@libs/axios";
import { ProductProps } from "src/DTO/productDTO";
import { cos } from "react-native-reanimated";
import { imageBaseUrl } from "@utils/ImageBaseUrl";
import { PhotosCarousel } from "@components/PhotosCarousel";
import { Heading } from "@components/Heading";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";
import { paymentsForm } from "@utils/paymets";
import { priceFormatter } from "@utils/formates";
import { useState } from "react";
import { AppError } from "@utils/AppError";



interface ProductUserProps extends ProductProps {
    description: string;
    user: {
        avatar: string;
        name: string;
        tel: string

    }
}

export function UserAnnoucementDtails({ navigation,route:{params} }: NativeStackScreenProps<AppRouteParamList,'UserAnnouncementDetails'>){
    const {colors} = useTheme()
    const [productIsActived, setProductIsActived] = useState(true)
    const [appIsSubmitting, setAppIsSubmitting] = useState(false)
    const { data: product } = useQuery<ProductUserProps>(['productDetais', params.productId], async () => {
        const response = await api.get<ProductUserProps>(`/products/${params.productId}`)
        console.log(response.data)
        setProductIsActived(response.data.is_active)
        return response.data
    },)
    const Toast = useToast()
    async function handleChangeProductActiveStatus() {
        try {
            setAppIsSubmitting(true)
            await api.patch(`/products/${params.productId}`, {
                is_active: !productIsActived
            })
            setProductIsActived(!productIsActived)
        } catch (error) {
            const isAppError = error instanceof AppError
            Toast.show({
                title: isAppError ? error.message : 'Ocorreu um erro ao tentar atualizar o status do produto',
                placement: 'top',
                backgroundColor: 'red.500',
            })
        }
        finally {
            setAppIsSubmitting(false)
        }
    }

    function navitgateToUserAnnoucementsScreen(){
        navigation.goBack()
    }
    
    async function handleDeleteProduct() {
        try {
            setAppIsSubmitting(true)
            await api.delete(`/products/${params.productId}`)
            navigation.goBack()
            
        } catch (error) {
            const isAppError = error instanceof AppError
            Toast.show({
                title: isAppError ? error.message : 'Ocorreu um erro ao tentar atualizar o status do produto',
                placement: 'top',
                backgroundColor: 'red.500',
            })
        }
        finally {
            setAppIsSubmitting(false)
        }
    }


     function handleNavigateToEditAnnouncementScreen(){
        navigation.navigate('EditAnnouncement',{
            productId: params.productId
        })
    }

    const annoucementPhotosUrl = product?.product_images.map(productImage => {
        const imageUrl = `${imageBaseUrl}/${productImage.path}`
        return imageUrl
    }) || []

    const acceptPayments = paymentsForm.filter(payment => {
        if (!product?.payment_methods) return false

        const PaymentFormExist = product.payment_methods.some(paymentForm => paymentForm.key === payment.name)

        return PaymentFormExist
    }) 

    const productPriceFormated = product?.price ? priceFormatter.format(product?.price / 100).replace('R$', '') : '0,00'
    
    return (
        <VStack flex={1}>
            <HStack justifyContent={'space-between'} paddingX={6} marginTop={5} alignItems={'center'}>
                <IconButton
                    variant={'unstyled'}
                    width={8}
                    height={8}
                    _pressed={{
                        opacity: .7
                    }}
                    hitSlop={50}
                    icon={<ArrowLeft size={24} color={colors.gray[900]} />}
                    onPress={navitgateToUserAnnoucementsScreen}
              
                />
               
                

                <IconButton
                    variant={'unstyled'}
                    width={8}
                    height={8}
                    _pressed={{
                        opacity: .7
                    }}
                    hitSlop={50}
                    icon={<PencilSimpleLine size={24} color={colors.gray[900]} />}
                    onPress={handleNavigateToEditAnnouncementScreen}
                />
                
            
            </HStack>
            <VStack marginTop={4} flex={1}>
                    <PhotosCarousel
                        isActived={productIsActived}
                        images={annoucementPhotosUrl}
                    />
                <ScrollView contentContainerStyle={{ padding: 24,flexGrow:1}}>
                    <HStack alignItems={'center'}>
                        <Avatar.Avatar
                            size={6}
                            borderWidth={2}
                            source={{
                                uri: `${imageBaseUrl}/${product?.user.avatar}` ?? undefined,
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
                                {productPriceFormated}
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
                <VStack paddingX={6} marginTop={'2'} marginBottom={4}>
                    <Button 
                        variant={productIsActived ? 'primary' : 'tertiary'}
                        leftIcon={<Power size={16} color={colors.gray[100]} />}
                        onPress={handleChangeProductActiveStatus}
                        isLoading={appIsSubmitting}

                    >
                       {product?.is_active ? 'Desativar anúncio' : 'Reativar anúncio'}
                    </Button>
                    <Button
                        onPress={handleDeleteProduct}
                        marginTop={2}
                        leftIcon={<TrashSimple size={16} color={colors.gray[900]}/>}
                        variant="secundary"
                    >
                        Excluir anúncio
                    </Button>
                </VStack>

            </VStack>
        </VStack>
    )
}
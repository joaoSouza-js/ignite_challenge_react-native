import { z } from "zod";
import { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from 'react-native' 
import { HStack, ScrollView, Switch, VStack, useToast } from "native-base";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Text } from "@components/Text";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Heading } from "@components/Heading";
import { CheckBox } from "@components/CheckBox";
import { TextArea } from "@components/TextArea";
import { TextInput } from "@components/TextInput";
import { PhotoCard } from "@components/PhotoCard";
import { PhotoModal } from "../../components/PhotoModal";
import { SelectProductState } from "@components/SelectProductState";
import { AddPhotoButton, ImageProps } from "@components/AddPhotoButton";
import { ProductConfirmationModal } from "../../components/ProductConfirmationModal";

import { paymentsForm } from "@utils/paymets";
import { zodResolver } from "@hookform/resolvers/zod";

const createProductSchemea = z.object({
    name: z.string({ required_error: 'Informe o Nome do Produto'}).min(4,'O nome deve conter no mínimo 4 caracteres'),
    description: z.string({ required_error: 'Informe a Descrição do Produto'}).min(10,'A descrição deve conter no mínimo 10 caracteres'),
    price: z.number({ required_error: 'Informe o Preço do Produto'}).min(1, 'O preço deve ser maior que 0'),
    isNew: z.boolean(),
    acceptTrade: z.boolean(),
    paymentMethods: z.array(z.object({
        name: z.string(),
        label: z.string(),
        isChecked: z.boolean(),
    })).refine((paymentMethods) => paymentMethods.some(payment => payment.isChecked) , {
        message: 'Selecione pelo menos uma forma de pagamento',
    })
    .transform((paymentMethods) => paymentMethods.filter(payment => payment.isChecked))
    ,
})

type createProductFormData = z.infer<typeof createProductSchemea>

export function CreateAnnouncement(){
    const [images, setImages] = useState<ImageProps[]>([])
    const [photoModalIsVisible, setPhotoModalIsVisible] = useState(false)
    const [productInformations, setProductInformations] = useState<createProductFormData>({} as createProductFormData,)
    
    const [photoModal, setPhotoModal] = useState<string | undefined>()
    const [ProductConfirmationModalIsVisible, setProductConfirmationModalIsVisible] = useState(false)

    const { handleSubmit, formState, control} = useForm<createProductFormData>({
        resolver: zodResolver(createProductSchemea),
        defaultValues: {
            isNew: true,
            acceptTrade: false,
            
            paymentMethods: paymentsForm.map(payment => {
                return {
                    name: payment.name,
                    label: payment.label,
                    isChecked: false,
                }
            })
        }
    })
    const { fields: paymentMethods } = useFieldArray({ 
        control, name: 'paymentMethods' 
    })
    const { errors,isSubmitting } = formState

    const Toast = useToast()

    function openPhotoModal(photoUrl: string){
        setPhotoModal(photoUrl)
        setPhotoModalIsVisible(true)
    }

    function closePhotoModal(){
        setPhotoModalIsVisible(false)
    }

    function openProductConfirmationModal() {
        setProductConfirmationModalIsVisible(true)
    }

    function closeProductConfirmationModal() {
        setProductConfirmationModalIsVisible(false)
    }

    function handleCheckFileds(formData: createProductFormData){
        if(!images.length){
            return Toast.show({
                title: 'Selecione pelo menos uma imagem',
                placement: 'top',
                backgroundColor: 'red.500',
            })
        }
        setProductInformations(formData)

        openProductConfirmationModal()
    }

    function updateImages(newImages: ImageProps[]){
        const newImagesWithoutRepetition = newImages.filter(image => {
            const imageExist = images.some(oldImage => oldImage.assetId === image.assetId)
            return !imageExist
        })

        const imagesUpdated = [...newImagesWithoutRepetition,...images].slice(0,3)
        setImages(imagesUpdated)
    }

    function deleteImage(imageId: string){
        const imageWithoutOneImage = images.filter(image => image.assetId !== imageId)
        setImages(imageWithoutOneImage)
    }


    return (
         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <VStack flex={1}>
                <ScrollView 
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: 58
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    
                    <Header
                        title="Criar anúncio"
                        onScreenNavigate={() => {}}  
                    />
          
                    <VStack marginTop={6} paddingX={6}>
                        <Heading fontSize={'md'}>Imagens</Heading>
                        <Text color={'gray.700'}>
                            Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
                        </Text>

                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            marginTop={4}
                        >
                            {
                                images.map(image => (
                                    <PhotoCard 
                                        id={image.assetId as string}
                                        key={image.assetId}
                                        deleteImage={deleteImage}
                                        imageUrl={image.uri}
                                        openPhotoModal={openPhotoModal}
                                        
                                    />
                                ) )
                            }
                            
                            
                            {
                                images.length < 3 && (
                                    <AddPhotoButton
            
                                        handleAddImages={updateImages}
                                    />
                                )
                            }
                        </ScrollView> 


                        <VStack marginTop={6}>
                            <Heading fontSize={'md'}>Sobre o produto</Heading>
                            <TextInput.Root marginTop={'4'}>
                                <TextInput.InputControlled
                                    control={control}
                                    name={'name'}
                                    placeholder="Título do anúncio" 
                                />
                                {errors.name && (
                                    <TextInput.Error>{errors.name.message}</TextInput.Error>
                                )}
                            </TextInput.Root>

                            <TextArea.Root marginTop={'4'}>
                                <TextArea.TextAreaControled
                                    control={control}
                                    name="description" 
                                    placeholder="Fale um Sobre o produto"
                                />
                                {errors.description && (
                                    <TextArea.Error>{errors.description.message}</TextArea.Error>
                                )}
                            
                            </TextArea.Root>

                            <SelectProductState.Controled
                                name="isNew"
                                control={control}
                            />

                                   
                        </VStack>

                        <VStack marginTop={8}>
                            <Heading fontSize={'md'}>
                                Venda
                            </Heading>
                            <TextInput.Root marginTop={4}>
                                <HStack 
                                    alignItems={'center'}
                                    backgroundColor={'gray.100'}
                                    rounded={'md'}
                                    width={'full'}
                                    paddingX={4}
                                >
                                    <Text
                                        fontSize={'md'}
                                        color={'gray.900'}
                                    >R$
                                    </Text>
                                    <TextInput.InputControlled
                                        name="price"
                                        keyboardType="numeric" 
                                        control={control}
                                        flex={1}
                                        _focus={{
                                            borderWidth: '0'
                                        }}
                                    />

                                </HStack>
                                {
                                    errors.price && (
                                        <TextInput.Error>{errors.price.message}</TextInput.Error>
                                    )
                                }

                            </TextInput.Root>

                            <VStack alignItems={'flex-start'} marginTop={4}>
                                <Heading fontSize={'sm'}>
                                    Aceita troca?
                                </Heading>
                                <Switch isChecked onTrackColor={'blue.400'} />
                            </VStack>
                            <VStack marginTop={6}>
                                <Heading  fontSize={'sm'}>Meios de pagamento aceitos</Heading>
                                {
                                    paymentMethods.map((paymentMethod,index) => (
                                    <Controller
                                        control={control}
                                        key={index}
                                        name={`paymentMethods.${index}.isChecked`}
                                        render={({ field: { onChange, value } }) => (
                                            <CheckBox
                                                
                                                onChange={isCheckd => onChange(isCheckd)}
                                                isChecked={value}
                                                id={index.toString()}
                                                label={paymentMethod.label}
                                                value={paymentMethod.name}
                                            />

                                        )} 
                                    />

                                    ))
                                }
                                {
                                    errors.paymentMethods && (
                                        <Text
                                            marginTop={2}
                                            color={'red.400'}
                                            fontSize={'xs'}
                                        >{errors.paymentMethods.message}</Text>
                                    )
                                }
                                
                               

                            </VStack>


                        </VStack>

                    </VStack>
                  
                </ScrollView>
                <HStack
                    backgroundColor={'white'}
                    justifyContent={'space-between'}
                    paddingX={6}
                    paddingTop={5}
                    paddingBottom={4}
                >
                    <Button variant="secundary" width={'48%'}>Cancelar </Button>
                    <Button 
                        onPress={handleSubmit(handleCheckFileds)}
                        width={'48%'}
                        isLoading={isSubmitting}
                    >   Avançar 
                    </Button>
                </HStack> 

                <PhotoModal
                    visible={photoModalIsVisible}
                    photoUrl={photoModal}
                    closePhotoModal={closePhotoModal}
                />
                <ProductConfirmationModal
                    images={images}
                    visible={ProductConfirmationModalIsVisible}
                    name={productInformations.name}
                    acceptTrade={productInformations.acceptTrade}
                    isNew={productInformations.isNew}
                    acceptPaymentsForm={productInformations.paymentMethods ? productInformations.paymentMethods.map(paymentMethod => paymentMethod.name): []}
                    description={productInformations.description}
                    price={productInformations.price}
                    closeProductConfirmationModal={closeProductConfirmationModal}
                />
            </VStack>


         </TouchableWithoutFeedback>
    )
}
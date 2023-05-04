import { useState } from "react";

import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { HStack, Radio, ScrollView, Switch, VStack } from "native-base";

import { Text } from "@components/Text";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Heading } from "@components/Heading";
import { TextArea } from "@components/TextArea";
import { CheckBox } from "@components/CheckBox";
import { TextInput } from "@components/TextInput";
import { ProductConfirmationModal } from "../../components/ProductConfirmationModal";
import { AddPhotoButton, ImageProps } from "@components/AddPhotoButton";
import { PhotoCard } from "@components/PhotoCard";
import { PhotoModal } from "@components/PhotoModal";

export function EditAnnouncement() {
    const [images, setImages] = useState<ImageProps[]>([])
    const [photoModalIsVisible, setPhotoModalIsVisible] = useState(false)
    const [ProductConfirmationModalIsVisible, setProductConfirmationModalIsVisible] = useState(false)

    const [photoModal, setPhotoModal] = useState<string | undefined>()

    function openPhotoModal(photoUrl: string) {
        setPhotoModal(photoUrl)
        setPhotoModalIsVisible(true)
    }

    function closePhotoModal() {
        setPhotoModalIsVisible(false)
    }

    function openProductConfirmationModal() {
        setProductConfirmationModalIsVisible(true)
    }


    function closeProductConfirmationModal() {
        setProductConfirmationModalIsVisible(false)
    }

    function updateImages(newImages: ImageProps[]) {
        const newImagesWithoutRepetition = newImages.filter(image => {
            const imageExist = images.some(oldImage => oldImage.assetId === image.assetId)
            return !imageExist
        })

        const imagesUpdated = [...newImagesWithoutRepetition, ...images].slice(0, 3)
        setImages(imagesUpdated)
    }

    function deleteImage(imageId: string) {
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
                        onScreenNavigate={() => { }}
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
                                ))
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
                            <TextArea.Root marginTop={'4'}>
                                <TextInput.Input placeholder="Título do anúncio" />
                            </TextArea.Root>

                            <TextInput.Root marginTop={'4'}>
                                <TextArea.TextArea
                                    placeholder="Fale um Sobre o produto"
                                />
                            </TextInput.Root>

                            <Radio.Group
                                defaultValue="new"
                                width={'full'}
                                name="position"
                            >
                                <HStack
                                    marginTop={'4'}
                                    width={'full'}
                                    colorScheme={'purple'}
                                    justifyContent={'space-between'}
                                >
                                    <Radio
                                        value="new"
                                        _checked={{
                                            borderColor: 'blue.400',

                                        }}
                                        colorScheme={'blue'}
                                    >
                                        Produto novo
                                    </Radio>
                                    <Radio
                                        value="new"
                                        _checked={{
                                            borderColor: 'blue.400',

                                        }}
                                        colorScheme={'blue'}
                                    >
                                        Produto novo
                                    </Radio>

                                </HStack>
                            </Radio.Group>
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
                                    <TextInput.Input
                                        flex={1}
                                        _focus={{
                                            borderWidth: '0'
                                        }}
                                    />

                                </HStack>


                            </TextInput.Root>

                            <VStack alignItems={'flex-start'} marginTop={4}>
                                <Heading fontSize={'sm'}>
                                    Aceita troca?
                                </Heading>
                                <Switch onTrackColor={'blue.400'} onChange={() => { }} />
                            </VStack>
                            <VStack marginTop={6}>
                                <Heading fontSize={'sm'}>Meios de pagamento aceitos</Heading>
                                <CheckBox
                                    label="Boleto"
                                    value="Boleto"
                                />
                                <CheckBox
                                    label="pix"
                                    value="pix"
                                />
                                <CheckBox
                                    label="dinheiro"
                                    value="money"
                                />
                                <CheckBox
                                    label="Cartão de Crédito"
                                    value="credCard"
                                />
                                <CheckBox
                                    label="Depósito Bancário"
                                    value="Depósito Bancário"
                                />


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
                        onPress={openProductConfirmationModal}
                        width={'48%'}
                    >Avançar </Button>
                </HStack>

                <PhotoModal
                    visible={photoModalIsVisible}
                    photoUrl={photoModal}
                    closePhotoModal={closePhotoModal}
                />
                <ProductConfirmationModal
                    images={images}
                    visible={ProductConfirmationModalIsVisible}
                    name="Bicicleta"
                    acceptTrade={true}
                    isUsed={false}
                    acceptPaymentsForm={['boleto', 'pix']}
                    description='ldodod'
                    price={20}
                    closeProductConfirmationModal={closeProductConfirmationModal}
                />
            </VStack>


        </TouchableWithoutFeedback>
    )
}
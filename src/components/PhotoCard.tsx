import { Button, IconButton, Image, Modal, VStack } from "native-base";
import { X } from "phosphor-react-native";
import { ImageBackground, ImageBackgroundProps, TouchableOpacity } from 'react-native'

interface PhotoCardProps  {
    deleteImage: (imageId: string) => void;
    id: string;
    imageUrl: string;
    openPhotoModal: (photoUrl: string) => void

}

export function PhotoCard({ deleteImage, openPhotoModal, id, imageUrl, ...rest }: PhotoCardProps) {
    function handleDeleteImage(){
        deleteImage(id)
    }

    function handleOpenPhotoModal(){
        openPhotoModal(imageUrl)
    }
    

    return (
        <VStack>
            <TouchableOpacity
                activeOpacity={.7}
                style={{
                    borderRadius: 6,
                    height: 100,
                    width: 100,
                    marginRight: 8
                }}
                onPress={handleOpenPhotoModal}
            
            >
                <ImageBackground
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems:'flex-end',
                    }}
                    resizeMode="cover"
                    source={{ uri: imageUrl }}

                >   
                    <IconButton
                        variant={'unstyled'}
                        margin={1}
                        padding={0}
                        rounded={'full'}
                        height={4}
                        width={4}
                        hitSlop={30}
                        icon={<X style={{}} size={12} color="#fff" />}
                        backgroundColor={'gray.800'}
                        _pressed={{
                            opacity: .7
                        }}
                        onPress={handleDeleteImage}
                    />
                        
                

                </ImageBackground>
            </TouchableOpacity>
         
        </VStack>
    )
}
import { Button } from "@components/Button";
import { IconButton, useTheme, useToast } from "native-base";
import { Plus } from "phosphor-react-native";
import * as ImagePicker from 'expo-image-picker';


export type ImageProps = ImagePicker.ImagePickerAsset

interface AddPhotoButtonProps {
    handleAddImages: (photos: ImageProps[]) => void
}

export function AddPhotoButton({handleAddImages}:AddPhotoButtonProps){
    const {colors} = useTheme()
    const Toast = useToast()

    async function handlePickImages() {
        const response  = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 4],
            quality: 1,
            selectionLimit: 3 , //only work in ios
            allowsMultipleSelection: true
        });


        if (response.canceled) {
           return Toast.show({
                title: 'falha ao selectionar as imagens',
                backgroundColor: 'red.400',
                placement: 'top'
            }) 
        }

        const photos = response.assets?.slice(0,3)
        handleAddImages(response.assets)
    };
    return (
        <IconButton 
            height={25}  
            width={25}
            onPress={handlePickImages} 
            variant="secundary"
            backgroundColor={'gray.400'}
            rounded={'md'}
            icon={<Plus color={colors.gray[600]}  size={24}/>}
        >
           

        </IconButton>
    )
}
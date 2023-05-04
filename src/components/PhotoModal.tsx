import { Center, Image, VStack } from "native-base";
import {Modal, ModalProps,TouchableOpacity,TouchableWithoutFeedback} from "react-native"

interface PhotoModalProps extends ModalProps {
    photoUrl: string | undefined;
    alt?: string;
    closePhotoModal: ()  => void;
}
export function PhotoModal({photoUrl,closePhotoModal, alt,...rest}:PhotoModalProps){

    return (


        <Modal animationType="fade"  {...rest}  transparent>
         
            <TouchableWithoutFeedback 
                onPress={() => closePhotoModal()}
           >    
                <Center 
                    flex={1}
                    paddingX={6}
                    backgroundColor={'#0000002e'}    
                >
                    <TouchableOpacity
                        activeOpacity={1}
                    style={{
                        height: 300,
                        width: '100%'
                    }}>
                        {!!photoUrl && (
                            <Image
                                resizeMode="contain"
                                rounded={'lg'}
                                width={'100%'}
                                height={'300'}
                                alt=""
                                source={{uri: photoUrl}}
                            />

                        )}

                    </TouchableOpacity>

                </Center>
                
            </TouchableWithoutFeedback>



                

            
        </Modal>
      
    )
}
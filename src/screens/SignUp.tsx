import { Keyboard, TouchableWithoutFeedback } from "react-native";
import Logo from '@assets/logo.svg'
import { ScrollView, VStack,Image,Box, Center } from 'native-base'
import { Heading } from "@components/Heading";
import { Text } from "@components/Text";
import { TextInput } from "@components/TextInput";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";
import {PencilSimpleLine} from 'phosphor-react-native'
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { ScreenStackProps } from "react-native-screens";


export function SignUp({}:ScreenStackProps<>){
    const [userPhoto, setUserPhoto] = useState < string | undefined>(undefined)
    
    
    async function handlePickUserPhoto(){
        const imageResponse = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: true, 
            aspect: [4, 4], 
            quality: 1
        })

        if(imageResponse.canceled) return;

        if(imageResponse.assets[0]){
            setUserPhoto(imageResponse.assets[0].uri)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <VStack 
                    width={'100%'} 
                    backgroundColor={'gray.300'} 
                    flexGrow={1}  
                    paddingX={12}
                >
                    <VStack marginTop={8} alignItems={'center'}>
                        <Logo   width={60} height={40}/>
                        <Heading marginTop={3}>Boas vindas!</Heading>
                        <Text>
                            Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
                        </Text>

                    </VStack>

                    <Center marginTop={8}>
                        <Avatar.Root>
                            {!userPhoto 
                                ? <Avatar.Avatar source={{ uri: userPhoto }} />
                                : <Avatar.AvatarSkeleton/>
                            }
                         
                            <Avatar.Button 
                                onPress={handlePickUserPhoto}
                                icon={<PencilSimpleLine size={20} />}
                            />
                        </Avatar.Root>

                    </Center>

                    <VStack marginTop={6}>
                        <TextInput.Root>
                            <TextInput.Input
                             
                                placeholder="Nome"
                            />
                        </TextInput.Root >

                        <TextInput.Root marginTop={4}>
                            <TextInput.Input/>
                        </TextInput.Root>

                        <TextInput.Root marginTop={4}>
                            <TextInput.Input />
                        </TextInput.Root>

                        <TextInput.Root marginTop={4}>
                            <TextInput.PasswordInput/>
                        </TextInput.Root>

                        <Button marginTop={6}>Criar</Button>
                    </VStack>

                    <Box flexGrow={1} marginTop={6}>
                        <VStack  alignItems={'center'} marginTop={'auto'} marginBottom={20}>
                            <Text>Já tem uma conta?</Text>
                            <Button marginTop={2} variant="secundary">Ir para o login</Button>
                        </VStack>
                    </Box>
                </VStack>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}
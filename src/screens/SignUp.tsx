import { useState } from "react";
import uuid from 'react-native-uuid';
import { useForm } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker';
import { zodResolver } from '@hookform/resolvers/zod'
import {PencilSimpleLine} from 'phosphor-react-native'
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, VStack,Box, Center, useToast } from 'native-base'

import Logo from '@assets/logo.svg'

import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { Avatar } from "@components/Avatar";
import { Heading } from "@components/Heading";
import { TextInput } from "@components/TextInput";

import { AuthRoutesParamList } from "@routes/authRoutes";
import { z } from "zod";
import { PasswordRegex } from "@utils/regex";
import { api } from "@libs/axios";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";

const { Regex: passWordRegex, passwordErrorMessage } = PasswordRegex

const newUserSchema = z.object({
    name: z.string({ required_error: 'Informe o Nome' }).min(3, 'O nome Tem que possuir mais de 2 letras'),
    email: z.string({ required_error: 'Informe o seu email'}).email('Informe um email válido').toLowerCase().trim(),
    phone: z.string({required_error: 'Informe o seu Número de Telefone'}).min(11, 'O telefone deve conter 11 digitos'),
    password: z.string({required_error: 'Informe uma Nova Senha'}).regex(passWordRegex, passwordErrorMessage).transform(data => data.trim()),
    confirmPassword: z.string().optional().transform(data => data && data.trim())

}).superRefine((schemaData, context) => {
    if (schemaData.password !== schemaData.confirmPassword) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["confirmPassword"],
            message: "As senhas não coincidem",
        })
    }
})

type NewUserFormData = z.infer<typeof newUserSchema>

interface UserPhotoProps {
    name:   string,
    uri:    string,
    type:   string,
}

export function SignUp({navigation }: NativeStackScreenProps<AuthRoutesParamList,'SignUp'>){
    const [userPhoto, setUserPhoto] = useState<UserPhotoProps | undefined>(undefined)
    const {signIn} = useAuth()
    const { handleSubmit, formState, control } = useForm<NewUserFormData>({
        resolver: zodResolver(newUserSchema)
    })
    const Toast = useToast()
    const { errors, isSubmitting } = formState

    async function handleCreateNewUser(formData: NewUserFormData) {
       if(!userPhoto){
            return Toast.show({
                title: 'Selecione uma foto de perfil',
                placement: 'top',
                backgroundColor: 'red.500',
            })
       }
       try {
           const newUserForm = new FormData()
          
           newUserForm.append('name', formData.name)
           newUserForm.append('email', formData.email)
           newUserForm.append('tel', formData.phone)
           newUserForm.append('password', formData.password)
           newUserForm.append('avatar', userPhoto as any)

           await api.post('/users', newUserForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
           })

          await signIn(formData.email, formData.password)
        
       } catch (error) {
          const isAppError = error instanceof AppError


           Toast.show({
               title: isAppError ? error.message : 'Ocorreu um erro ao criar o usuário',
               placement: 'top',
               backgroundColor: 'red.500',
           })

       }

    }

    function handleNavigateToSignInScreen() {
        navigation.navigate('SignIn')
    }

    async function handlePickUserPhoto(){
        const imageResponse = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: true, 
            aspect: [4, 4], 
            quality: 1
        })

        if(imageResponse.canceled) return;

        if(imageResponse.assets[0]){
            const  fileExtension = imageResponse.assets[0].uri.split('.').pop()
            const photoFileName = `${uuid.v4()}.${fileExtension}`.toLowerCase()

            const file: UserPhotoProps   = {
                name: photoFileName,
                uri: imageResponse.assets[0].uri,
                type: `${imageResponse.assets[0].type}/${fileExtension}`
            }

            setUserPhoto(file)
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
                            {userPhoto 
                                ? <Avatar.Avatar source={{ uri: userPhoto.uri }} />
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
                            <TextInput.InputControlled
                                name="name"
                                control={control}
                                placeholder="Nome"
                            />
                            {errors.name && <TextInput.Error>{errors.name.message}</TextInput.Error>}
                        </TextInput.Root >

                        <TextInput.Root marginTop={4}>
                            <TextInput.InputControlled
                                name="email"
                                control={control}
                                placeholder="Email"
                            />
                            {errors.email && <TextInput.Error>{errors.email.message}</TextInput.Error>}
                        </TextInput.Root>

                        <TextInput.Root marginTop={4}>
                            <TextInput.InputControlled
                                name="phone"
                                control={control}
                                keyboardType="phone-pad" 
                                placeholder="Telefone" 
                                
                            />
                            {errors.phone && <TextInput.Error>{errors.phone.message}</TextInput.Error>}
                        </TextInput.Root>

                        <TextInput.Root marginTop={4}>
                            <TextInput.PasswordInputControlled
                                name="password"
                                control={control}
                                placeholder="Senha"
                            />
                            {errors.password && <TextInput.Error>{errors.password.message}</TextInput.Error>}
                        </TextInput.Root>

                        <TextInput.Root marginTop={4}>
                            <TextInput.PasswordInputControlled
                                name="confirmPassword"
                                control={control}
                                onSubmitEditing={handleSubmit(handleCreateNewUser)}
                                placeholder="Confirme a Senha"
                            />
                            {errors.confirmPassword && <TextInput.Error>{errors.confirmPassword.message}</TextInput.Error>}
                        </TextInput.Root>

                        <Button 
                            isLoading={isSubmitting}
                            onPress={handleSubmit(handleCreateNewUser)}
                            marginTop={6}
                        >
                            Criar
                        </Button>
                    </VStack>

                    <Box flexGrow={1} marginTop={6}>
                        <VStack  alignItems={'center'} marginTop={'auto'} marginBottom={20}>
                            <Text>Já tem uma conta?</Text>
                            <Button 
                                marginTop={2} 
                                onPress={handleNavigateToSignInScreen}
                                variant="secundary"
                            >
                                Ir para o login
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}
import { useForm } from 'react-hook-form'
import {zodResolver}  from '@hookform/resolvers/zod'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { VStack, Image, Box, Center, ScrollView, useToast  } from 'native-base'
import { NativeStackScreenProps } from "@react-navigation/native-stack";


import LogoWithMetaData from '@assets/LogoWithMetaData.png'

import { Text } from '@components/Text'
import { TextInput } from '@components/TextInput'
import { Button } from '@components/Button'
import { AuthRoutesParamList } from '@routes/authRoutes'
import { z } from 'zod';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';

const SignInForm = z.object({
    email: z.string({required_error: 'Digite o seu email'}).email('Digite um email válido'),
    password: z.string({required_error: 'Digite sua senha'}),
})


type SignInFormData = z.infer<typeof SignInForm>

export function SignIn({ navigation }: NativeStackScreenProps<AuthRoutesParamList, 'SignIn'>){
    const Toast = useToast()
    const {signIn} = useAuth()
    function handleNavigateToSignUpScreen(){
        navigation.navigate('SignUp')
    }
    const {formState, control, handleSubmit} = useForm<SignInFormData>({
        resolver: zodResolver(SignInForm)
    })
    const {errors , isSubmitting} = formState

    async function handleSignIn(formdata: SignInFormData){
        const {email,password} = formdata
        try { 
            await signIn(email,password)
        } catch (error) {
            const isAppError = error instanceof AppError


            Toast.show({
                title: isAppError ? error.message : 'Ocorreu um erro ao criar o usuário',
                placement: 'top',
                backgroundColor: 'red.500',
            })
        }
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <VStack
                    flex={1}
                    backgroundColor={'gray.100'}
                >
                    <VStack
                        alignItems={'center'}
                        width={'full'}
                        paddingY={65}
                        
                    
                        borderBottomRadius={24}
                    
                        backgroundColor={'gray.300'}
                
                    >
                        <Image
                            alt=' '
                            source={LogoWithMetaData} 
                        />
                    
                        <Center 
                            width={'full'}
                            paddingX={12}
                            marginTop={75}
                        >
                            <Text>Acesse sua conta</Text>
                            <TextInput.Root marginTop={4}>
                                <TextInput.InputControlled
                                    control={control}
                                    name='email' 
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    placeholder='Email'
                                />
                                {errors.email && (
                                    <TextInput.Error>{errors.email.message}</TextInput.Error>
                                )}
                                
                            </TextInput.Root>

                            <TextInput.Root marginTop={4}>
                                <TextInput.PasswordInputControlled
                                    name='password'
                                    control={control}
                                    returnKeyType={'send'}
                                    onSubmitEditing={handleSubmit(handleSignIn)}
                                    placeholder='Digite Sua Senha'
                                />
                                {errors.password && (
                                    <TextInput.Error>{errors.password.message}</TextInput.Error>
                                )}
                            </TextInput.Root>

                            <Button
                                isLoading={isSubmitting}
                                onPress={handleSubmit(handleSignIn)}
                                marginTop={4} 
                                variant='tertiary'
                                >Entrar 
                            </Button>

                        </Center>

                    </VStack>   
                    <Box  flex={1} marginTop={4}>
                        <VStack 
                            alignItems={'center'} 
                            paddingX={12} 
                            marginTop={'auto'} 
                            marginBottom={20}
                        >
                            <Text>Ainda não tem acesso?</Text>

                            <Button 
                                onPress={handleNavigateToSignUpScreen}
                                marginTop={4} 
                                variant='primary'
                            >
                                Criar uma conta
                            </Button>
                        </VStack> 

                    </Box>
                    
                </VStack>

            </ScrollView>

        </TouchableWithoutFeedback>
    )
}
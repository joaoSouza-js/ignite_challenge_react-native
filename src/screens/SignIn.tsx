import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { VStack, Image, Box, Center, ScrollView  } from 'native-base'
import { NativeStackScreenProps } from "@react-navigation/native-stack";


import LogoWithMetaData from '@assets/LogoWithMetaData.png'

import { Text } from '@components/Text'
import { TextInput } from '@components/TextInput'
import { Button } from '@components/Button'
import { AuthRoutesParamList } from '@routes/authRoutes'


export function SignIn({ navigation }: NativeStackScreenProps<AuthRoutesParamList, 'SignIn'>){
    function handleNavigateToSignUpScreen(){
        navigation.navigate('SignUp')
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
                                <TextInput.Input 
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    placeholder='Email'
                                />
                                
                            </TextInput.Root>

                            <TextInput.Root marginTop={4}>
                                <TextInput.PasswordInput
                                    returnKeyType={'send'}
                                    placeholder='Digite Sua Senha'
                                />
                            </TextInput.Root>

                            <Button marginTop={4} variant='tertiary'>Entrar </Button>

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
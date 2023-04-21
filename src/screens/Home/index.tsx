import {VStack,HStack, Icon, useTheme,Button as NativeBaseButton, IconButton, Box, FlatList} from 'native-base'
import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

import { Avatar } from '@components/Avatar'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { ArrowRight, Faders, MagnifyingGlass, Plus, Tag } from 'phosphor-react-native'
import { Heading } from '@components/Heading'
import { TextInput } from '@components/TextInput'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Card } from '@components/Card'
import { FilterModal } from './components/FilterModal';

export function Home(){
    const {colors} = useTheme()
    const bottomSheetRef = useRef<BottomSheet>(null);

    

    
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    function handleOpenFilterModal(){
        bottomSheetRef.current?.expand()
    }
    function handleCloseFilterModal(){ 
        bottomSheetRef.current?.close()
    }

    function handleClosedKeyboard(){
        Keyboard.dismiss()
       
    }

    return (
        <TouchableWithoutFeedback onPress={handleClosedKeyboard}>
            <VStack paddingX={6} flex={1}>
                <HStack alignItems={'center'} marginTop={9} width={'full'} >
                    <Avatar.Avatar borderWidth={2} size={11}/>

                    <VStack flex={1} marginLeft={3} >
                        <Text fontSize={'md'}>Boas vindas,</Text>
                        <Text fontSize={'md'} fontFamily={'heading'}>Maria</Text>
                    </VStack>

                    <Button
                        width={145}
                        leftIcon={<Plus size={20} color={colors.white}/>}
                        variant='primary' 
                    >
                        Criar anúncio
                    </Button>
                </HStack>

                <VStack marginTop={8}>
                    <Text color={'gray.700'}>Seus produtos anunciados para venda </Text>
                    <HStack 
                        backgroundColor={'#647AC71A'}
                        alignItems={'center'} marginTop={3}
                        paddingY={3}
                        borderRadius={'lg'}
                        paddingRight={4}
                        paddingLeft={5}
                    >
                        <Tag size={20} color={colors.blue[400]} />
                        <VStack marginLeft={4} flex={1}>
                            <Heading>4</Heading>
                            <Text>anúncios ativos</Text> 
                        </VStack>
                        <NativeBaseButton 
                            rightIcon={<ArrowRight size={20} color={colors.blue[400]} />}
                            backgroundColor={'transparent'}
                            _text={{
                                color: 'blue.400',
                                fontFamily: 'heading'
                                
                            }}
                            
                        >
                            meus anuncions
                        </NativeBaseButton>
                    </HStack>
                
                </VStack>

                <VStack marginTop={8}>
                    <Text color={'gray.700'}>Compre produtos variados </Text>
                    <HStack marginTop={3} overflow={'hidden'} rounded={'md'} paddingLeft={'px'} backgroundColor={'gray.100'}>
                        <TextInput.Input 
                            flex={1}
                           
                            _focus={{
                                borderWidth: 0,
                                borderLeftWidth: '2',
                                borderColor: 'gray.500'
                            
                            }}
                        />
                        <HStack alignItems={'center'}>
                            <IconButton 
                                width={52}
                             
                                _pressed={{
                                    backgroundColor:'gray.300'
                                }}
                            >
                                <MagnifyingGlass color={colors.gray[800]}  />
                            </IconButton>
                            <Box 
                                height={'60%'} 
                                width={'px'}

                                backgroundColor={'gray.600'}
                            />
                            <IconButton
                                onPress={handleOpenFilterModal}
                                width={'12'}
                                _pressed={{
                                    backgroundColor: 'gray.300'
                                }}
                            >
                                <Faders color={colors.gray[800]} />
                            </IconButton>

                        </HStack>
                    </HStack>
                </VStack>

                <FlatList
                    marginTop={'6'}
                    contentContainerStyle={{
                       paddingBottom: 80
                    }}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]}
                    keyExtractor={key => key}
                
                    renderItem={() => (
                        <Card isUsed name='Tênis vermelho' price='200'/>

                    )}
                />
                <FilterModal
                    
                    ref={bottomSheetRef}
                    onCloseModal={handleCloseFilterModal}
                /> 

            </VStack>

        </TouchableWithoutFeedback>
    )
}
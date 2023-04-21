
import BottomSheet from '@gorhom/bottom-sheet';
import { X, XCircle } from "phosphor-react-native";
import { forwardRef, useMemo, useState } from "react";
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { HStack, IconButton, Switch, VStack, useTheme } from "native-base";

import { Text } from "@components/Text";
import { CheckBox } from "@components/CheckBox";
import { Button } from "@components/Button";
import { Heading } from "@components/Heading";

interface FilterModalProps {
    onCloseModal: () => void;
}

export const FilterModal = forwardRef<BottomSheetMethods,  FilterModalProps>(({ onCloseModal }, ref) => {
    const snapPoints = useMemo(() => [1, '100%'], []);
    const {colors} = useTheme()
    const [isUsed,setIsUsed] = useState(false)

    function handleCloseModal(){
        onCloseModal()
    }
    return (
            <BottomSheet
                handleIndicatorStyle={{
                    width: 56,
                    backgroundColor: colors.gray[600],
                    marginTop: 12
                }}
                ref={ref as React.RefObject<BottomSheetMethods>}
                snapPoints={snapPoints}
                style={{ paddingHorizontal: 24, paddingBottom: 32}}

            >  
                <HStack 
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                   <Heading>Filtrar anúncios</Heading>
                    <IconButton  _pressed={{backgroundColor: 'gray.200'}} onPress={handleCloseModal}>
                        <X/>
                    </IconButton>

                </HStack>
            <VStack marginTop={'6'}>
                <Heading color={'gray.800'} fontSize={'sm'}>Condição</Heading>
                <HStack marginTop={3}>
                    <Button 
                        variant="tertiary" 
                        paddingX={1} 
                        width={"18"}
                        fontSize={'xs'} 
                        _text={{
                            fontSize: 'xs',
                            fontFamily: 'heading'
                        }}
                        rounded={'full'}
                        rightIcon={!isUsed ? <XCircle size={16} weight="fill" color="white" /> : undefined}
                        onPress={() => setIsUsed(false)}
                    >
                        Novo
                    </Button>
                    <Button
                        marginLeft={'2'}
                        variant="secundary"
                        paddingX={1}
                        width={"18"}
                        fontSize={'xs'}
                        _text={{
                            fontSize: 'xs',
                            fontFamily: 'heading'
                        }}
                        onPress={() => setIsUsed(true)}
                        rounded={'full'}
                        rightIcon={isUsed ? <XCircle size={16} weight="fill" color="white" /> : undefined}
                    >
                        Usado
                    </Button>
                </HStack>
            </VStack>
            <VStack alignItems={'flex-start'} marginTop={6}>
                <Text>Aceita troca?</Text>
                <Switch onTrackColor={'blue.400'}  onChange={() => {}}/>
            </VStack>
            <VStack marginTop={6}>
                <Heading color={'gray.800'} fontSize={'sm'}>Meios de pagamento aceitos</Heading>
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
            <HStack justifyContent={'space-between'}  marginTop={"32"}>
                    <Button width={'45%'} variant="secundary">
                        Resetar filtros
                    </Button>

                    <Button width={'45%'} >Aplicar filtros</Button>
            </HStack>
        </BottomSheet>
      
    );
});
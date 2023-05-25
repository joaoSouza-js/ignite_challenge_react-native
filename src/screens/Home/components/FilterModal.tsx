import { z } from 'zod';
import { forwardRef, useMemo, useState } from "react";
import BottomSheet from '@gorhom/bottom-sheet';
import { X, XCircle } from "phosphor-react-native";
import { zodResolver } from '@hookform/resolvers/zod';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { HStack, IconButton, VStack, useTheme } from "native-base";

import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { Heading } from "@components/Heading";
import { paymentsForm } from '@utils/paymets';
import { CheckBox } from "@components/CheckBox";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { api } from '@libs/axios';
import { queryClient } from '@libs/reactQuery';
import { SwitchInput } from '@components/Switch';

interface FilterModalProps {
    onCloseModal: () => void;
}

const FilterSchema = z.object({
    acceptTrade: z.boolean(),
    isNew: z.boolean(),
    paymentMethods: z.array(z.object({
        name: z.string(),
        label: z.string(),
        isChecked: z.boolean(),
    })).refine((paymentMethods) => paymentMethods.some(payment => payment.isChecked), {
        message: 'Selecione pelo menos uma forma de pagamento',
    }).transform((paymentMethods) => paymentMethods.filter(payment => payment.isChecked))
        .transform((paymentMethods) => paymentMethods.map(payment => payment.name))
    ,
})

type FilterSchemaData = z.input <typeof FilterSchema>
type FilterSchemaOutput = z.output <typeof FilterSchema>


export const FilterModal = forwardRef<BottomSheetMethods,  FilterModalProps>(({ onCloseModal }, ref) => {
    const snapPoints = useMemo(() => [1, '100%'], []);
    const {colors} = useTheme()


    const { formState, control, handleSubmit, reset} = useForm<FilterSchemaData>({
        resolver: zodResolver(FilterSchema),
        defaultValues: {
            acceptTrade: true,
            isNew: true,
            paymentMethods: paymentsForm.map(payment => {
                return {
                    name: payment.name,
                    label: payment.label,
                    isChecked: false,
                }
            })
        }
    })
    const { errors, isSubmitting } = formState

    const { fields: paymentMethods } = useFieldArray({
        control, name: 'paymentMethods'
    })

    function handleCloseModal() {
        onCloseModal()
    }
    
    async function handleResetFilter(){
        const response = await api.get('products/')
        queryClient.setQueryData(['products'], response.data)
        reset()
        handleCloseModal()
    }


    async function handleApplyFilter(data: any){
        const formData = data as FilterSchemaOutput
        const { acceptTrade, isNew, paymentMethods} = formData
        const response = await api
            .get(`products/?accept_trade=${acceptTrade}&is_new=${isNew}${paymentMethods.map(payment => `&payment_methods=${payment}`)}`)
        queryClient.setQueryData(['products'], response.data)
        handleCloseModal()
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
                    <Controller
                        control={control}
                        name='isNew'
                        render={({ field: { onChange, onBlur, value:isNew } }) => (
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
                                    rightIcon={isNew ? <XCircle size={16} weight="fill" color="white" /> : undefined}
                                    onPress={() => onChange(true)}
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
                                    onPress={() => onChange(false)}
                                    rounded={'full'}
                                    
                                    rightIcon={!isNew ? <XCircle size={16} weight="fill" color="white" /> : undefined}
                                >
                                    Usado
                                </Button>
                            </HStack>
                            
                        )}
                    />
            </VStack>
            <VStack alignItems={'flex-start'} marginTop={6}>
                <Text>Aceita troca?</Text>
                <SwitchInput.SwitchControlled name='acceptTrade' control={control} />
            </VStack>
            <VStack marginTop={6}>
                <Heading color={'gray.800'} fontSize={'sm'}>Meios de pagamento aceitos</Heading>
                {
                    paymentMethods.map((paymentMethod, index) => (
                        <Controller
                            control={control}
                            key={index}
                            name={`paymentMethods.${index}.isChecked`}
                            render={({ field: { onChange, value } }) => (
                                <CheckBox

                                    onChange={isCheckd => onChange(isCheckd)}
                                    isChecked={value}
                                    id={index.toString()}
                                    label={paymentMethod.label}
                                    value={paymentMethod.name}
                                />

                            )}
                        />

                    ))
                }
                {
                    errors.paymentMethods && (
                        <Text
                            marginTop={2}
                            color={'red.400'}
                            fontSize={'xs'}
                        >{errors.paymentMethods.message}</Text>
                    )
                }
                    
            </VStack>
            <HStack justifyContent={'space-between'}  marginTop={"32"}>
                    <Button 
                        width={'45%'} 
                        onPress={handleResetFilter}
                        variant="secundary"

                    >
                        Resetar filtros
                    </Button>

                    <Button 
                        isLoading={isSubmitting}
                        onPress={handleSubmit(handleApplyFilter)}
                        width={'45%'} 
                    >
                            Aplicar filtros
                    </Button>
            </HStack>
        </BottomSheet>
      
    );
});
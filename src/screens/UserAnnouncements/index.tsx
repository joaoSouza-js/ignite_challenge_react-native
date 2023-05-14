import { useCallback } from "react";
import { Plus } from "phosphor-react-native";
import { useQuery } from "@tanstack/react-query";
import { FlatList, HStack, IconButton, VStack } from "native-base";
import {useFocusEffect, useNavigation} from '@react-navigation/native'

import { Text } from "@components/Text";
import { Card } from "@components/Card";
import { Heading } from "@components/Heading";

import { AppNavigatorRoutesProps } from "@routes/app";
import { imageBaseUrl } from "@utils/ImageBaseUrl";

import { api } from "@libs/axios";
import { queryClient } from "@libs/reactQuery";

import { ProductProps } from "src/DTO/productDTO";

export function UserAnnouncements(){
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    
    function handleNavigateToCreateAnnouncementScreen() {
        navigation.navigate('CreateAnnouncement')
    }
    function handleNavigateToUserAnnoucementDetails(productId: string) {
        navigation.navigate('UserAnnouncementDetails',{productId})
    }

    const { data: userProducts = [] } = useQuery<ProductProps[]>(['userProducts'], async () => {
        const response = await api.get<ProductProps[]>('/users/products')
        return response.data
    })

    async function refetchUserProductAnnoucements() {
        const response = await api.get<ProductProps[] > ('/users/products')
        queryClient.setQueryData(['userProducts'], response.data)
    }
    useFocusEffect(useCallback(() => {
        refetchUserProductAnnoucements()
    }, []))




    return (
        <VStack paddingX={6} marginTop={6}>
            <HStack>
                <Heading marginLeft={6} backgroundColor={'blue.200'}  textAlign={'center'} flex={1}>Meus anúncios</Heading>
                <IconButton
                    onPress={handleNavigateToCreateAnnouncementScreen}
                >
                    <Plus size={24}/>
                </IconButton>
            </HStack>

            <HStack>
                <Text>{userProducts.length} anúncios</Text>
            </HStack>


            <FlatList
                marginTop={'6'}
                contentContainerStyle={{
                    paddingBottom: 80
                }}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={userProducts}
                keyExtractor={key => key.id}

                renderItem={({item:userProduct}) => (
                    <Card 
                        isActived={userProduct.is_active}
                        productUrl={`${imageBaseUrl}/${userProduct.product_images[0].path}`}
                        onPress={() => handleNavigateToUserAnnoucementDetails(userProduct.id)} 
                        IsNew = {userProduct.is_new}
                        name={userProduct.name}
                        price={userProduct.price / 100} 
                    />

                )}
            />
        </VStack>
    )
}
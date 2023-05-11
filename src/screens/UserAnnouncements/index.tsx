import { Card } from "@components/Card";
import { Heading } from "@components/Heading";
import { Text } from "@components/Text";
import { FlatList, HStack, IconButton, VStack } from "native-base";
import { Plus } from "phosphor-react-native";
import {useNavigation} from '@react-navigation/native'
import { AppNavigatorRoutesProps } from "@routes/app";
import { useQuery } from "@tanstack/react-query";
import { api } from "@libs/axios";
import { ProductsProps } from "src/DTO/productDTO";
import { imageBaseUrl } from "@utils/ImageBaseUrl";
export function UserAnnouncements(){
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    
    function handleNavigateToCreateAnnouncementScreen() {
        navigation.navigate('CreateAnnouncement')
    }
    function handleNavigateToEditAnnouncementScreen() {
        navigation.navigate('EditAnnouncement')
    }

    const { data: userProducts = [] } = useQuery<ProductsProps[]>(['userProduct'], async () => {
        const response = await api.get<ProductsProps[]>('/users/products')
        return response.data
    })




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
                <Text>8 anúncios</Text>
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
                        productUrl={`${imageBaseUrl}/${userProduct.product_images[0].path}`}
                        onPress={handleNavigateToEditAnnouncementScreen} 
                        IsNew = {userProduct.is_new}
                        name={userProduct.name}
                        price={userProduct.price / 100} 
                    />

                )}
            />
        </VStack>
    )
}
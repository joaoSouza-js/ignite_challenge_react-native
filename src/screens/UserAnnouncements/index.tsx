import { Card } from "@components/Card";
import { Heading } from "@components/Heading";
import { Text } from "@components/Text";
import { FlatList, HStack, IconButton, VStack } from "native-base";
import { Plus } from "phosphor-react-native";
import {useNavigation} from '@react-navigation/native'
import { AppNavigatorRoutesProps } from "@routes/app";
export function UserAnnouncements(){
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    
    function handleNavigateToCreateAnnouncementScreen() {
        navigation.navigate('CreateAnnouncement')
    }
    function handleNavigateToEditAnnouncementScreen() {
        navigation.navigate('EditAnnouncement')
    }
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
                data={["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]}
                keyExtractor={key => key}

                renderItem={() => (
                    <Card onPress={handleNavigateToEditAnnouncementScreen} isUsed name='Tênis vermelho' price='200' />

                )}
            />
        </VStack>
    )
}
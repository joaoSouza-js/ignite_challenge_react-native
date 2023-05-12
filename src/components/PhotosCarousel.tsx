import { Center, VStack } from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { PhotosMarkIndicator } from "./photosIndicator";
import { Dimensions, ImageBackground } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Heading } from "./Heading";

interface PhotosCarouselProps  {
    images: string[];
    isActived?: boolean;
}

export function PhotosCarousel({images,isActived=true}: PhotosCarouselProps){

    const screenWidth = Dimensions.get('window').width;

    return (
        <GestureHandlerRootView>
            <Carousel
                loop
                width={screenWidth}
                height={280}
                data={images}
                scrollAnimationDuration={300}
                renderItem={({ item, index }) => (
                    <VStack
                        width={'full'}
                        height={'full'}
                        position={'relative'}
                    >
                        <VStack
                            width={'full'}
                            height={'full'}
                            backgroundColor={!isActived ? 'black' : 'gray.300'}
                            opacity={!isActived ? .6 : 1}
                        >
                            <ImageBackground
                                key={index}
                              
                                resizeMode="stretch"
                                source={{ uri: item }}
                                alt=""
                                style={{
                                    height: '100%',
                                    justifyContent: 'flex-end',
                                    flex: 1
                                }}
                            >
                                <PhotosMarkIndicator length={images.length} current={index} />
                            </ImageBackground>

                        </VStack>
                        {!isActived && (
                            <Center
                                width={'full'}
                                height={'full'}
                                position={'absolute'}
                            >
                                <Heading 
                                    textTransform={'uppercase'} 
                                    fontSize={'sm'} 
                                    color={'gray.100'}
                                >
                                    Anúncio desativado
                                </Heading>

                            </Center>
                        )}
                    </VStack>
    
                )}
            />
        </GestureHandlerRootView>

    )
}
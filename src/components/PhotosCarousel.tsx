import Carousel from "react-native-reanimated-carousel";
import { Dimensions, ImageBackground } from 'react-native';
import { PhotosMarkIndicator } from "./photosIndicator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Center, VStack } from "native-base";
import { Heading } from "./Heading";

interface PhotosCarouselProps  {
    images: string[];
    isDisabled?: boolean;
}

export function PhotosCarousel({images,isDisabled=false}: PhotosCarouselProps){

    const screenWidth = Dimensions.get('screen').width;

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
                            backgroundColor={isDisabled ? 'black' : 'gray.300'}
                            opacity={isDisabled ? .6 : 1}
                        >
                            <ImageBackground
                                key={index}
                              
                                resizeMode="cover"
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
                        {isDisabled && (
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
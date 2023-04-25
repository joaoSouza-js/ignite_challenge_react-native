import { Box, HStack } from "native-base"

interface PhotosMarkIndicatorProps {
    length: number
    current: number
}

export function PhotosMarkIndicator({ current,length}:PhotosMarkIndicatorProps){
    const allPhotosIndicator = Array.from(new Array(length), (_, index) => index)
    
    return (
        <HStack  paddingX={2} width={'100%'} paddingBottom={1}>
            {allPhotosIndicator.map(index => (
                <Box 
                    height={1.5} 
                    key={index}
                    backgroundColor={'white'} 
                    opacity={index <= current ? '1' : '.5'}
                    rounded={'full'}
                    marginRight={2} width={`${(100 - 4) / (allPhotosIndicator.length)}%`} 
                />
            ))}
        </HStack>

    )

}
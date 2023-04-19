
import { forwardRef, useMemo, RefAttributes } from "react";
import BottomSheet, { BottomSheetHandle, BottomSheetProps } from '@gorhom/bottom-sheet';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { HStack } from "native-base";

interface FilterModalProps {
    onCloseModal: () => void;
}

export const FilterModal = forwardRef<BottomSheetMethods,  FilterModalProps>(({ onCloseModal }, ref) => {
    const snapPoints = useMemo(() => [1, '50%'], []);

    return (
            <BottomSheet
                ref={ref as React.RefObject<BottomSheetMethods>}
                snapPoints={snapPoints}
            >
            </BottomSheet>
      
    );
});
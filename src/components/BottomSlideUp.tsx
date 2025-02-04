// Worked on by: Siri Avula
// import React, { useCallback, useEffect, useImperativeHandle } from 'react'
import React from 'react';
import { View } from 'react-native'
// import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// TODO: FIX ANIMATIONS FOR REACTJS
// import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 60 

type BottomSheetProps = {
    children?: React.ReactNode
}
export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void;
    isActive: () => boolean
};

const BottomSlideUp = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(() => {

// const BottomSlideUp = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(({children}, ref) => {
    // const translateY = useSharedValue(0);
    // const active = useSharedValue(false);

    // const scrollTo = useCallback((destination: number) => {
    //     'worklet';
    //     active.value = destination !== 0;
  
    //     translateY.value = withSpring(destination, { damping: 50 });
    // }, []);

    // const isActive = useCallback( () => {
    //     return active.value;
    // }, [])

    // useImperativeHandle(
    //     ref,
    //     () => ({
    //         scrollTo, isActive
    //     }),
    //     [scrollTo, isActive],
    // )
    // const context = useSharedValue({ y: 0 });
    // const gesture = Gesture.Pan()
    // .onStart(() => {
    //     context.value = { y: translateY.value };
    // })
    // .onUpdate((event) => {
    //     translateY.value = event.translationY + context.value.y;
    //     translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y) // you can add 60
    // })
    // .onEnd(() => {
    //     if (translateY.value > -SCREEN_HEIGHT / 2) {
    //       scrollTo(-SCREEN_HEIGHT/16); // change back to 0 
    //     } else if (translateY.value < -SCREEN_HEIGHT / 2) {
    //       scrollTo(MAX_TRANSLATE_Y);
    //     }
    // });

    // useEffect(() => {
    //     translateY.value = withSpring(-SCREEN_HEIGHT/16, {damping: 50});
    //     console.log("screen height: " + SCREEN_HEIGHT);
    // }, [])


    // const rBottomSheetStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [{ translateY: translateY.value }]
    //     };
    // });
      
    return (
        <View></View>
        // <GestureDetector gesture={gesture}>
        //     <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        //         {children}
        //     </Animated.View>
        // </GestureDetector>
        
    )
})

export default BottomSlideUp

// const styles = StyleSheet.create({
//     bottomSheetContainer: {
//         height: SCREEN_HEIGHT,
//         width: '100%',
//         backgroundColor: '#d4cdc7',
//         position: 'absolute',
//         top: SCREEN_HEIGHT,
//         borderRadius: 25,
//     },
//     line: {
//         width: 75,
//         height: 4,
//         backgroundColor: 'grey',
//         alignSelf: 'center',
//         marginVertical: 15,
//         borderRadius: 2,
//       },
// });

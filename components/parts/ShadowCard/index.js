import React from 'react'
import {View, StyleSheet, Dimensions, Platform} from 'react-native';

const ShadowCard = props => {

    return (
        // This style is set up so it uses its on styles and accepts incoming style props 
        // This is set up this way so that if there is a style conflict with the incoming style overides it 
        // The Platform.select gets the type of platform you are on and applies specific styles
        <View style={
            {...styles.shadowContainer, 
            ...Platform.select({
                ios: styles.ios,
                android: styles.android
            }) , 
            ...props.style}
        }>
            {props.children}
        </View>
    )
};

const styles = StyleSheet.create({
    shadowContainer: {
        padding: Dimensions.get("window").height > 600 ? 20 : 10,
        borderRadius: 10
    },
    // To give shadow on android
    ios: {
        shadowColor: "black",
        shadowOffset: {width:0, height:2},
        shadowOpacity: .65,
        shadowRadius: 6
    },
    // To give a shadow on ios
    android: {
        elevation: 5
    }
});

export default ShadowCard;
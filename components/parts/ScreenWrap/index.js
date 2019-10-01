import React from 'react'
import {View, Dimensions, StyleSheet} from 'react-native';

const ScreenWrap = props => {

    

    return(
        // This style is set up so it uses its on styles and accepts incoming style props 
        // This is set up this way so that if there is a style conflict with the incoming style overrides it 
        <View style={{...styles.content, ...props.style}}>
            {props.children}
        </View>
    )
 
};

const styles = StyleSheet.create({
    content: {
        padding: Dimensions.get("window").width > 300 ? 10 : 2,
        alignItems: "center",
        flex: 1
    }
});

export default ScreenWrap;
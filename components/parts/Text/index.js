import React from 'react'
import {Text, StyleSheet} from 'react-native'

export const Bold = props => {
    return <Text style={{...styles.bold, ...props.style}}>{props.children}</Text>
}

export const Norm = props => {
    return <Text style={{...styles.norm, ...props.style}}>{props.children}</Text>

}

const styles = StyleSheet.create({
    bold: {
        fontFamily: "OpenSans-Bold"
    },
    norm: {
        fontFamily: "OpenSans-Regular"
    }
});
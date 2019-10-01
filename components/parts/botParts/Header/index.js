import React from 'react';
import {View, TouchableHighlight, StyleSheet, Keyboard} from 'react-native';
import {Bold} from '../../Text';
import appConfig from "../../../../config";

const Header = props => {
    return (
        <View style={styles.container}>

            <View style={styles.subCont1}>
                <TouchableHighlight
                    onPress={() => { Keyboard.dismiss() }}
                    underlayColor='#000000'
                >
                    <View style={styles.padder}>

                    </View>

                </TouchableHighlight>
            </View>

            <View style={styles.headView}>
                <Bold style={styles.headText}>{props.title}</Bold>
            </View>

            <View style={styles.lastView}>

                <TouchableHighlight
                    onPress={() => {Keyboard.dismiss()}}
                    underlayColor='#000000'
                    style={{flex: 0.1}}
                >
                    <View style={styles.padder}>

                    </View>

                </TouchableHighlight>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: "space-between",
        backgroundColor: appConfig.theme.header.bgColor
    },
    subCont1: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    padder: {
        padding: 20
    },
    headView: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headText: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: appConfig.theme.header.textColor,
        fontSize: 20
    },
    lastView: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Header;
import React from 'react'
import { View, StyleSheet, Dimensions} from 'react-native'
import {Norm} from '../../Text';
import appConfig from '../../../../config';

const BotMessage = props => {
    return (
        <View style={styles.botMessage}>
            <View style={styles.botMessageBubble}>
                <Norm style={props.messageStyle}>{props.message}</Norm>
                <Norm style={props.dateStyle}>{props.datetime}</Norm>
            </View>
        </View>
    );
};

const chatWidth = Dimensions.get('window').width * 0.7;
const styles = StyleSheet.create({
    botMessageBubble: {
        width: chatWidth,
        padding: 15,
        backgroundColor: appConfig.theme.message.botMsgBgColor,
        borderRadius: 12
    },
    botMessageText: {
        color: appConfig.theme.message.botMsgTextColor
    },
    datetimeText: {
        fontSize: 11,
        color: appConfig.theme.message.dateTextColor,
        opacity: 0.8,
        textAlign: 'right',
        paddingTop: 5
    }
})

export default BotMessage
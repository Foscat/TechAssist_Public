import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Norm} from '../../Text';
import appConfig from '../../../../config';

const UserMessage = props => {
    return (
        <View style={styles.userMessage}>
            <View style={styles.userMessageBubble}>
                <Norm style={styles.userMessageText}>{props.message}</Norm>
                <Norm style={styles.datetimeText}>{props.datetime}</Norm>
            </View>
        </View>
    );
};

const chatWidth = Dimensions.get('window').width * 0.7;
const styles = StyleSheet.create({
    userMessage: {
        flex: 1,
        alignItems: 'flex-end',
        paddingBottom: 8
    },
    userMessageBubble: {
        width: chatWidth,
        padding: 15,
        backgroundColor: appConfig.theme.message.userMsgBgColor,
        borderRadius: 12,
    },
    userMessageText: {
        color: appConfig.theme.message.userMsgTextColor
    },
    datetimeText: {
        fontSize: 11,
        color: appConfig.theme.message.dateTextColor,
        opacity: 0.8,
        textAlign: 'right',
        paddingTop: 5
    }
})

export default UserMessage;
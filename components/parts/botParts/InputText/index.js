import React from 'react'
import {StyleSheet, TextInput} from 'react-native'

const InputText = props => {
    return(
        <TextInput
            style={styles.chatInput}
            placeholder={'Say something..'}
            blurOnSubmit={false}
            onChangeText={props.onChangeText}
            value={props.value}
            onSubmitEditing={props.submitText}
        />
    )
};

const styles = StyleSheet.create({
    chatInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10
    }
})

export default InputText;
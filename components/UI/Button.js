import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, text, selected }) => {
    const { buttonStyle, textStyle, selectedButtonStyle, selectedTextStyle } = styles

    return (
        <TouchableOpacity onPress={onPress} style={selected ? selectedButtonStyle : buttonStyle}>
            <Text style={selected ? selectedTextStyle : textStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    },
    selectedButtonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#007aff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
        width: '100%',
    },
    selectedTextStyle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
}

export {Button};
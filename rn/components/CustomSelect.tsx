import { transformStyles } from '@utils/index';
import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native';

interface RadioButtonProps {
    label: string;
    value: string;
    selected: boolean;
    onPress: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, selected, onPress }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={() => onPress(value)}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.circle, selected && styles.selectedCircle]} />
    </TouchableOpacity>
);

interface RadioGroupProps {
    options: { label: string; value: string }[];
    value: string | null;
    onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange }) => (
    <View>
        {options.map((option) => (
            <RadioButton
                key={option.value}
                label={option.label}
                value={option.value}
                selected={value === option.value}
                onPress={onChange}
            />
        ))}
    </View>
);

interface CustomSelectProps {
    title: string;
    selectOptions: { label: string; value: string }[];
    value: string | null;
    onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
    return (
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{props.title}</Text>
            <RadioGroup
                options={props.selectOptions}
                value={props.value}
                onChange={props.onChange}
            />
        </View>
    );
};

const styles = transformStyles({
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 340,
        flexDirection: 'column',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%'
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    selectedCircle: {
        backgroundColor: '#555',
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});

export default CustomSelect;

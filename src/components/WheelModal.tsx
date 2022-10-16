/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';


import { Button, Text, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { wheel } from './HomePage';

interface props {
    isVisible: boolean
    setVisible: Function
    selectedFilter: number
    setSelectedFilter: Function
    data: never[]
}


export const WheelModal = ({ isVisible, setVisible, selectedFilter, setSelectedFilter, data }: props) => {

    const styles = StyleSheet.create({
        wheelModal: {
            backgroundColor: 'white',
            margin: 0,
            marginTop: 300,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            padding: 24,
        },
        buttonTextStyle: {
            color: '#fff',
            fontWeight: 'bold',
        },

        checkboxStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingVertical: 12
            , borderRadius: 12,
            elevation: 1,
            marginVertical: 10,
            paddingHorizontal: 16,
        },
        inputContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingVertical: 12,
            borderRadius: 12,
            elevation: 1,
            marginVertical: 10,
            paddingHorizontal: 16,
        },
    });

    return (
        <>
            <TouchableOpacity onPress={() => setVisible(!isVisible)}>

                <View style={styles.inputContainer}>
                    <Text>{selectedFilter === -1 ? 'საჭე' : data.filter((d: wheel) => d.wheel_type_id === selectedFilter).map((d: wheel) => d.title)}</Text>
                    <Icon name="chevron-down" size={16} />
                </View>
            </TouchableOpacity>
            <Modal isVisible={isVisible} onBackdropPress={() => setVisible(false)} onSwipeComplete={() => setVisible(false)} style={styles.wheelModal} >
                <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ textAlign: 'center' }}>საჭე</Text>
                        {data.map((val: wheel, key) => <TouchableOpacity key={key} onPress={() => { setSelectedFilter(selectedFilter === val.wheel_type_id ? -1 : val.wheel_type_id); }}>
                            <View style={styles.checkboxStyle}>
                                <Checkbox color="#fd4100" status={val.wheel_type_id === selectedFilter ? 'checked' : 'unchecked'} />
                                <Text>{val.title}</Text>

                            </View>
                        </TouchableOpacity>)}
                    </View>
                    <Button onPress={() => setVisible(false)} style={{ backgroundColor: '#fd4100', borderRadius: 15, padding: 4.5 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', }}>არჩევა</Text>
                    </Button>

                </ScrollView>
            </Modal>
        </>
    );
};



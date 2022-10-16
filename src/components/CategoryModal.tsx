/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Keyboard,
} from 'react-native';


import { Button, Text, Searchbar, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { category } from './HomePage';

interface props {
    keyboardHeight: number,
    isVisible: boolean,
    isLoading: boolean,
    setVisible: Function
    selectedFilters: Array<number>
    setSelectedFilters: Function,
    onChangeText: ((text: string) => void) & ((query: string) => void)
    inputText: string
    data: never[]
}

export const CategoryModal = ({ data, isVisible, keyboardHeight, selectedFilters, setSelectedFilters, setVisible, isLoading, inputText, onChangeText }: props) => {

    const styles = StyleSheet.create({
        input: {
            borderWidth: 1,
            borderRadius: 8,
            width: '50%',
            marginBottom: 8,
            marginTop: 8,
        },
        buttonTextStyle: {
            color: '#fff',
            fontWeight: 'bold',
        },
        fetchButton: {
            width: '30%',
            marginVertical: 8,
            borderWidth: 2,
            borderRadius: 42,
            backgroundColor: 'green',
            padding: 10,
            borderColor: 'gray',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        },
        catModal: {
            backgroundColor: 'white',
            margin: 0,
            marginTop: 40,
            borderTopStartRadius: 16,
            borderTopEndRadius: 16,
            padding: 24,
            ...(keyboardHeight === 0 ? {} : { marginTop: keyboardHeight - 250 }
            ),
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
        searchbar: {
            borderRadius: 12,
            elevation: 2,
            marginHorizontal: 2,
            marginVertical: 16,
            paddingHorizontal: 16,
        },
    });


    return (
        <>
            <TouchableOpacity style={{ elevation: 1 }} onPress={() => setVisible(!isVisible)} >
                <View style={styles.inputContainer}>
                    <Text>{selectedFilters.length === 0 ? 'კატეგორია' : data.filter((d: category) => selectedFilters.includes(d.category_id)).map((d: category) => d.title).join(', ')}</Text>
                    <Icon name="chevron-down" size={16} />
                </View>

            </TouchableOpacity>
            <Modal isVisible={isVisible} onBackdropPress={() => setVisible(false)} onSwipeComplete={() => setVisible(false)}
                style={styles.catModal} >
                <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column' }}>
                    <Searchbar style={styles.searchbar} onChangeText={onChangeText} value={inputText} placeholder="მოძებნე" onSubmitEditing={Keyboard.dismiss} />

                    {data != null && !isLoading ? data.filter((d: category) => d.title.includes(inputText)).map((val: category, key) => <TouchableOpacity key={key} onPress={(e) => {
                        if (!selectedFilters.includes(val.category_id)) {
                            setSelectedFilters([
                                ...selectedFilters,
                                val.category_id,
                            ]);
                        } else {
                            setSelectedFilters(
                                selectedFilters.filter((id) => id !== val.category_id),
                            );
                        }

                    }}>
                        <View style={styles.checkboxStyle}>
                            <Checkbox color="#fd4100" status={selectedFilters.includes(val.category_id) ? 'checked' : 'unchecked'} />
                            <Text>{val.title}</Text>
                        </View>
                    </TouchableOpacity>) : <Text />}
                </ScrollView>
                <Button onPress={() => setVisible(false)} style={{ marginTop: 20, backgroundColor: '#fd4100', borderRadius: 15, padding: 4.5 }}>
                    <Text style={styles.buttonTextStyle}>არჩევა</Text>
                </Button>
            </Modal>
        </>
    );
};



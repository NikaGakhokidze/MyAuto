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

interface wheel {
    title: string,
    wheel_type_id: number
}

interface category {
    title: string,
    category_id: number
}

interface manufacturer {
    man_id: number,
    title: string
}

interface item {
    car_id: number,
    price: number,
    man_id: number,
}


export const HomePage = () => {

    const [isLoading, setIsLoading] = React.useState(true);

    const [wheelData, setWheelData] = React.useState([]);
    const [manData, setManData] = React.useState([]);
    const [categoryData, setCategoryData] = React.useState([]);

    useEffect(() => {
        const url = 'https://api2.myauto.ge/ka/vehicle/wheelTypes';

        const categoryUrl = 'https://api2.myauto.ge/ka/vehicle/cats?vehicle_types=0';

        const manUrl = 'https://api2.myauto.ge/ka/vehicle/mans?vehicle_types=0.1.2';

        fetch(url)
            .then((res) => res.json())
            .then((resjson) => setWheelData(resjson))
            .catch((err) => console.warn(err));

        fetch(manUrl)
            .then((res) => res.json())
            .then((resjson) => setManData(resjson))
            .catch((err) => console.warn(err));

        fetch(categoryUrl)
            .then((res) => res.json())
            .then((resjson) => setCategoryData(resjson))
            .catch((err) => console.warn(err))
            .finally(() => setIsLoading(false));
    }, []);



    const [carData, setCarData] = React.useState([]);
    const [isCarDataLoading, setIsCarDataLoading] = React.useState(false);

    const handleClick = async () => {
        setIsCarDataLoading(true);
        let catIds = selectedCategoryId.join('.');
        try {
            const response = await fetch(`https://api2.myauto.ge/ka/products?Cats=${catIds}&WheelTypes=${selectedWheelId === -1 ? 0 : selectedWheelId}&SortOrder=1&Page=1`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();
            setCarData(result.data.items);
        } catch (error) {
            console.log(error);
        } finally {
            setIsCarDataLoading(false);
        }
    };

    const [keyboardStatus, setKeyboardStatus] = React.useState(false);

    const [keyboardHeight, setKeyboardheight] = React.useState(0);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardStatus(true);
            setKeyboardheight(e.endCoordinates.height);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
            setKeyboardheight(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const [isVisible, setVisible] = React.useState(false);
    const [isCatVisible, setIsCatVisible] = React.useState(false);
    const [selectedWheelId, setSelectedWheelId] = React.useState(-1);
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(Array<number>);
    const [text, onChangeText] = React.useState('');

    const styles = StyleSheet.create({
        container: {
            marginTop: 32,
            height: 100,
            backgroundColor: '#fd4100',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
        },
        sectionTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
        },
        sectionDescription: {
            marginTop: 8,
            fontSize: 18,
            fontWeight: '400',
        },
        highlight: {
            fontWeight: '700',
        },
        tinyLogo: {
            height: 400,
            width: 200,
        },
        input: {
            borderWidth: 1,
            borderRadius: 8,
            width: '50%',
            marginBottom: 8,
            marginTop: 8,
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
        wheelModal: {
            backgroundColor: 'white',
            margin: 0,
            marginTop: 300,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            padding: 24,
            ...(keyboardHeight === 0 ? {} : { marginTop: keyboardHeight - 24 }
            ),
        },
        ListItemStyle: {
            flexDirection: 'column', alignItems: 'center', width: '100%', paddingVertical: 12
            , borderRadius: 12, elevation: 1, marginVertical: 10, paddingHorizontal: 16,
        },
        buttonTextStyle: {
            color: '#fff',
            fontWeight: 'bold',
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
            <View style={styles.container}><Text style={styles.sectionTitle}>myauto.ge</Text></View>
            <TouchableOpacity style={{ elevation: 1 }} onPress={() => setIsCatVisible(!isCatVisible)} >
                <View style={styles.inputContainer}>
                    <Text>{selectedCategoryId.length === 0 ? 'კატეგორია' : categoryData.filter((d: category) => selectedCategoryId.includes(d.category_id)).map((d: category) => d.title).join(', ')}</Text>
                    <Icon name="chevron-down" size={16} />
                </View>

            </TouchableOpacity>
            <Modal isVisible={isCatVisible} onBackdropPress={() => setIsCatVisible(false)} onSwipeComplete={() => setIsCatVisible(false)}
                style={styles.catModal} >
                <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column' }}>
                    <Searchbar style={styles.searchbar} onChangeText={onChangeText} value={text} placeholder="მოძებნე" onSubmitEditing={Keyboard.dismiss} />

                    {categoryData != null && !isLoading ? categoryData.filter((d: category) => d.title.includes(text)).map((val: category, key) => <TouchableOpacity key={key} onPress={(e) => {
                        if (!selectedCategoryId.includes(val.category_id)) {
                            setSelectedCategoryId([
                                ...selectedCategoryId,
                                val.category_id,
                            ]);
                        } else {
                            setSelectedCategoryId(
                                selectedCategoryId.filter((id) => id !== val.category_id),
                            );
                        }

                    }}>
                        <View style={styles.checkboxStyle}>
                            <Checkbox color="#fd4100" status={selectedCategoryId.includes(val.category_id) ? 'checked' : 'unchecked'} />
                            <Text>{val.title}</Text>
                        </View>
                    </TouchableOpacity>) : <Text />}




                </ScrollView>
                <Button onPress={() => setIsCatVisible(false)} style={{ marginTop: 20, backgroundColor: '#fd4100', borderRadius: 15, padding: 4.5 }}>
                    <Text style={styles.buttonTextStyle}>არჩევა</Text>
                </Button>
            </Modal>
            <TouchableOpacity onPress={() => setVisible(!isVisible)}>

                <View style={styles.inputContainer}>
                    <Text>{selectedWheelId === -1 ? 'საჭე' : wheelData.filter((d: wheel) => d.wheel_type_id === selectedWheelId).map((d: wheel) => d.title)}</Text>
                    <Icon name="chevron-down" size={16} />
                </View>
            </TouchableOpacity>
            <Modal isVisible={isVisible} onBackdropPress={() => setVisible(false)} onSwipeComplete={() => setVisible(false)} style={styles.wheelModal} >
                <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ textAlign: 'center' }}>საჭე</Text>
                        {wheelData.map((val: wheel, key) => <TouchableOpacity key={key} onPress={() => { setSelectedWheelId(selectedWheelId === val.wheel_type_id ? -1 : val.wheel_type_id); }}>
                            <View style={styles.checkboxStyle}>
                                <Checkbox color="#fd4100" status={val.wheel_type_id === selectedWheelId ? 'checked' : 'unchecked'} />
                                <Text>{val.title}</Text>

                            </View>
                        </TouchableOpacity>)}
                    </View>
                    <Button onPress={() => setVisible(false)} style={{ backgroundColor: '#fd4100', borderRadius: 15, padding: 4.5 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', }}>არჩევა</Text>
                    </Button>

                </ScrollView>
            </Modal>



            <Button onPress={() => handleClick()} style={{ backgroundColor: '#fd4100', borderRadius: 15, padding: 4.5 }}>
                <Text style={styles.buttonTextStyle}>მოძებნა</Text>
            </Button>
            {carData.map((data: item, key) => {
                return <View key={key} style={styles.ListItemStyle}>
                    <Text>{`Car ID: ${data.car_id}`}</Text>
                    <Text>{`$${data.price}`}</Text>
                    <Text>{manData.filter((val: manufacturer) => val.man_id === data.man_id).map((d: manufacturer) => d.title)}</Text>
                </View>;
            })}
        </>
    );
};



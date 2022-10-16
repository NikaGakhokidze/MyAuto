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
import { CategoryModal } from './CategoryModal';
import { WheelModal } from './WheelModal';

export interface wheel {
    title: string,
    wheel_type_id: number
}

export interface category {
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

    const [isWheelVisible, setIsWheelVisible] = React.useState(false);
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
        ListItemStyle: {
            flexDirection: 'column', alignItems: 'center', width: '100%', paddingVertical: 12
            , borderRadius: 12, elevation: 1, marginVertical: 10, paddingHorizontal: 16,
        },
        buttonTextStyle: {
            color: '#fff',
            fontWeight: 'bold',
        },

    });


    return (
        <>
            <View style={styles.container}><Text style={styles.sectionTitle}>myauto.ge</Text></View>
            <CategoryModal data={categoryData} inputText={text} onChangeText={onChangeText} isLoading={isLoading} isVisible={isCatVisible} setVisible={setIsCatVisible} keyboardHeight={keyboardHeight} selectedFilters={selectedCategoryId} setSelectedFilters={setSelectedCategoryId} />
            <WheelModal data={wheelData} isVisible={isWheelVisible} setVisible={setIsWheelVisible} selectedFilter={selectedWheelId} setSelectedFilter={setSelectedWheelId} />

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



import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import { loadPlaces } from '../store/actions/places';

const PlacesListScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const places = useSelector(state => state.places.places);

    useEffect(() => {
        dispatch(loadPlaces());
    }, [dispatch]);

    return (
        <View>
            <FlatList
                keyExtractor={item => item.id}
                data={places}
                renderItem={(itemData) => 
                    <PlaceItem 
                        image={itemData.item.imageUri}
                        title={itemData.item.title}
                        address={null}
                        onSelect={() => {
                            navigation.navigate('PlaceDetail', {
                                placeTitle: itemData.item.title, 
                                placeId: itemData.item.id
                            });
                        }}/>
                }/>
        </View>
    )
}

PlacesListScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
            <HeaderButtons 
                HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Add Place"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navigation.navigate('NewPlace');
                    }}/>
            </HeaderButtons>
        )
    }
}

export default PlacesListScreen

const styles = StyleSheet.create({})

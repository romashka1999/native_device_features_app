import React from 'react'
import { StyleSheet, Text, View, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = ({navigation}) => {

    const places = useSelector(state => state.places.places);

    return (
        <View>
            <FlatList
                keyExtractor={item => item.id}
                data={places}
                renderItem={(itemData) => 
                    <PlaceItem 
                        image={null}
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

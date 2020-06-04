import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const MapScreen = ({navigation}) => {
    const [selectedLocation, setSelectedLocation] = useState();

    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const selectLocationHandler = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        });
    }

    let markerCoordinates;

    if(selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation) {
            return;
        }
        navigation.navigate('NewPlace', {pickedLocaton: selectedLocation});
    }, [selectedLocation]);

    useEffect(() => {
        navigation.setParams({saveLocation: savePickedLocationHandler})
    }, [savePickedLocationHandler]);

    return (
        <MapView 
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}>
           {markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>}
        </MapView>
    )
}

MapScreen.navigationOptions = ({navigation}) => {

    const saveFn = navigation.getParam('saveLocation');

    return {
        headerRight: () => (
            <HeaderButtons 
                HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Add Place"
                    iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
                    onPress={saveFn}/>
            </HeaderButtons>
        )
    }
}

export default MapScreen

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

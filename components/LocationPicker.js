import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator, Alert } from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = ({navigation, onLocationPicked}) => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    const mapPickedLocation = navigation.getParam('pickedLocaton');

    useEffect(() => {
        if(mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }
    }, [mapPickedLocation, onLocationPicked]);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if(result.status !== 'granted') {
            Alert.alert('Insufficient permissions!', 'You need to grant location permissions', [
                {text: 'Okay'}
            ]);
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return
        }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 10000
            });
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (error) {
            console.log(error);
            Alert.alert('Could not fecth Location', 'Please Try Again Later', [
                {text: 'Okay'}
            ]);
        }
        setIsFetching(false);
        
    }

    const piickOnMapHandler = () => {
        navigation.navigate('Map');
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation}>
                {isFetching ? <ActivityIndicator size='large' color={Colors.primary}/> : <Text>No Location Chosen Yet</Text>}
            </MapPreview>
            <View style={styles.actions}>
                <Button 
                    title="Get User Location"
                    color={Colors.primary}
                    onPress={getLocationHandler}/>
                <Button 
                    title="Pick on map"
                    color={Colors.primary}
                    onPress={piickOnMapHandler}/>
            </View>
            
        </View>
    )
}

export default LocationPicker

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
})

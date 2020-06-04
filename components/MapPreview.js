import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const MapPreview = ({location, children, style}) => {
    let imagePreviewUrl;

    if(location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=AIzaSyBMih4DOJGO6uFzD0VPyQzpgC1d-p3cRy0`;
    }
    
    return (
        <View style={style}>
            {location ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/> : children}
        </View>
    )
}

export default MapPreview

const styles = StyleSheet.create({
    mapImage: {
        width: '100%',
        height: '100%'
    }
})

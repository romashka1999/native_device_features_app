import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlaceDetailScreen = ({navigation}) => {


    return (
        <View>
            <Text></Text>
        </View>
    )
}

PlaceDetailScreen.navigationOptions = ({navigation}) => {
    const title = navigation.getParam('placeTitle');
    return {
        headerTitle: title
    }
}

export default PlaceDetailScreen

const styles = StyleSheet.create({})

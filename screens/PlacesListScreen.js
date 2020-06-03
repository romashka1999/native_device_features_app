import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const PlacesListScreen = () => {
    return (
        <View>
            <Text></Text>
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

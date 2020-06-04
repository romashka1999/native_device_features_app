import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native'
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import { addPlace } from '../store/actions/places';
import ImagePicker from '../components/ImagePicker';

const NewPlaceScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState();

    const titleChangeHandler = text => {
        setTitle(text);
    }

    const imageTakenHandler = imagePath => {
        setImage(imagePath);
    }

    const savePlaceHandler = () => {
        dispatch(addPlace(title, image));
        navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>title</Text>
                <TextInput 
                    style={styles.textInput}
                    value={title}
                    onChangeText={titleChangeHandler}/>
                <ImagePicker 
                    onImageTaken={imageTakenHandler}/>
                <Button 
                    title="Save Place"
                    color={Colors.primary}
                    onPress={savePlaceHandler}/>
            </View>
        </ScrollView>
    )
}

export default NewPlaceScreen

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

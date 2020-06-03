import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = () => {

    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if(result.status !== 'granted') {
            Alert.alert('Insufficient permissions!', 'You need to grant camera permissions', [
                {text: 'Okay'}
            ]);
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        });
        if(image.cancelled) {
            return
        }
        setPickedImage(image.uri);
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (<Text>No Image Picked Yet</Text>) :
                    (
                        <Image 
                            style={styles.image}
                            source={{uri: pickedImage}}/> 
                    )
                }
            </View>
            <Button 
                title="Take Image"
                color={Colors.primary}
                onPress={takeImageHandler}/>
        </View>
    )
}

export default ImgPicker

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        height: 200,
        width: '100%',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    }, 
    image: {
        width: '100%',
        height: '100%'
    }
});

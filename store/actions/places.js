import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
import { insertPlace, fetchPlaces } from '../../helpers/db';


export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        let placeId;
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, 'address', 15.6, 12.3);
            placeId = dbResult.insertId;
            console.log(dbResult, '-----------------------------')
        } catch (error) {
            console.log(error);
        }

        dispatch({ type: ADD_PLACE, placeData: {
            id: placeId,
            title,
            image: newPath
        }});
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            console.log(dbResult);
            dispatch({ type: SET_PLACES, places: dbResult.rows._array });
        } catch (error) {
            console.log(error);
        }
    }
}
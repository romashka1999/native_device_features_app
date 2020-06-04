import Place from '../../models/Place';
import { ADD_PLACE, SET_PLACES } from "../actions/places";

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES:
            return {
                ...state,
                places: action.places.map(place => new Place(
                        place.id.toString(),
                        place.title,
                        place.imageUri
                    ))
            }
        case ADD_PLACE:
            const place = new Place(
                action.placeData.id.toString(),
                action.placeData.title, 
                action.placeData.image
            );
            return {
                ...state,
                places: state.places.concat(place)
            }
        default:
            return state;
    }
}
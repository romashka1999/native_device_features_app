import Place from '../../models/Place';
import { ADD_PLACE } from "../actions/places";

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const place =  new Place(new Date().toString(), action.placeData.title);
            return {
                ...state,
                places: state.places.concat(place)
            }
        default:
            return state;
    }
}
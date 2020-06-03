import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform} from 'react-native';

import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import PlacesListScreen from '../screens/PlacesListScreen';
import Colors from '../constants/Colors';

const PlacesStackNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleAlign: 'center'
    }
});

export default createAppContainer(PlacesStackNavigator);
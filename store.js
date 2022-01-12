import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Action } from './actions';

const initialState = {
    chains: [],
    locations: [],
    measurements: [],
    selectedRestaurant: null,
    isProgressing: false,
    chainLoaded: false,
    locationsLoaded: false,
    measurementsLoaded: false,
    latitude: null,
    longitude: null,
};

function reducer(state, action) {
    switch (action.type) {
        case Action.LoadChains:
            return {
                ...state,
                chains: action.payload,
                chainLoaded: true,
            };
        case Action.LoadLocations:
            return {
                ...state,
                locations: action.payload,
                locationsLoaded: true,
            };
        case Action.LoadMeasurements:
            return {
                ...state,
                measurements: action.payload,
                measurementsLoaded: true,
            }
        case Action.LoadLatitude:
            return {
                ...state,
                latitude: action.payload,
            };
        case Action.LoadLongitude:
            return {
                ...state,
                longitude: action.payload,
            };
        case Action.ShowProgress:
            return {
                ...state,
                isProgressing: true,
            };
        case Action.HideProgress:
            return {
                ...state,
                isProgressing: false,
            };
        case Action.AddMeasurement:
            return {
              ...state,
              measurements: [action.payload, ...state.measurements],  
            };
        case Action.SelectRestaurant:
            return {
                ...state,
                selectedRestaurant: action.payload,
            };
        default:
            return state;
    }
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
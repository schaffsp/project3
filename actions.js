import { assertResponse } from 'react-thunk';

export const Action = Object.freeze({
    LoadChains: 'LoadChains',
    LoadRestaurants: 'LoadRestaurants',
    LoadLocations: 'LoadLocations',
    ShowProgress: 'ShowProgress',
    HideProgress: 'HideProgress',
    SelectRestaurant: 'SelectRestaurant',
    LoadLatitude: 'LoadLatitude',
    LoadLongitude: 'LoadLongitude',
    LoadMeasurements: 'LoadMeasurements',
    AddMeasurement: 'AddMeasurement',
});

export function fetchChains() {
    return dispatch => {
        dispatch(showProgress());
        fetch("https://project2.schafftsp.me:8443/chains").then(response => response.json()).then(data => {
            dispatch(loadChains(data));
            dispatch(hideProgress());
        });
    }
}

export function postMeasurement(id, inTime, outTime) {
    const new_measurement = {
        rest_id: id,
        meas_time_in: inTime,
        meas_time_out: outTime,
        meas_drive_through: 1,
    };

    return dispatch => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_measurement),
          };
          fetch(`https://project2.schafftsp.me:8443/measurement/`, options)
          .then(assertResponse)
          .then(response => response.json())
          .then(data => {
            if (data.ok) {
              dispatch(addMeasurement({
                ...new_measurement
              }));
            }
          })
          .catch(err => {
            console.log("error:", err);
          });
      };
}

export function fetchLocations(chain_id) {
    return dispatch => {
        dispatch(showProgress());
        fetch("https://project2.schafftsp.me:8443/restaurants/" + chain_id).then(response => response.json()).then(data => {
            dispatch(loadLocations(data));
            dispatch(hideProgress());
        });
    }
}

export function fetchMeasurements(rest_id) {
    return dispatch => {
        dispatch(showProgress());
        fetch("https://project2.schafftsp.me:8443/measurement/" + rest_id).then(response => response.json()).then(data => {
            dispatch(loadMeasurements(data));
            dispatch(hideProgress());
        });
    }
}

export function addMeasurement(measurement) {
    return {type: Action.AddMeasurement, payload: measurement};
  }

export function loadChains(chains) {
    return { type: Action.LoadChains, payload: chains }
}

export function loadMeasurements(measurements) {
    return { type: Action.LoadMeasurements, payload: measurements }
}

export function loadLocations(locations) {
    return { type: Action.LoadLocations, payload: locations }
}

export function loadLatitude(latitude) {
    return { type: Action.LoadLatitude, payload: latitude }
}

export function loadLongitude(longitude) {
    return { type: Action.LoadLongitude, payload: longitude }
}

export function showProgress() {
    return { type: Action.ShowProgress, payload: true };
}

export function hideProgress() {
    return { type: Action.HideProgress, payload: false };
}

export function selectRestaurant(restaurant_id) {
    return { type: Action.SelectRestaurant, payload: restaurant_id };
}
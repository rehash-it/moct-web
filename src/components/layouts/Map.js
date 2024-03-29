import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { mapApi } from '../../config/config';

const containerStyle = {
    width: '400px',
    height: '400px'
};


function MyComponent({ center }) {
    const { isLoaded } = useJsApiLoader({
        id: 'moct-map',
        googleMapsApiKey: mapApi
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}

            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)
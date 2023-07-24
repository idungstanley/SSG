import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

export default function MapsView() {
  const { isLoaded } = useJsApiLoader({
    id: 'map-trials-SSG',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY as string
  });

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
  };

  const onUnMount = (): void => {
    mapRef.current = null;
  };
  if (!isLoaded) return <div className="">Map Loading...</div>;
  return (
    <div className="App">
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnMount}
        zoom={10}
      />
    </div>
  );
}

// Map Styles from Snazzy Maps
const mapStyles = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#444444'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 45
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#46bcec'
      },
      {
        visibility: 'on'
      }
    ]
  }
];

const containerStyle = {
  width: '100%',
  height: '88vh'
};

// Center on Abuja
const center = {
  lat: 9.147031,
  lng: 7.307555
};

// Disable default UI
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};

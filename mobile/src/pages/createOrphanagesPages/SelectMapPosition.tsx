import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarkerImg from '../../assets/Local.png';

interface RouteParams {
  location: {
    latitude: number;
    longitude: number;
  }
}

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const route = useRoute();

  const { location } = route.params as RouteParams

  const {latitude, longitude} = location

  console.log(latitude, longitude)

  const [position, setPosition] = useState({latitude: 0, longitude: 0})

  const handleSetPositionInMap = useCallback((event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate)
  }, []) 

  function handleNextStep() {
    navigation.navigate('CreateOrphanage', {position});
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSetPositionInMap}
      >
        {position.latitude !== 0 && (
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        )}
      </MapView>
      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,

    shadowOffset: {height: 1, width: 1},
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})
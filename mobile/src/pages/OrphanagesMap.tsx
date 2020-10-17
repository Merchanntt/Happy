import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps'
import {Feather} from '@expo/vector-icons'
import api from '../services/api';
import {getCurrentPositionAsync, requestPermissionsAsync} from 'expo-location'

import { styles } from '../styles/OrphanagesMap';

import MapMarker from '../assets/Local.png'

interface OrphanagesData {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {
  const {navigate} = useNavigation()
  const [location, setLocation] = useState({latitude: 0, longitude: 0})

  const [orphanages, setOrphanages] = useState<OrphanagesData[]>([])

  useEffect(() => {
      async function findLocation() {
        const { granted } = await requestPermissionsAsync();

        if(granted) {
          const {coords} = await getCurrentPositionAsync({
            accuracy: 1
          });
  
          const {latitude, longitude } = coords;
  
          setLocation({latitude, longitude}) 
        }
      }
      findLocation()
    }, [])

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  })


  const handleNavigateToDetails = useCallback((id: number) => {
    navigate('OrphanageDetails', { id })
  }, [])

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigate('MapSelectedPoint', {location})
  }, [location])

  if(location.latitude === 0) {
    return <ActivityIndicator size='large' style={{
      flex: 1,
      justifyContent: "center",
      alignItems: 'center'
    }}/>
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => (
          <Marker 
          key={orphanage.id}
          icon={MapMarker}
          calloutAnchor={{
            x: 2.8,
            y: 0.6,
          }}
          coordinate={{
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
          }}
        >
          <Callout tooltip onPress={() => handleNavigateToDetails(orphanage.id)}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{orphanage.name} </Text>
            </View>
          </Callout>
        </Marker>
        ))}
      </MapView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
          <RectButton style={styles.footerButton} onPress={handleNavigateToCreateOrphanage}>
            <Feather name='plus' size={20} color='#fff'/>
          </RectButton>
        </View>
    </View>
  );
}

export default OrphanagesMap;
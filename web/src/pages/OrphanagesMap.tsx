import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react'

import MapMarker from '../assets/images/map-marker.svg'

import Marker from '../components/Marker'
import api from '../services/api';

import '../styles/pages/Orphanage-map-page.css'

interface OrphanagesData {
  id: number;
  longitude: number;
  latitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanagesData[]>([])

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarker} alt="MapMarker"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Curitiba</strong>
          <span>Paraná</span>
        </footer>
      </aside>

      <GoogleMapReact 
        bootstrapURLKeys={{key: 'AIzaSyBB0Ynr7aF1r8YoU16y3g5K0v_8LQp4BbU'}}
        defaultZoom={14}
        defaultCenter={{
          lat: -25.5324122,
          lng: -49.2537338
        }}
      >
        {orphanages.map(orphanage => (
          <Marker 
          key= {orphanage.id}
          id= {orphanage.id}
          name= {orphanage.name}
          lat= {orphanage.latitude}
          lng= {orphanage.longitude}
          />
        ))}
      </GoogleMapReact>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={22} color="#fff"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react'

import MapMarker from '../assets/images/map-marker.svg'

import '../styles/pages/Orphanage-map-page.css'

const OrphanagesMap: React.FC = () => {
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
      />

      <Link to="" className="create-orphanage">
        <FiPlus size={22} color="#fff"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;
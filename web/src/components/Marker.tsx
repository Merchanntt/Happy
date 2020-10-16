import React, { useCallback, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import MarkerPin from '../assets/images/map-marker.svg'

interface MarkerProps {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

const Marker: React.FC<MarkerProps> = ({ id, name }) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleOpenPopUp = useCallback(() => {
    setIsSelected(!isSelected)
  }, [isSelected])

  return (
    <div >
      <button type='button' onClick={handleOpenPopUp} style={{
        background: 'none',
        border: 'none',
        cursor: "pointer",
        position: 'relative'
      }}>
        <img src={MarkerPin} alt="Pin" style={{
          height: 48,
          width: 48,
          marginTop: -29
        }}/>
      </button>
      {isSelected && (
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.8)', 
            height: 44, 
            width: 250,
            position: 'absolute',
            top: -30,
            left: 60,
            borderRadius: 8,
            color: '#3089a5',
            fontSize: 18,
            display: "flex",
            fontWeight: 800,
            alignItems: "center",
            justifyContent: 'space-between',
            padding: 4
          }}>
          <span style={{maxWidth: 200}}>{name}</span>
          <Link to={`/orphanages/${id}`} style={{
            width: 38,
            height: 38,
            backgroundColor: '#15c3d6',
            display: "flex",
            justifyContent: 'center',
            alignItems: "center",
            borderRadius: 8
          }}>
            <FiArrowRight size={20} color='#fff'/>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Marker;
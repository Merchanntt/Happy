import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import GoogleMapReact from 'google-map-react'
import Marker from "../components/Marker";

import api from "../services/api";

import SideBar from "../components/SideBar";

import '../styles/pages/orphanage.css';

interface OrphanageData {
  name: string;
  longitude: number;
  latitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>
}

interface Params {
  id: string;
}

export default function Orphanage() {
  const params = useParams<Params>()

  const [activeImage, setActiveImage] = useState(0)
  const [orphanage, setOrphanage] = useState<OrphanageData>()

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then(response => {
      setOrphanage(response.data)
    })
  }, [params.id])

  if(!orphanage) {
    return <div>Carregando...</div>
  }

  return (
    <div id="page-orphanage">
      <SideBar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImage].url} alt="Lar das meninas" />

          <div className="images">
            {orphanage.images.map((image, index) => (
              <button 
                key={image.id} 
                onClick= {() => setActiveImage(index)}
                className={activeImage === index ? 'active' : ''} 
                type="button"
              >
                <img src={image.url} alt={orphanage.name} />
              </button>
            ))}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name} </h1>
            <p> {orphanage.about} </p>

            <div className="map-container">
              <div style={{height: 280}}>
                <GoogleMapReact 
                  bootstrapURLKeys={{key: ''}}
                  defaultZoom={14}
                  draggable={false}
                  defaultCenter={{
                    lat: orphanage.latitude,
                    lng: orphanage.longitude
                  }}
                >
                    <Marker 
                    name= {orphanage.name}
                    lat= {orphanage.latitude}
                    lng= {orphanage.longitude}
                    />
                </GoogleMapReact>
              </div>

              <footer>
                <a target='_blank' rel='noopener noreferrer' href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p> {orphanage.instructions} </p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              )
              : (
                <div className="dont-open-on-weekends">
                <FiInfo size={32} color="#ff6690" />
                Não atendemos <br />
                fim de semana
              </div>
              )
            }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
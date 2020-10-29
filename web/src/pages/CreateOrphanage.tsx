import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import GoogleMapReact from 'google-map-react'
import Marker from "../components/Marker";

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import SideBar from "../components/SideBar";
import api from "../services/api";

export default function CreateOrphanage() {
  const history = useHistory()

  const [position, setPosition] = useState({latitude: 0, longitude: 0})

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHour] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)

  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])


  const handleSetPosition = useCallback((event: GoogleMapReact.ClickEventValue) => {
    const lat = event.lat;
    const lng = event.lng;

    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }, [])

    const handleUploadImages = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      if(!event.target.files) {
        return;
      }

      const selectedImages = Array.from(event.target.files)

      setImages(selectedImages)

      const previewImagesUrl = selectedImages.map(image => {
        return URL.createObjectURL(image)
      })

      setPreviewImages(previewImagesUrl)
    }, []) 

    const handleSubmitForm = useCallback(async (event: FormEvent) => {
      event.preventDefault()

      const {latitude, longitude} = position;

      const data = new FormData()

      data.append('name', name)
      data.append('about', about)
      data.append('latitude', String(latitude))
      data.append('longitude', String(longitude))
      data.append('instructions', instructions)
      data.append('opening_hours', opening_hours)
      data.append('open_on_weekends', String(open_on_weekends))
      
      images.forEach(image => {
        data.append('images', image)
      })

      await api.post('orphanages', data)

      alert('Cadastro realizado com sucesso!')

      history.push('/app')

    }, [
        name,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
        position,
        images,
        history
    ])

  return (
    <div id="page-create-orphanage">
      <SideBar/>
      
      <main>
        <form onSubmit={handleSubmitForm} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>
              <div style={{height: 280, borderRadius: 20}}>
                <GoogleMapReact 
                  bootstrapURLKeys={{key: ''}}
                  defaultZoom={14}
                  onClick={handleSetPosition}
                  defaultCenter={{
                    lat: -25.5324122,
                    lng: -49.2537338
                  }}
                >
                    <Marker 
                    lat= {position.latitude}
                    lng= {position.longitude}
                    />
                </GoogleMapReact>
              </div>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about}
                onChange={event => setAbout(event.target.value)}  
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => (
                  <img key={image} src={image} alt={name} />
                ))}
                <label htmlFor='image[]' className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
                <input multiple onChange={handleUploadImages} type="file" id="image[]"/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours}
                onChange={event => setOpeningHour(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim</button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

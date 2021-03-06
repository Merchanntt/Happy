import React from 'react';
import { Link } from 'react-router-dom'
import {FiArrowRight} from 'react-icons/fi'

import '../styles/pages/Landing-page.css';

import LogoImg from '../assets/images/Logo.svg'

const LandingPage: React.FC = () => {
  return (
    <div id='landing-page'>
      <div className="content-wrapper">
        <img src={LogoImg} alt="Happy-Logo"/>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia  de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Curitiba</strong>
          <span>Paraná</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={16} color="rgba(0, 0, 0, 0.6)"/>
        </Link>
      </div>
    </div>  
  );
}

export default LandingPage;
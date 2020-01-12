import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import Goods from '@/pages/Goods'
import './view.scss';

const Home: React.FC = () => {

  const [overlay, setOverlay] = useState(false);

  return (
    <div className="home_container">
      <div className="left">
        <ul className="category">
          <li
            className="item"
            onMouseLeave={() => setOverlay(false)}
            onMouseEnter={() => setOverlay(true)}>
            <h4 className="title">car pro</h4>
            <ul className="wrapper">
              <li>Cars Trucks</li>
              <li>Buy Here Pay Here</li>
              <li>Motorcycles</li>
              <li>Motorcycles</li>
              <li>Auto Parts</li>
              <li>Wheels Tires</li>
              <li>RVS, Campers, Trailers</li>
            </ul>
          </li>
          <li
            className="item"
            onMouseLeave={() => setOverlay(false)}
            onMouseEnter={() => setOverlay(true)}>
            <h4 className="title">car pro</h4>
            <ul className="wrapper">
              <li>Cars Trucks</li>
              <li>Buy Here Pay Here</li>
              <li>Motorcycles</li>
              <li>Motorcycles</li>
              <li>Auto Parts</li>
              <li>Wheels Tires</li>
              <li>RVS, Campers, Trailers</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={`right ${overlay ? 'overlay': ''}`}>
        <Route component={Goods} />
      </div>
    </div>
  )
}

export default Home;

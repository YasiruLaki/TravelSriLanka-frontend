import React, { useState } from 'react';
import './App.css';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { useRef } from 'react';

function App() {
  const inputref = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    libraries: ["places"],

  })
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  console.log(isLoaded)

  const handleOnPlacesChanged = () => {
    let address = inputref.current.getPlaces()
    console.log("address", address)
  }

  const handleIncrement = (e) => {
    if (e === 'adults') {
      setAdults(adults + 1);
    } else {
      setChildren(children + 1);
    }
  }

  const handleDecrement = (e) => {
    if (e === 'adults') {
      if (adults > 0) {
        setAdults(adults - 1);
      }
    } else {
      if (children > 0) {
        setChildren(children - 1);
      }
    }
  }

  const handleBooking = () => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const checkInYear = checkIn.getFullYear();
    const checkInMonth = checkIn.getMonth() + 1;
    const checkInDay = checkIn.getDate();
    const checkOutYear = checkOut.getFullYear();
    const checkOutMonth = checkOut.getMonth() + 1;
    const checkOutDay = checkOut.getDate();

    const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&checkin_year=${checkInYear}&checkin_month=${checkInMonth}&checkin_monthday=${checkInDay}&checkout_year=${checkOutYear}&checkout_month=${checkOutMonth}&checkout_monthday=${checkOutDay}&group_adults=${adults}&group_children=${children}`;

    window.open(url, '_blank').focus();
  };

  return (
    <div className="App">
      <div className='landing-section'>
        <div className='landing-title-container'>
          <h1 className='title landing-title'>Discover The</h1>
          <h1 className='title landing-title'><span className='emphasize'>Pearl</span> Of The</h1>
          <h1 className='title landing-title'>Indian Ocean.</h1>

          <p className='subtitle landing-subtitle'>Welcome to Sri Lanka: vibrant culture, <br></br>
            stunning landscapes, and unforgettable adventures.</p>

          <button className='button landing-btn' onClick={()=> window.open("https://www.youtube.com/watch?v=1wS9rGcx3Gs", "_blank")} >Explore Sri Lanka →</button>
        </div>

        <div className='landing-hotels-container'>
          <h1 className='title landing-hotels-title'>Find The Best Stay For You.</h1>
          <p className='subtitle landing-hotels-subtitle'>Discover the ideal accommodation to match your style and budget.</p>

          <div className='line'></div>
          <div className='flex-row landing-hotels-info'>
            <div className='landing-hotels-info-item'>
              <p className='title-2 landing-hotels-info-item-title'>Destination</p>
              {isLoaded &&
                <StandaloneSearchBox
                  onLoad={(ref) => inputref.current = ref}
                  onPlacesChanged={handleOnPlacesChanged}
                >
                  <input
                    type='text'
                    className='subtitle input-text landing-hotels-info-item-input'
                    placeholder='Where are you going?'
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </StandaloneSearchBox>
              }

            </div>
            <div className='landing-hotels-info-item'>
              <p className='title-2 landing-hotels-info-item-title'>Check in</p>
              <input
                type='date'
                className='subtitle input-text landing-hotels-info-item-input'
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className='landing-hotels-info-item'>
              <p className='title-2 landing-hotels-info-item-title'>Check out</p>
              <input
                type='date'
                className='subtitle input-text landing-hotels-info-item-input'
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
            <div className='landing-hotels-info-item'>
              <p className='title-2 landing-hotels-info-item-title'>Travellers</p>
              <div className='flex-row'>
                <p className='subtitle landing-hotels-info-item-subtitle'>
                  Adults <span><button onClick={() => handleDecrement('adults')}>-</button> {adults} <button onClick={() => handleIncrement('adults')}>+</button></span>
                </p>
                <span>&nbsp; | &nbsp;</span>
                <p className='subtitle landing-hotels-info-item-subtitle'>
                  Children <span><button onClick={() => handleDecrement('children')}>-</button> {children} <button onClick={() => handleIncrement('children')}>+</button></span>
                </p>
              </div>
            </div>
            <button onClick={handleBooking} className='button booking-button'>Search →</button>
          </div>
        </div>
      </div>

      <div className='top-locations-section'>
        <h1 className='title top-locations-title'>Discover Sri Lanka.</h1>
        <div className='flex-row top-locations-container'>
          <div className='top-locations-item'>
            <p className='subtitle item-number'>#1</p>
            <p className='title top-locations-item-title'>Sigiriya</p>
            <p className='subtitle top-locations-item-subtitle'>Sigiriya, the Lion Rock, is an ancient fortress and palace in Sri Lanka. Famous for its stunning frescoes and panoramic views, it’s a must-visit historical site.</p>
          </div>
          <div className='top-locations-item'>
          <p className='subtitle item-number'>#2</p>
            <p className='title top-locations-item-title'>Ella</p>
          </div>
          <div className='top-locations-item'>
          <p className='subtitle item-number'>#3</p>
            <p className='title top-locations-item-title'>Ella</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

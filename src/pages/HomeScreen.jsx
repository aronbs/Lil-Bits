import { useState } from 'react';
import '../App.css';
import { Button, H1, ImageSlider, NavBar } from '../components';
import lilbits1 from '../images/lilbits1.jpeg';
import lilbits2 from '../images/lilbits2.jpeg';
import lilbits3 from '../images/lilbits3.jpeg';

const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const slides = [
    { url: lilbits1, title: 'forest' },
    { url: lilbits2, title: 'city' },
    { url: lilbits3, title: 'italy' }
  ];
  const containerStyles = {
    margin: '0 auto'
  };

  return (
    <>
      <NavBar />
      <div className="App">
        <div className="grid-container">
          <div className="grid-item1 grid-item-containers">
            <div style={containerStyles}>
              <ImageSlider slides={slides} />
            </div>
          </div>
          <div className="grid-item2 grid-item-containers">
            <div className="order-grid">
              <div className="order-box-div1">
                <H1 text={'start your order'} />
              </div>
              <div className="order-box-div2">
                <Button page={'/dish'} text={'order'} />
              </div>
            </div>
          </div>

          <div className="grid-item3 grid-item-containers">
            <div className="find-order-h1-div">
              <H1 text={'Find your order'} />
            </div>
            <div className="find-order-input-div">
              <label>Enter email:</label>
              <input onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="find-order-button-div">
              <Button page={`/dish?email=${email}`} text={'find'} />
            </div>
          </div>

          <div className="grid-item4 grid-item-containers">
            <H1 text={'lilbits@gmail.com'} />
            <H1 text={'mon-fri - 16:00-23:00'}></H1>
            <H1 text={'tel: 581-2345'}></H1>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;

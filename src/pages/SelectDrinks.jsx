import { useEffect, useState } from 'react';
import '../App.css';
import { Button, MissingOrder, H1 } from '../components';
import { getEmailParam, findOrder, updateOrder, missingOrder } from '../utils';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../components';

const SelectDrinks = () => {
  const navigate = useNavigate();
  const [drink, setDrink] = useState();
  const [selectedDrinks, setSelectedDrinks] = useState([]);

  useEffect(() => {
    const currentOrder = JSON.parse(localStorage.getItem('newOrder'));
    fetch('https://api.punkapi.com/v2/beers')
      .then((data) => data.json())
      .then((data) => setDrink(data))
      .then(() => {
        if (currentOrder) {
          setSelectedDrinks(currentOrder.drinks.map((item) => item.id));
        }
        if (getEmailParam()) {
          const order = findOrder(getEmailParam());
          setSelectedDrinks(order.drinks.map((item) => item.id));
        }
      });
  }, []);

  const addDrink = (item) => {
    if (selectedDrinks.includes(item.id)) {
      setSelectedDrinks(selectedDrinks.filter((id) => id !== item.id));
    } else setSelectedDrinks([...selectedDrinks, item.id]);
  };

  const isSelected = (id) => {
    return selectedDrinks.includes(id);
  };

  const GoToNextPage = () => {
    if (selectedDrinks.length === 0) {
      alert('Please select a drink');
      return;
    }
    const email = getEmailParam();
    if (email) {
      const order = findOrder(email);
      order.drinks = selectedDrinks.map((id) => drink.find((item) => item.id === id));
      updateOrder(email, order);
    } else {
      const currentOrder = JSON.parse(localStorage.getItem('newOrder'));
      localStorage.setItem(
        'newOrder',
        JSON.stringify({
          ...currentOrder,
          drinks: selectedDrinks.map((id) => drink.find((item) => item.id === id))
        })
      );
    }
    if (email) navigate(`/order?email=${email}`);
    else navigate('/order');
  };

  if (missingOrder()) return <MissingOrder />;

  return (
    <div>
      <NavBar page="drinks" />
      <div className="drink-container">
        <div className="drink-grid-container">
          <div className="drink-grid-item1">
            {drink?.map((item, index) => (
              <div key={index} onClick={() => addDrink(item)} className="grid-item-containers">
                <img
                  alt={item.tagline}
                  src={item.image_url}
                  style={{ maxHeight: 350, width: 'fit-content', padding: 20, margin: 20 }}></img>
                <h1>{item.name}</h1>
                {isSelected(item.id) && <h2 style={{ color: 'red' }}>selected</h2>}
              </div>
            ))}
          </div>
          <div className="drink-grid-item2 grid-item-containers small-box">
            <div className="text-in-small-box">
              {' '}
              <H1 text={'select drinks'}></H1>
            </div>
            <div className="button-in-small-box">
              <Button onClick={() => GoToNextPage()} text="Next" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDrinks;

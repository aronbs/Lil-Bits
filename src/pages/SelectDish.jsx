import { useEffect, useState } from 'react';
import '../App.css';
import { Button, MissingOrder, H1, NavBar } from '../components';
import { getEmailParam, findOrder, updateOrder, missingOrder } from '../utils';
import { useNavigate } from 'react-router-dom';
import Text from '../styled-components/Text';

const SelectDish = () => {
  const navigate = useNavigate();
  const [meal, setMeal] = useState();

  const setNewMeal = () => {
    fetch('https://themealdb.com/api/json/v1/1/random.php')
      .then((data) => data.json())
      .then((data) => setMeal(data.meals[0]));
  };

  useEffect(() => {
    const email = getEmailParam();
    if (email) {
      const order = findOrder(email);
      if (order) {
        setMeal(order.meal);
      }
    } else {
      setNewMeal();
    }
  }, []);

  const GoToNextPage = () => {
    const email = getEmailParam();
    if (email) {
      const order = findOrder(email);
      order.meal = meal;
      updateOrder(email, order);
      navigate(`/drinks?email=${email}`);
    } else {
      localStorage.setItem('newOrder', JSON.stringify({ meal }));
      navigate('/drinks');
    }
  };

  if (missingOrder()) return <MissingOrder />;

  return (
    <div>
      <NavBar page={'dish'} />
      <div className="dish-container">
        <div className="dish-grid-container">
          <div className="dish-grid-item1 grid-item-containers">
            <img src={meal?.strMealThumb} alt={meal?.strTags || meal?.strMeal}></img>
          </div>
          <div className="dish-grid-item2 grid-item-containers small-box">
            <H1 text={'select your dish'}></H1>
            <Button onClick={() => GoToNextPage()} text={'Next'}></Button>
          </div>
          <div className="dish-grid-item3 grid-item-containers">
            <H1 text={meal?.strMeal}></H1>
            <Text>{meal?.strInstructions}</Text>
          </div>
          <Button onClick={() => setNewMeal()} text="Generate new meal" />
        </div>
      </div>
    </div>
  );
};

export default SelectDish;

import dayjs from 'dayjs';
import { findOrder, getEmailParam, missingOrder } from '../utils';
import { MissingOrder, NavBar, H1 } from '../components';
import Text from '../styled-components/Text';

const DRINK_COST = 1000;
const MEAL_COST = 2500;

const ReceiptScreen = () => {
  const order = findOrder(getEmailParam());

  const renderMeals = () => {
    const meals = [];
    for (let i = 0; i < order.personCount; i++) {
      meals.push(
        <Text key={i}>
          {order.meal.strMeal} at {MEAL_COST} isk.
        </Text>
      );
    }
    return meals;
  };

  if (missingOrder()) return <MissingOrder />;

  return (
    <div>
      <NavBar page="receipt" />
      <div className="receipt-container">
        {' '}
        <H1 text={'meal'}></H1>
        {renderMeals()}
        <H1 text={'drinks'}></H1>
        {order.drinks.map((item, index) => (
          <Text key={index}>
            {item.name} at {DRINK_COST} isk.
          </Text>
        ))}
        <H1 text={'order'}></H1>
        <Text>People count: {order.personCount}</Text>
        <Text>Date: {dayjs(order.selectedDate).format('MMMM D, YYYY, HH:mm')}</Text>
        <Text>Email: {order.email}</Text>
        <H1 text={'total'}></H1>
        <Text>{order.personCount * MEAL_COST + order.drinks.length * DRINK_COST + ' kr.'}</Text>
      </div>
    </div>
  );
};

export default ReceiptScreen;

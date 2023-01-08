import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Button, MissingOrder, H1, NavBar } from '../components';
import { getEmailParam, findOrder, updateOrder, addOrder, missingOrder } from '../utils';
import { useNavigate } from 'react-router-dom';

const OrderScreen = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [personCount, setPersonCount] = useState(1);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (getEmailParam()) {
      const order = findOrder(getEmailParam());

      setSelectedDate(new Date(order.selectedDate));

      setPersonCount(order.personCount);
      setEmail(order.email);
    }
  }, []);

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const isBefore = (date) => {
    return new Date(date) >= new Date().setHours(0, 0, 0, 0);
  };

  const filterTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return (
      currentDate.getTime() < selectedDate.getTime() &&
      selectedDate.getHours() >= 16 &&
      selectedDate.getHours() < 23
    );
  };

  const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const finishOrder = () => {
    if (selectedDate < new Date()) {
      alert('Please select a date in the future');
      return;
    }
    if (!isEmail(email)) {
      alert('Please enter a valid email');
      return;
    }
    if (getEmailParam()) {
      const order = findOrder(getEmailParam());
      order.selectedDate = selectedDate;
      order.personCount = personCount;
      order.email = email;
      updateOrder(getEmailParam(), order);
    } else {
      addOrder(email, personCount, selectedDate);
    }
    navigate('/receipt?email=' + email);
  };

  if (missingOrder()) return <MissingOrder />;
  return (
    <div>
      <NavBar page="order" />
      <div className="order-container">
        <div className="order-grid-container">
          <div className="order-grid-item1 grid-item-containers">
            <DatePicker
              inline
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              filterDate={(date) => isWeekday(date) && isBefore(date)}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="d/MM/yy HH:mm"
              filterTime={filterTime}
            />

            <div className="ordering-div">
              <H1 text={'how many people?'}></H1>
              <div className="person-count-div">
                <Button
                  text={'-'}
                  onClick={() => personCount > 1 && setPersonCount(personCount - 1)}></Button>
                <p>{personCount}</p>
                <Button
                  text={'+'}
                  onClick={() => personCount < 10 && setPersonCount(personCount + 1)}></Button>
              </div>
              <div>
                <form>
                  <label htmlFor="email">Enter your email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>

          <div className="order-grid-item2 grid-item-containers small-box">
            <div className="flexing">
              <div className="text-in-small-box">
                {' '}
                <H1 text={'finish your order'}></H1>
              </div>
              <div className="button-in-small-box">
                <Button onClick={() => finishOrder()} text="next" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;

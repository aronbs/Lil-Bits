import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import SelectDish from './pages/SelectDish';
import SelectDrinks from './pages/SelectDrinks';
import OrderScreen from './pages/OrderScreen';
import ReceiptScreen from './pages/ReceiptScreen';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Outlet />
      <Router>
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/dish" exact element={<SelectDish />} />
          <Route path="/drinks" exact element={<SelectDrinks />} />
          <Route path="/order" exact element={<OrderScreen />} />
          <Route path="/receipt" exact element={<ReceiptScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

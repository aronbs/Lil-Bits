import { Link } from 'react-router-dom';
import { getEmailParam, hasOrder } from '../utils';
import image from '../images/logo.png';
import { H1 } from './';

const shouldRenderStepper = (page) => {
  console.log(page);
  if (hasOrder()) {
    return ['dish', 'drinks', 'order', 'receipt'];
  }
  switch (page) {
    case 'home': {
      return [];
    }
    case 'dish': {
      return ['dish'];
    }
    case 'drinks': {
      return ['dish', 'drinks'];
    }
    case 'order': {
      return ['dish', 'drinks', 'order'];
    }
    case 'receipt': {
      return ['dish', 'drinks', 'order', 'receipt'];
    }
  }
};

export const NavBar = ({ page = 'home' }) => {
  const email = getEmailParam();
  console.log(shouldRenderStepper(page));
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
      <img style={{ width: 100, height: 100 }} src={image}></img>
      <div
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'row'
        }}>
        <Link to="/">
          <H1 text={'Home'} className="navItem"></H1>
        </Link>
      </div>

      {shouldRenderStepper(page).includes('dish') && (
        <div style={{ padding: 20 }}>
          <Link to={email ? `/dish?email=${email}` : '/dish'}>
            <H1 text={'Dish'} className="navItem"></H1>
          </Link>
        </div>
      )}
      {shouldRenderStepper(page).includes('drinks') && (
        <div style={{ padding: 20 }}>
          <Link to={email ? `/drinks?email=${email}` : '/drinks'}>
            <H1 text={'drinks'} className="navItem"></H1>
          </Link>
        </div>
      )}
      {shouldRenderStepper(page).includes('order') && (
        <div style={{ padding: 20 }}>
          <Link to={email ? `/order?email=${email}` : '/order'}>
            <H1 text={'order'} className="navItem"></H1>
          </Link>
        </div>
      )}
      {shouldRenderStepper(page).includes('receipt') && (
        <div style={{ padding: 20 }}>
          <Link to={email ? `/receipt?email=${email}` : '/receipt'}>
            <H1 text={'receipt'} className="navItem"></H1>
          </Link>
        </div>
      )}
    </div>
  );
};

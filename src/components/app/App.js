import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import data from '../../utils/data';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import { ingredientPropTypes } from '../../utils/constants';


export default function App() {

  const [menuData, setMenuData] = React.useState(null);
  const [inConstructor, setInConstructor] = React.useState(null)

  React.useEffect(() => {
    setMenuData(data.reduce((prevItem, item) => {
      if(!prevItem[item.type]){
        prevItem[item.type] = [item];
      } else {
        prevItem[item.type].push(item);
      }
      
      return prevItem;

    }, {}))

    setInConstructor(data)
    
  }, []);

  return (
    <>
      <AppHeader />
      <main className='content'>
        {menuData &&
        (<>
        <BurgerIngredients data={menuData} />
        <BurgerConstructor data={inConstructor} />
        </>)}
      </main>
    </>
  )
}


BurgerIngredients.propTypes = {
  data: PropTypes.objectOf(PropTypes.arrayOf(ingredientPropTypes.isRequired))
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired)
}
import React from 'react';
import './App.css';
import data from '../../utils/data';
import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';

function App() {

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
        <BurgerIngredients data={menuData}/>
        <BurgerConstructor data={inConstructor}/>
      </main>
    </>
  )
}

export default App;

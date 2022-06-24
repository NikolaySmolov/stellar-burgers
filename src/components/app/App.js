import React from 'react';
import styles from './app.module.css';
import data from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';



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
      <main className={styles.content}>
        {menuData &&
        (<>
        <BurgerIngredients data={menuData} />
        <BurgerConstructor data={inConstructor} />
        </>)}
      </main>
    </>
  )
}
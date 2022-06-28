import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { API } from '../../utils/constants';


export default function App() {
  const [appData, setAppData] = React.useState({data: [], loading: true})
  const [menuData, setMenuData] = React.useState(null);
  const [inConstructor, setInConstructor] = React.useState(null)

  React.useEffect(() => {

    const getData = async () => {
      
      try {
        const res = await fetch(API);
        const data = await res.json();
        setAppData({...data, loading: true});
  
        setMenuData(data.data.reduce((prev, curr) => {
          if (!prev[curr.type]) {
            prev[curr.type] = [curr];
          } else {
            prev[curr.type].push(curr);
          }
          return prev;
        }, {}));
  
        setInConstructor(data.data);
  
        setAppData(appData => ({...appData, loading: false}));
  
      } catch (err){
        setAppData(appData => ({...appData, loading: false, success: false}));
        console.log(err);
      }

    }
  
    getData();

  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        { appData.success &&
        (<>
          <BurgerIngredients data={menuData} />
          <BurgerConstructor data={inConstructor} />
        </>)
        }
      </main>
    </>
  )
}
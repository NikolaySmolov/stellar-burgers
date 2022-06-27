import React from 'react';
import styles from './app.module.css';
import data from '../../utils/data';
import { API } from '../../utils/constants';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';



export default function App() {
  const [data, setData] = React.useState({data: [], loading: false, success: false})
  const [menuData, setMenuData] = React.useState(null);
  const [inConstructor, setInConstructor] = React.useState(null)

  React.useEffect(() => {

    const getData = async () => {
      try {
        setData({...data, loading: true})
        const res = await fetch(API);
        const newData = await res.json();
        debugger
        setData({...newData, loading: false})
      } catch(err) {
        console.log(err)
      }
    }

    getData()

    // fetch(API)
    // .then(res => res.json())
    // .then(data => {
    //   setData({...data, loading: false});
    //   setMenuData(data.data.reduce((prevItem, item) => {
    //     if(!prevItem[item.type]){
    //       prevItem[item.type] = [item];
    //     } else {
    //       prevItem[item.type].push(item);
    //     }
        
    //     return prevItem;
  
    //   }, {}))
  
    //   setInConstructor(data.data)
    // })
    // .catch(e => {
    //   console.log(e)
    // })

  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        {data.success &&
        (<>
        <BurgerIngredients data={menuData} />
        <BurgerConstructor data={inConstructor} />
        </>)}
      </main>
    </>
  )
}

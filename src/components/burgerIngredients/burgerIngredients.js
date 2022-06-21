import React from 'react';
import styles from './burgerIngredients.module.css';
import TabBar from '../tabBar/tabBar';
import Ingredient from '../ingredient/ingredient';
import data from '../../utils/data';


export default function BuregerIngredients() {

  const menu = { bun: [], main: [], sauce: [] }
  data.forEach(item => menu[item.type].push(item))

  return (
    <section>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <TabBar />
      <ul className={`${styles.menu} custom-scroll`}>
        <li className={styles.section}>
          <h2 className='text text_type_main-medium mb-6 mt-10'>Булки</h2>
          <ul className={`${styles.ingredients} ml-4 mr-2 mb-10`}>
            {menu.bun.map(item => (
              <Ingredient key={item._id} name={item.name} image={item.image} price={item.price} />
            ))}
          </ul>
        </li>
        <li className={styles.section}>
          <h2 className='text text_type_main-medium mb-6'>Соусы</h2>
          <ul className={`${styles.ingredients} ml-4 mr-2 mb-10`}>
            {menu.sauce.map(item => (
              <Ingredient key={item._id} name={item.name} image={item.image} price={item.price} />
            ))}
          </ul>
        </li>
        <li className={styles.section}>
          <h2 className='text text_type_main-medium mb-6'>Начинка</h2>
          <ul className={`${styles.ingredients} ml-4 mr-2 mb-10`}>
            {menu.main.map(item => (
              <Ingredient key={item._id} name={item.name} image={item.image} price={item.price} />
            ))}
          </ul>
        </li>
      </ul>
    </section>
  )
}
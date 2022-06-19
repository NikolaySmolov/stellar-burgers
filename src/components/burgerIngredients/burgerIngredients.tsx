import React from 'react';
import styles from './burgerIngredients.module.css';
import TabBar from '../tabBar/tabBar';
import Ingredient from '../ingredient/ingredient';
import data from '../../utils/data';


export default function BuregerIngredients() {

  return (
    <section className='mt-10'>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <TabBar />
      <section>
        <h2 className='text text_type_main-medium mt-10 mb-6'>Булки</h2>
        <ul className={`${styles.ingredients} ml-4 mr-4`}>
          <li className={styles.item}> <Ingredient/> </li>
          <li className={styles.item}> <Ingredient/> </li> {/* ingredient mount from array, object contains type */}
        </ul>
      </section>
      <h2 className='text text_type_main-medium mt-10 mb-6'>Соусы</h2>
      <h2 className='text text_type_main-medium mt-10 mb-6'>Начинка</h2>
    </section>
  )
}
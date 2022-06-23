import React from 'react';
import styles from './ingredientsSection.module.css';
import Ingredient from '../ingredient/ingredient';




export default function IngredientsSection({menuSection, data}) {
  return (
    <li className={styles.section}>
      <h2 className='text text_type_main-medium mb-6 mt-10'>{menuSection}</h2>
      <ul className={`${styles.ingredients} ml-4 mr-2 mb-10`}>
        {data.map(item => (
          <Ingredient key={item._id} name={item.name} image={item.image} price={item.price} />
        ))}
      </ul>
    </li>
  )
}
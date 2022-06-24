import React from 'react';
import PropTypes from 'prop-types';
import styles from './burgerIngredients.module.css';
import TabBar from '../tabBar/tabBar';
import IngredientsSection from '../ingredientsSection/ingredientsSection';
import { ingredientPropTypes } from '../../utils/constants';



export default function BurgerIngredients({data}) {

  return (
    <section>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <TabBar />
        <ul className={`${styles.menu} custom-scroll`}>
          <IngredientsSection menuSection='Булки' data={data.bun} />
          <IngredientsSection menuSection='Соусы' data={data.sauce} />
          <IngredientsSection menuSection='Начинки' data={data.main} />
        </ul>
    </section>
  )
}

IngredientsSection.propTypes = {
  menuSection: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired
}
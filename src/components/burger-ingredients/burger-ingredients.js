import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import TabBar from '../tab-bar/tab-bar';
import IngredientsSection from '../ingredients-section/ingredients-section';
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

BurgerIngredients.propTypes = {
  data: PropTypes.objectOf(PropTypes.arrayOf(ingredientPropTypes.isRequired))
}
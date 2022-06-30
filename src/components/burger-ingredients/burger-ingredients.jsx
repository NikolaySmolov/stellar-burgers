import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import TabBar from '../tab-bar/tab-bar';
import IngredientsSection from '../ingredients-section/ingredients-section';
import { ingredientPropTypes } from '../../utils/constants';



export default function BurgerIngredients({ingredients}) {

  const bunSection = React.useRef(null);
  const sauceSection = React.useRef(null);
  const mainSection = React.useRef(null);

  return (
    <section>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <TabBar bunSectionRef={bunSection} sauceSectionRef={sauceSection} mainSectionRef={mainSection} />
        <ul className={`${styles.menu} custom-scroll`}>
          <IngredientsSection menuSection='Булки' data={ingredients.bun} scrollToRef={bunSection} />
          <IngredientsSection menuSection='Соусы' data={ingredients.sauce} scrollToRef={sauceSection} />
          <IngredientsSection menuSection='Начинки' data={ingredients.main} scrollToRef={mainSection} />
        </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.objectOf(PropTypes.arrayOf(ingredientPropTypes.isRequired))
}
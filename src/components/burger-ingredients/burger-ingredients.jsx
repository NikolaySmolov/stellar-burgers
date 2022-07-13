import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import TabBar from '../tab-bar/tab-bar';
import IngredientsSection from '../ingredients-section/ingredients-section';
import { ingredientPropTypes } from '../../utils/constants';

export default function BurgerIngredients({ ingredients }) {
  const bunSection = React.useRef(null);
  const sauceSection = React.useRef(null);
  const mainSection = React.useRef(null);

  const content = React.useMemo(() => {
    const buns = [];
    const sauces = [];
    const main = [];

    ingredients.forEach((ingredient) => {
      switch (ingredient.type) {
        case 'bun':
          buns.push(ingredient);
          break;
        case 'sauce':
          sauces.push(ingredient);
          break;
        case 'main':
          main.push(ingredient);
          break;
        default:
          return;
      }
    });

    return (
      <>
        <IngredientsSection menuSection="Булки" data={buns} ref={bunSection} />
        <IngredientsSection menuSection="Соусы" data={sauces} ref={sauceSection} />
        <IngredientsSection menuSection="Начинки" data={main} ref={mainSection} />
      </>
    );
  }, [ingredients]);

  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <TabBar
        bunSectionRef={bunSection}
        sauceSectionRef={sauceSection}
        mainSectionRef={mainSection}
      />
      <ul className={`${styles.menu} custom-scroll`}>{content}</ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired),
};

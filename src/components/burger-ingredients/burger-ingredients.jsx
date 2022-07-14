import React from 'react';
import styles from './burger-ingredients.module.css';
import TabBar from '../tab-bar/tab-bar';
import IngredientsSection from '../ingredients-section/ingredients-section';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { modalStateReducer, modalInitialState } from './utils';
import { OPEN, CLOSE } from '../../utils/constants';
import { BurgerContext } from '../../services/burger-context';

export default function BurgerIngredients() {
  const ingredients = React.useContext(BurgerContext);

  const [modalState, modalDispatcher] = React.useReducer(modalStateReducer, modalInitialState);

  const handleCloseModal = () => {
    modalDispatcher({ type: CLOSE });
  };

  const handleOpenModal = (details) => {
    modalDispatcher({ type: OPEN, payload: details });
  };

  const modal = modalState.details ? (
    <Modal onClose={handleCloseModal}>
      <IngredientDetails {...modalState.details} />
    </Modal>
  ) : null;

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
        <IngredientsSection
          menuSection="Булки"
          handleShowDetails={handleOpenModal}
          data={buns}
          ref={bunSection}
        />
        <IngredientsSection
          menuSection="Соусы"
          handleShowDetails={handleOpenModal}
          data={sauces}
          ref={sauceSection}
        />
        <IngredientsSection
          menuSection="Начинки"
          handleShowDetails={handleOpenModal}
          data={main}
          ref={mainSection}
        />
      </>
    );
  }, [ingredients]);

  return (
    <>
      <section>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <TabBar
          bunSectionRef={bunSection}
          sauceSectionRef={sauceSection}
          mainSectionRef={mainSection}
        />
        <ul className={`${styles.menu} custom-scroll`}>{content}</ul>
      </section>
      {modal}
    </>
  );
}

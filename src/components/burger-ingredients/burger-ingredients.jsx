import React from 'react';
import styles from './burger-ingredients.module.css';
import { TabBar } from '../tab-bar/tab-bar';
import IngredientsSection from '../ingredients-section/ingredients-section';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { modalStateReducer, modalInitialState } from './utils';
import { OPEN, CLOSE } from '../../utils/constants';
import { BurgerContext } from '../../services/burger-context';

export default function BurgerIngredients() {
  const [modalState, modalDispatcher] = React.useReducer(modalStateReducer, modalInitialState);
  const { burgerContext } = React.useContext(BurgerContext);
  const [currentTab, setCurrentTab] = React.useState('buns');

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

  const bunHeading = React.useRef(null);
  const saucesHeading = React.useRef(null);
  const mainHeading = React.useRef(null);

  const followTabs = () => {
    const saucesHeadingBox = saucesHeading.current.getBoundingClientRect();
    const mainHeadingBox = mainHeading.current.getBoundingClientRect();

    if (saucesHeadingBox.y < 275 && mainHeadingBox.y > 275 && currentTab !== 'sauces') {
      setCurrentTab('sauces');
    } else if (mainHeadingBox.y < 275 && currentTab !== 'main') {
      setCurrentTab('filling');
    } else if (saucesHeadingBox.y > 275 && currentTab !== 'buns') {
      setCurrentTab('buns');
    }
  };

  const content = React.useMemo(() => {
    const buns = [];
    const sauces = [];
    const main = [];

    burgerContext.ingredients.forEach((ingredient) => {
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
          ref={bunHeading}
        />
        <IngredientsSection
          headingRef={saucesHeading}
          menuSection="Соусы"
          handleShowDetails={handleOpenModal}
          data={sauces}
          ref={saucesHeading}
        />
        <IngredientsSection
          headingRef={mainHeading}
          menuSection="Начинки"
          handleShowDetails={handleOpenModal}
          data={main}
          ref={mainHeading}
        />
      </>
    );
  }, [burgerContext]);

  return (
    <>
      <section>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <TabBar
          bunSectionRef={bunHeading}
          sauceSectionRef={saucesHeading}
          mainSectionRef={mainHeading}
          currentTab={currentTab}
        />
        <ul onScroll={followTabs} className={`${styles.menu} custom-scroll`}>
          {content}
        </ul>
      </section>
      {modal}
    </>
  );
}

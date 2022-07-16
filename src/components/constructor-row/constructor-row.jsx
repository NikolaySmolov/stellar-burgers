import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes, SUBTRUCT } from '../../utils/constants';
import styles from './constructor-row.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContext } from '../../services/burger-context';

export default function ConstructorRow({ isBun = false, type, data }) {
  const { burgerContextDispatcher } = React.useContext(BurgerContext);

  const handleDelete = React.useCallback(() => {
    burgerContextDispatcher({ type: SUBTRUCT, payload: data });
  }, [data, burgerContextDispatcher]);

  return isBun ? (
    <div className={`${styles.bun} pl-4 pr-4`}>
      <ConstructorElement
        type={type}
        text={`${data.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
        price={data.price}
        thumbnail={data.image}
        isLocked="true"
      />
    </div>
  ) : (
    <li className={`${styles.ingredient} mt-4 mb-4`}>
      <DragIcon />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={handleDelete}
      />
    </li>
  );
}

ConstructorRow.propTypes = {
  isBun: PropTypes.bool,
  type: PropTypes.string,
  data: ingredientPropTypes.isRequired,
};

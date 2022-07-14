import PropTypes from 'prop-types';

export const API = 'https://norma.nomoreparties.space/api';

export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  proteins: PropTypes.number,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
});

export const ingredientDetails = PropTypes.shape({
  name: PropTypes.string,
  image_large: PropTypes.string,
  price: PropTypes.number,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
});

export const ADD_BUN = 'addBun';
export const ADD_FILLING = 'addFilling';
export const REMOVE_FILLING = 'removeFilling';
export const SUM = 'sum';
export const SUBTRUCT = 'subtruct';
export const OPEN = 'open';
export const CLOSE = 'close';

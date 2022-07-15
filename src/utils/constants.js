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
  handleShowDetails: PropTypes.func,
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

export const SUM = 'sum';
export const ADD = 'add';
export const SUBTRUCT = 'subtruct';
export const OPEN = 'open';
export const CLOSE = 'close';

export const BUN = 'bun';

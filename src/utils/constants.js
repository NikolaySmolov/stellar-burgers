import PropTypes from 'prop-types';

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
export const SUM = 'sum';
export const SUBTRUCT = 'subtruct';

export const API = 'https://norma.nomoreparties.space/api/ingredients';

export const API_POST = 'https://norma.nomoreparties.space/api';

export const getIngredients = async () => {
  try {
    const res = await fetch(`${API}/ingredients`);
    if (!res.ok) throw new Error(`res.ok: ${res.ok}, res.status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const submitOrder = async (order) => {
  const res = await fetch(`${API_POST}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  if (!res.ok) return Promise.reject(`res.ok: ${res.ok}, res.status: ${res.status}`);
  const data = await res.json();
  return data;
};

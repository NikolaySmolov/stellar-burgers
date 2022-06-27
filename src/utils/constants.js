import PropTypes from 'prop-types';

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string
})

const API = 'https://norma.nomoreparties.space/api/ingredients';

export { ingredientPropTypes, API }
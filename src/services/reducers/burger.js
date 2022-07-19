import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
} from '../actions/burger';

const initialState = {
  ingredients: [],
  constructor: [],
  constructorTempId: 1e4,
  ingredientDetails: {},
  modal: false,
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

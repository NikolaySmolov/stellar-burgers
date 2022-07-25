import { BUN } from '../../utils/constants';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT,
  DECREASE_INGREDIENT,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  SORT_INGREDIENT,
} from '../actions/burger';

const initialState = {
  ingredients: [],
  ingredientsRequest: true,
  ingredientsFailed: false,
  constructor: { bun: [], filling: [] },
  ingredientDetails: null,
  showModal: false,
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, ingredientsRequest: true };
    case GET_INGREDIENTS_SUCCESS:
      return { ...state, ingredientsRequest: false, ingredients: action.data.map(appendQuantity) };
    case GET_INGREDIENTS_FAILED:
      return { ...state, ingredientsRequest: false, ingredientsFailed: true };
    case INCREASE_INGREDIENT:
      const increasedIngredients = [...state.ingredients];
      const increasedConstructor = { ...state.constructor };

      const draggableItem = increasedIngredients.find(ing => ing._id === action.itemId);

      if (draggableItem.type === BUN) {
        increasedConstructor.bun[0] = draggableItem;
        increasedIngredients.forEach(ing => (ing.type === BUN ? (ing.qty = 0) : null));
      } else {
        increasedConstructor.filling.push(draggableItem);
      }

      draggableItem.qty++;

      return {
        ...state,
        ingredients: increasedIngredients,
        constructor: increasedConstructor,
      };

    case DECREASE_INGREDIENT:
      const decreasedIngredients = [...state.ingredients];
      const decreasableItem = decreasedIngredients.find(ing => ing._id === action.payload.itemId);
      decreasableItem.qty--;

      const decreasedConstructor = state.constructor.filling.filter(
        (_, index) => index !== action.payload.itemPos
      );

      return {
        ...state,
        ingredients: decreasedIngredients,
        constructor: { ...state.constructor, filling: decreasedConstructor },
      };
    case OPEN_INGREDIENT_DETAILS:
      return { ...state, ingredientDetails: action.ingredient, showModal: true };
    case CLOSE_INGREDIENT_DETAILS:
      return { ...state, ingredientDetails: null, showModal: false };
    case SORT_INGREDIENT:
      return state;
    default:
      return state;
  }
};

const appendQuantity = item => {
  item.qty = 0;
  return item;
};

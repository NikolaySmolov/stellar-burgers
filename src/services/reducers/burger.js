import { BUN, FILLING } from '../../utils/constants';
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
  ingredientsRequest: false,
  ingredientsFailed: false,
  constructor: [],
  constructorTempId: 1e4,
  ingredientDetails: {},
  modal: false,
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
      debugger;
      return {
        ...state,
        constructorTempId: ++state.constructorTempId,
        ...increaseQty(
          action.ingredient,
          state.ingredients,
          state.constructor,
          state.constructorTempId
        ),
      };
    default:
      return state;
  }
};

const appendQuantity = item => {
  item.qty = 0;
  return item;
};

const findIngredientIndex = ing => item => item._id === ing._id;

const increaseQty = (ing, ingrArr, construcArr, tempId) => {
  const item = { ...ing };
  const ingredients = [...ingrArr];
  const constructor = [...construcArr];

  const itemIndex = ingredients.findIndex(findIngredientIndex(item));
  ingredients[itemIndex].qty++;

  item.tempId = tempId;

  if (item.type === BUN) {
    const bunIndex = constructor.findIndex(item => item.type === BUN);
    const includesBun = ~bunIndex;
    includesBun ? (constructor[bunIndex] = item) : constructor.push(item);
  } else {
    constructor.push(item);
  }

  return { ingredients, constructor };
};

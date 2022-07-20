import { BUN } from '../../utils/constants';
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
  ingredientsRequest: true,
  ingredientsFailed: false,
  constructor: [],
  constructorTempId: 1e4,
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
    case DECREASE_INGREDIENT:
      return {
        ...state,
        ...decreaseQty(action.ingredient, state.ingredients, state.constructor),
      };
    case OPEN_INGREDIENT_DETAILS:
      return { ...state, ingredientDetails: action.ingredient, showModal: true };
    case CLOSE_INGREDIENT_DETAILS:
      return { ...state, ingredientDetails: null, showModal: false };
    default:
      return state;
  }
};

const appendQuantity = (item) => {
  item.qty = 0;
  return item;
};

const findIngredientIndex = (ing, array) => array.findIndex((item) => item._id === ing._id);

const increaseQty = (ing, ingrArr, construcArr, tempId) => {
  const item = { ...ing };
  const ingredients = [...ingrArr];
  const constructor = [...construcArr];

  item.tempId = tempId;

  const bunIndex = constructor.findIndex((item) => item.type === BUN);
  const bunInConstructor = ~bunIndex;

  if (item.type === BUN && bunInConstructor) {
    ingredients.forEach(resetQty(BUN));
    constructor[bunIndex] = item;
  } else {
    constructor.push(item);
  }

  const itemIndex = findIngredientIndex(item, ingredients);

  ingredients[itemIndex].qty++;

  return { ingredients, constructor };
};

const resetQty = (itemType) => (item) => item.type === itemType && (item.qty = 0);

const decreaseQty = (ing, ingArr, construcArr) => {
  const item = ing;
  const ingredients = [...ingArr];
  const constructor = construcArr.filter((listItem) => listItem.tempId !== item.tempId);

  const itemIndex = findIngredientIndex(item, ingredients);
  ingredients[itemIndex].qty--;

  return { ingredients, constructor };
};

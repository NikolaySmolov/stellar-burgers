import { SUBTRUCT, BUN, FILLING } from '../../utils/constants';

export const burgerContextInitState = null;

export const findIndex = (arr, id) => {
  return arr.findIndex((item) => item._id === id);
};

function createConstructorItem(item, idCounter) {
  const constructorItem = { ...item };
  return (constructorItem.tempId = idCounter);
}

export const burgerContextReducer = (state, action) => {
  let newState, index, constructorItem;

  switch (action.type) {
    case 'init':
      newState = { ingredients: [], tempIdCount: 1e4, inConstructor: { bun: [], filling: [] } };

      newState.ingredients = action.payload.map((item) => {
        item.count = 0;
        return item;
      });

      return newState;

    case BUN:
      newState = { ...state };
      newState.ingredients.forEach((item) => {
        if (item.type === BUN && item._id === action.payload._id) {
          item.count = 1;
        } else if (item.type === BUN) {
          item.count = 0;
        }
      });

      ++newState.tempIdCount;

      newState.inConstructor.bun = [createConstructorItem(action.payload, newState.tempIdCount)];

      return newState;
    case FILLING:
      newState = { ...state };
      index = findIndex(newState.ingredients, action.payload._id);
      newState.ingredients[index].count++;

      constructorItem = { ...action.payload };
      constructorItem.tempId = ++newState.tempIdCount;

      newState.inConstructor.filling = [...newState.inConstructor.filling, action.payload];
      return newState;
    case SUBTRUCT:
      newState = [...state];
      index = findIndex(newState, action.payload._id);
      newState[index].count--;
      return newState;
    default:
      return state;
  }
};

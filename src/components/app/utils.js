import { SUBTRUCT, BUN, FILLING } from '../../utils/constants';

export const burgerContextInitState = null;

export const findIndex = (arr, id) => {
  return arr.findIndex(item => item._id === id);
};

function createConstructorItem(item, tempId) {
  const constructorItem = { ...item };
  constructorItem.tempId = tempId;
  return constructorItem;
}

export const burgerContextReducer = (state, action) => {
  let newState, index;

  switch (action.type) {
    case 'init':
      newState = { ingredients: [], tempIdCount: 1e4, inConstructor: { bun: [], filling: [] } };

      newState.ingredients = action.payload.map(item => {
        item.qnty = 0;
        return item;
      });

      return newState;

    case BUN:
      newState = { ...state };
      newState.ingredients.forEach(item => {
        if (item.type === BUN && item._id === action.payload._id) {
          item.qnty = 1;
        } else if (item.type === BUN) {
          item.qnty = 0;
        }
      });

      ++newState.tempIdCount;

      newState.inConstructor.bun = [createConstructorItem(action.payload, newState.tempIdCount)];

      return newState;
    case FILLING:
      newState = { ...state };
      index = findIndex(newState.ingredients, action.payload._id);
      newState.ingredients[index].qnty++;

      ++newState.tempIdCount;

      newState.inConstructor.filling = [
        ...newState.inConstructor.filling,
        createConstructorItem(action.payload, newState.tempIdCount),
      ];
      return newState;
    case SUBTRUCT:
      newState = { ...state };
      index = findIndex(newState.ingredients, action.payload._id);
      newState.ingredients[index].qnty--;

      action.payload.type === BUN
        ? (newState.inConstructor.bun = [])
        : (newState.inConstructor.filling = newState.inConstructor.filling.filter(
            item => item.tempId !== action.payload.tempId
          ));
      return newState;
    default:
      return state;
  }
};

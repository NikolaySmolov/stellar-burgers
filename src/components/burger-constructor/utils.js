import { ADD, SUBTRUCT, BUN } from '../../utils/constants';

export const constructorInitialState = [];

export const findBun = () => {
  return ing => {
    return ing.type ? ing.type === BUN : false;
  };
};

export const constructorReducer = (state, action) => {
  const indexBun = state.findIndex(findBun);
  const includesBun = ~indexBun;

  switch (action.type) {
    case 'testInit':
      return action.payload;
    case ADD:
      return includesBun
        ? [...state].splice(indexBun, 1, action.payload)
        : [...state].push(action.payload);
    case SUBTRUCT:
      alert('Hello handle SUBTRUCT ingredient');
      break;
    default:
      return state;
  }
};

import { SUM, SUBTRUCT } from '../../utils/constants';

import { ADD_BUN, ADD_FILLING } from '../../utils/constants';

export const constructorInitialState = { bun: null, filling: null };

export const constructorReducer = (state, action) => {
  switch (action.type) {
    case ADD_BUN:
      return { ...state, bun: action.payload };
    case ADD_FILLING:
      return state.filling
        ? { ...state, filling: [...state.filling].concat(action.payload) }
        : { ...state, filling: action.payload };
    default:
      return state;
  }
};

export const totalPriceReducer = (state, action) => {
  if (!action.payload) return state;
  const price = action.payload.type === 'bun' ? action.payload.price * 2 : action.payload.price;
  switch (action.type) {
    case SUM:
      return (state += price);
    case SUBTRUCT:
      return (state -= price);
    default:
      return state;
  }
};

export const totalPriceInitialState = 0;

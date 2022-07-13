import { SUM, SUBTRUCT } from '../../utils/constants';

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

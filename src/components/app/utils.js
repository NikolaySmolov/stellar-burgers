import { ADD_BUN, ADD_FILLING } from '../../utils/constants';

export const constructorReducer = (state, action) => {
  switch (action.type) {
    case ADD_BUN:
      return { ...state, bun: action.payload };
    case ADD_FILLING:
      return { ...state, filling: [...state.filling].concat(action.payload) };
    default:
      return state;
  }
};

export const constructorInitialState = {
  bun: {},
  filling: [],
};

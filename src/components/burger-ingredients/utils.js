import { OPEN, CLOSE } from '../../utils/constants';

export const modalInitialState = { details: null };

export const modalStateReducer = (state, action) => {
  switch (action.type) {
    case OPEN:
      return { details: action.payload };
    case CLOSE:
      return modalInitialState;
    default:
      return modalInitialState;
  }
};

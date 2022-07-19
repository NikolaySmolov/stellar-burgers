import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS,
} from '../actions/order';

const initialState = {
  order: {},
  orderRequest: false,
  orderFailed: false,
  modal: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

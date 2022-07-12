export const constructorReducer = (state, action) => {
  switch (action.type) {
    case 'addBun':
      return { ...state, bun: action.payload };
    case 'addFilling':
      return { ...state, filling: action.payload };
    default:
      return state;
  }
};

export const constructorInitialState = {
  bun: {},
  filling: [],
};

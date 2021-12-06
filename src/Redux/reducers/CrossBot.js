/* eslint-disable default-case */
const isCrossedReducer = (state = true, action) => {
  switch (action.type) {
    case 'cross':
      return (state = !state);
    default:
      return state;
  }
};
export default isCrossedReducer;

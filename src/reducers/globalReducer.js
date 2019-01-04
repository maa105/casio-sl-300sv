/**
 * tracks window size for responsive calculator
 */
const globalReducer = (state = {
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth
}, action) => {
  switch (action.type) {
    case 'RESIZE_WINDOW':
      return {
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
      };
    default:
      return state;
  }
};

export default globalReducer;

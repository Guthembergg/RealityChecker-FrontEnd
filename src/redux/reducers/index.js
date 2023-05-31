const initialState = {
  myProfile: {},
  randomAdd: "",
  randomDel: "",
  randomMod: "",
};

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MY_PROFILE":
      return { ...state, myProfile: action.payload };
    case "ADDED_DREAM":
      return { ...state, randomAdd: action.payload };
    case "MODIFIED_DREAM":
      return { ...state, randomMod: action.payload };
    case "DELETED_DREAM":
      return { ...state, randomDel: action.payload };
    default:
      return state;
  }
};

export default MainReducer;

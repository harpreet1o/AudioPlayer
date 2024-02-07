export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_Albums: "SET_ALL_Albums",
  SET_ALL_Songs: "SET_ALL_Songs",
  SET_ALL_Artists: "SET_ALL_Artists",
};
// there is a little case issue so be careful the user and all user are all uppercase but the other are diffrent
//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };
    case actionType.SET_ALL_Albums:
      return {
        ...state,
        allAlbums: action.allAlbums,
      };
    case actionType.SET_ALL_Artists:
      return {
        ...state,
        allArtists: action.allArtists,
      };
    case actionType.SET_ALL_Songs:
      return {
        ...state,
        allSongs: action.allSongs,
      };

    default:
      return state;
  }
};

export default reducer;

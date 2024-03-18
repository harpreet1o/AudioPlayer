export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_Albums: "SET_ALL_Albums",
  SET_ALL_Songs: "SET_ALL_Songs",
  SET_ALL_Artists: "SET_ALL_Artists",
  SET_FILTER_TERM: "SET_FIlTER_TERM",
  SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
  SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
  SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
  SET_ALERT: "SET_ALERT",
  SET_SONGPLAYING: "SET_SONGPLAYING",
  SET_SONGINDEX: "SET_SONGINDEX",
  SET_MINI_PLAYER: "SET_MINI_PLAYER",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
};
// there is a little case issue so be careful the user and all user are all uppercase but the other are diffrent
//reducer function
const reducer = (state, action) => {
  console.log(action);
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
    //filter cases
    case actionType.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };
    case actionType.SET_LANGUAGE_FILTER:
      return {
        ...state,
        languageFilter: action.languageFilter,
      };
    case actionType.SET_ALBUM_FILTER:
      return {
        ...state,
        albumFilter: action.albumFilter,
      };
    case actionType.SET_ARTIST_FILTER:
      return {
        ...state,
        artistFilter: action.artistFilter,
      };
    case actionType.SET_ALERT:
      return {
        ...state,
        alertType: action.alertType,
      };
    case actionType.SET_SONGINDEX:
      return {
        ...state,
        songIndex: action.songIndex,
      };
    case actionType.SET_SONGPLAYING:
      return {
        ...state,
        isSongPlaying: action.isSongPlaying,
      };
    case actionType.SET_MINI_PLAYER:
      return {
        ...state,
        MiniPlayer: action.MiniPlayer,
      };

    case actionType.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      };

    default:
      return state;
  }
};

export default reducer;

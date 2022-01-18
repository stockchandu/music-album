import { combineReducers, createStore } from "redux";
import { loginReducer } from "./authStore/reducer";
import { guestAlbumReducer } from "./guestalbumstore/reducer";
import { artistAlbumReducer } from "./artistalbumstore/reducer";
import { userReducer } from "./userstore/reducer";

const rootStore = combineReducers({
    login: loginReducer,
    guestAlbum: guestAlbumReducer,
    artistAlbum: artistAlbumReducer,
    user : userReducer
})


export const store = createStore(rootStore);
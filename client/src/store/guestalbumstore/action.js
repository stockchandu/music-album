import { GUESTALBUMLOADING, GUESTALBUMSUCCESS, GUESTALBUMERROR } from "./actionType";

export const guestAlbumLoading = (data) => ({ type: GUESTALBUMLOADING, payload: data });
export const guestAlbumSuccess = (data) => ({ type: GUESTALBUMSUCCESS, payload: data });
export const guestAlbumError = (data) => ({ type: GUESTALBUMERROR, payload: data });



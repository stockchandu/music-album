import { ARTISTALBUMLOAD, ARTISTALBUMSUCCESS, ARTISTALBUMERROR, ARTISTALBUMDELETE, GETARTISTALBUMDATA } from "./actionType";

export const artistAlbumLoad = (data) => ({ type: ARTISTALBUMLOAD, payload: data });
export const artistAlbumSuccess = (data) => ({ type: ARTISTALBUMSUCCESS, payload: data })
export const artistAlbumError = (data) => ({ type: ARTISTALBUMERROR, payload: data });
export const artistAlbumDelete = (data) => ({ type: ARTISTALBUMDELETE, payload: data });
export const getArtistAlbumData = (data) => ({ type: GETARTISTALBUMDATA, payload: data })
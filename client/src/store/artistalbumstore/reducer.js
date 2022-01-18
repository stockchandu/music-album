import { ARTISTALBUMLOAD, ARTISTALBUMSUCCESS, ARTISTALBUMERROR, ARTISTALBUMDELETE, GETARTISTALBUMDATA } from "./actionType";

const initState = {
    data: {
        loading: false,
        artistAlbumData: [],
        error: false
    }
}

export const artistAlbumReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case ARTISTALBUMLOAD:
            return {
                ...state,
                data: {
                    ...state.data,
                    loading: payload
                }
            }

        case ARTISTALBUMSUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    loading: false,
                    artistAlbumData: [...state.data.artistAlbumData, payload]
                }
            }

        case GETARTISTALBUMDATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    loading: false,
                    artistAlbumData: payload
                }
            }

        case ARTISTALBUMERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    loading: false,
                    error: true
                }
            }
        case ARTISTALBUMDELETE:
            return {
                ...state,
                data: {
                    ...state.data,
                    artistAlbumData: state.data.artistAlbumData.filter((ele) => ele._id !== payload)
                }
            }
        default:
            return {
                ...state
            }

    }
}
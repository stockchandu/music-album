import { GUESTALBUMLOADING, GUESTALBUMSUCCESS, GUESTALBUMERROR } from "./actionType";

const initState = {
    data: {
        loading: false,
        guestAlbum: [],
        error: false,
    }

}

export const guestAlbumReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GUESTALBUMLOADING:
            return {
                ...state.data,
                data: {
                    ...state.data.guestAlbum,
                    loading: payload,
                }
            }

        case GUESTALBUMSUCCESS:
            return {
                ...state.data,
                data: {
                    ...state.data.guestAlbum,
                    loading: false,
                    guestAlbum: payload

                }
            }

        case GUESTALBUMERROR:
            return {
                ...state.data,
                data: {
                    ...state.data.guestAlbum,
                    loading: false,
                    error: true
                }
            }


        default:
            return {
                ...state
            }
    }

}
import { USERDATA } from "./actionType"

const initState = {
    user: {}
}

export const userReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case USERDATA:
            return {
                ...state,
                user: { ...state.user, payload }
            }

        default:
            return {
                ...state
            }

    }
}
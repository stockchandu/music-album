import { LOGINLOCAL, LOGINSESSION } from "./actionType";


const initState = {
    token: ""
}

const saveTokenLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

const saveTokenSession = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data))
}

export const loginReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case LOGINLOCAL:
            saveTokenLocal("token", payload);
            return {
                ...state,
                token: payload
            }

        case LOGINSESSION:
            saveTokenSession("token", payload);
            return {
                ...state,
                token: payload
            }

        default:
            return {
                ...state
            }

    }

}
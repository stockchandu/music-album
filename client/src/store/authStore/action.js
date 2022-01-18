import { LOGINLOCAL, LOGINSESSION} from "./actionType";
export const storeLocalStorage = (data) => ({ type: LOGINLOCAL, payload: data })
export const storeSessionStorage = (data) => ({ type: LOGINSESSION, payload: data })

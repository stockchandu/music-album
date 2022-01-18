export const setLocalstorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalstorage = (key) => {
    let getLocalData = localStorage.getItem(key)
    getLocalData = JSON.parse(getLocalData)
    return [getLocalData]
}
import { useState, createContext } from "react";
export const Paginate = createContext();
export const SetPaginate = ({ children }) => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    return <Paginate.Provider value={{page, setPage, totalPage, setTotalPage }}>
        {children}
    </Paginate.Provider>
}
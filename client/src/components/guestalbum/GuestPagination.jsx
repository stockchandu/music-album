import "./guestalbum.css"
export const GuestPagination = ({ setpage, totalPage }) => {

    return (
        <>
            <div className="pagination__button">

                {
                    Array.from(Array(totalPage), (e, i) => {
                        return <button key={i} onClick={() => setpage(i + 1)}>{i + 1}</button>
                    })
                }
            </div>
        </>
    )
}
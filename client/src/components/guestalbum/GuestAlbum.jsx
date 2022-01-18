import { useSelector } from "react-redux";
import { useContext } from "react";
import "./guestalbum.css"
import CircularProgress from '@mui/material/CircularProgress';
import { GuestPagination } from "./GuestPagination";
import { useHistory } from "react-router-dom";
import { Paginate } from "../context/SetPaginate";
export const GuestAlbum = () => {
    const history = useHistory();
    const { data: { guestAlbum, loading } } = useSelector(store => store.guestAlbum);
    const { page, setPage, totalPage } = useContext(Paginate);

    const handleSongList = (id) => {
        history.push(`/all-song/${id}`)
    }

    return (
        <>
            <div className="guest__album-parent">
                {
                    loading ? <div className="spinner-load">
                        <div><CircularProgress /></div>
                        <div>Loading...</div>
                    </div>

                        : guestAlbum.map(({ albumName, albumPoster, _id, artistName, genre, year }) => {
                            return (
                                <>
                                    <div key={_id} className="guest__album">
                                        <div>
                                            {albumName}
                                        </div>

                                        <div>
                                            <div><img src={albumPoster} alt="" /></div>
                                            <div>Artist- {artistName.firstName}</div>
                                            <div>Genre-{genre}</div>
                                            <div>Year of release-{year}</div>
                                        </div>
                                        <div>
                                            <button onClick={() => { handleSongList(_id) }}>Listen</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                }

            </div>
            <div>
                {loading ? null :
                    <GuestPagination setpage={setPage} page={page} totalPage={totalPage} />
                }
            </div>
        </>
    )
}
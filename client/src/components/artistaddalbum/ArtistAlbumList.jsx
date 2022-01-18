import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from 'axios';
import "./artistalbumlist.css";
import { albumTable } from "../utility/utility";
import { artistAlbumDelete } from "../../store/artistalbumstore/action";
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getLocalstorage } from "../../customhook/useLocalstorage";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { getArtistAlbumData } from "../../store/artistalbumstore/action";
import { baseURL } from "../utility/utility";
export const ArtistAlbumList = () => {
    const dispatch = useDispatch();
    const { data: { loading, artistAlbumData } } = useSelector(store => store.artistAlbum)
    const [sortYear, setYear] = useState("ascending_order");
    const [token] = getLocalstorage("token");
    const [userInfo] = getLocalstorage("user");
    const { _id: artistId } = userInfo;

    const deleteAlbum = async (id) => {
        dispatch(artistAlbumDelete(id));
        await axios.delete(`${baseURL}/all_album_delete/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }


    const sortAlbumYear = async () => {
        if (sortYear === "ascending_order") {
            try {
                let { data: { albumYearAscending } } = await axios.get(`${baseURL}/artist_all_album/${artistId}/sort?year=ascending_order`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                dispatch(getArtistAlbumData(albumYearAscending));
            } catch (err) {
                // dispatch(studentError(err));
            }
            setYear("descending_order");
        } else {
            try {
                let { data: { albumYearDescending } } = await axios.get(`${baseURL}/artist_all_album/${artistId}/sort?year=descending_order`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                dispatch(getArtistAlbumData(albumYearDescending));

            } catch (err) {
                // dispatch(studentError(err));
            }
            setYear("ascending_order")
        }
    }

    return (
        <>

            <div className="album__heading">
                <h4>Album Details</h4>
            </div>
            <div className="album__table">
                <div>{albumTable.name}  </div>
                <div>{albumTable.genre}</div>
                <div >{albumTable.year} <ArrowDropDownOutlinedIcon onClick={sortAlbumYear} />  </div>
                <div>Edit Album</div>
                <div>Remove Album</div>
            </div>


            {
                loading ? <div className="spinner-load">
                    <div><CircularProgress /></div>
                    <div>Loading...</div>
                </div> : artistAlbumData.map(({ albumName, _id: albumid, genre, year }) => {
                    return (
                        <div className="album__table" key={albumid}>
                            <div>{albumName}</div>
                            <div>{genre}</div>
                            <div>{year}</div>
                            <div><EditIcon /></div>
                            <div ><DeleteForeverIcon onClick={() => { deleteAlbum(albumid) }} /></div>
                        </div>
                    )
                })

            }
        </>
    )
}
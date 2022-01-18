import { useSelector } from "react-redux";
import "./artisthome.css";
import { getLocalstorage } from "../../customhook/useLocalstorage";
import { getArtistAlbumData } from "../../store/artistalbumstore/action";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { baseURL } from "../utility/utility";
export const ArtistStats = () => {
    const dispatch = useDispatch();
    const [userInfo] = getLocalstorage("user");
    const { _id: artistName } = userInfo;
    const { data: {  artistAlbumData } } = useSelector(store => store.artistAlbum);

    useEffect(()=>{
        getDataByUserId()
    },[])

    const getDataByUserId = async () => {
        const { data: { all_album } } = await axios.get(`${baseURL}/all_album/${artistName}`)
        dispatch(getArtistAlbumData(all_album));
    }
    return (
        <>

            <div className="artist__stats-parent">
                <div>Total Albums
                    <div className="artist__stats-child">{artistAlbumData.length}</div>
                </div>
                <div>Total Songs
                <div className="artist__stats-child">{artistAlbumData.length}</div>
                </div>
            </div>

        </>
    )
}
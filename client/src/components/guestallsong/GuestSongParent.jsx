import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { GuestAllSong } from "./GuestAllSong";
import { ArtistCard } from "./ArtistCard";
import { baseURL } from "../utility/utility";
export const GuestSongParent = () => {
    const { id } = useParams();
    const [getMusic, setMusic] = useState([]);
    const [artist, setArtist] = useState({
        album: "",
        poster: "",
        artist: "",
        genre: "",
        year: ""
    })

    useEffect(() => {
        getAllSongByAlbumId();
    }, [id])

    const getAllSongByAlbumId = async () => {
        let { data: { AllMusicByAlbumId: { albumName, albumPoster, artistName: { firstName }, genre, songName, year } } } = await axios.get(`${baseURL}/get_all_music/${id}`)
        setMusic(songName);
        setArtist({
            album: albumName,
            poster: albumPoster,
            artist: firstName,
            genre: genre,
            year: year
        })

    }

    return (
        <>
            <ArtistCard artist={artist} />
            {
                getMusic.map(({ songName, musicURL, duration }) => {
                    return (
                        <>
                            <GuestAllSong songname={songName} songurl={musicURL} time={duration} />
                        </>
                    )
                })
            }

        </>
    )
}
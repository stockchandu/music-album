
import "./artistcard.css"
export const ArtistCard = ({ artist: { album, poster, artist, genre, year } }) => {
    return (
        <>
            <div className="artist__card">
                <div className="artist__card-poster">
                    <img src={poster} alt="" />
                </div>
                <div className="artist__card-details">
                    <div>
                        Album Name : {album}
                    </div>
                    <div>
                        Artist Name : {artist}
                    </div>
                    <div>
                        Genre : {genre}
                    </div>
                    <div>
                        Year of release : {year}
                    </div>

                </div>
            </div>
        </>
    )
}
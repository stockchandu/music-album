import "./guestsong.css";
export const GuestAllSong = ({ songname, songurl, time }) => {
    return (
        <>

            <div className="song__parent">
                <div>
                    Song - {songname}
                </div>
                <div>
                    Duration - {time}
                </div>

                <audio controls src={songurl} type="audio/ogg" className="song__style">
                </audio>
            </div>

        </>
    )
}
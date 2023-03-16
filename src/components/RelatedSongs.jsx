import SongBar from "./SongBar";
import { useState, useEffect } from "react";

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "285110c9eamsh53fd7501a267f4fp1c913djsn6a7d37da6a81",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };

    fetch(
      `https://shazam-core.p.rapidapi.com/v1/search/multi?query=${data?.attributes?.name}&search_type=SONGS`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setSongs(response.tracks.hits);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white">Realted Songs:</h2>
      <div className="mt-6 w-full flex flex-col">
        {artistId
          ? songs?.map((song, i) => (
              <SongBar
                key={`${song.track.key}-${artistId}`}
                song={song.track}
                i={i}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
              />
            ))
          : data?.map((song, i) => (
              <SongBar
                key={`${song.key}-${artistId}`}
                song={song}
                i={i}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
              />
            ))}
      </div>
    </div>
  );
};

export default RelatedSongs;

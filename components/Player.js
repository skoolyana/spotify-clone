import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify'

function Player() {
  
  const spotifyApi = useSpotify();
  const {data:session,status} = useSession();

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [volume, setVolume] = useState(50);

  const song_Info = useSongInfo(currentTrackId);

   const fetchCurrentSong=() => {

    if(!songInfo)
    {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {

            console.log("Now Playing ",data.body?.item);
            setCurrentTrackId(data.body?.item?.id);

            spotifyApi.getMyCurrentPlaybackState().then(data => {

            console.log("Now Playing ",data.body?.item);
             setIsPlaying(data.body?.is_playing);


        });

    });
}
   };
     


  useEffect(()=> {

    if(spotifyApi.getAccessToken() && !currentTrackId)
    {
        // fetch the song info

        fetchCurrentSong();
        setVolume(50);


    }

},[currentTrackId,spotifyApi,session]);






  const songInfo = useSongInfo();

    return (
    <div>
        
        {
            /* Left */
        }
        
        <div>

        <img className='hidden md:inline h-10 w-10'  src={songInfo?.album?.images?.[0]?.url}></img>

        </div>
        
        
        </div>
  )
}

export default Player
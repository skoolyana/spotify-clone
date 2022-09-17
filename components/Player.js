import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { VolumeUpIcon } from '@heroicons/react/outline';

import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  ReplyIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid';


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
     

   const handlePlayPause = () => {

     spotifyApi.getMyCurrentPlaybackState().then((data)=> {
    if(data.body.is_playing) {

      spotifyApi.pause();
      setIsPlaying(false);

    }
    else
    {
      spotifyApi.play();
      setIsPlaying(true);
    }

     });


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
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
        
       
        <div className='flex items-center space-x-4'>

        <img className='hidden md:inline h-10 w-10'  src={songInfo?.album?.images?.[0]?.url}></img>

        <div>
          <h3>
            {songInfo?.name}
          </h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
        </div>
        
        {

          <div className='flex items-center justify-evenly'>

            <SwitchHorizontalIcon className='button'></SwitchHorizontalIcon>
            <RewindIcon className='button'></RewindIcon>
            {
              isPlaying ? (
                <PauseIcon onClick={handlePlayPause} className='button w-10 h-10'></PauseIcon>
              ):(<PlayIcon onClick={handlePlayPause} className='button w-10 h-10'></PlayIcon>)


            }


            <PlayIcon className='button'></PlayIcon>
            <FastForwardIcon className='button'></FastForwardIcon>
            <ReplyIcon className='button'></ReplyIcon>
          </div>

        }
        
        </div>
  )
}

export default Player
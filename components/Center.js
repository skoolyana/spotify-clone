import { useSession } from 'next-auth/react';
import React from 'react';
import {ChevronDownIcon}  from "@heroicons/react/outline";
import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState,useRecoilValue } from 'recoil';
import {playlistIdState,playlistState} from "../atoms/playlistAtom";
import spotifyApi from '../lib/spotify';
import useSpotify from '../hooks/useSpotify';
import { signOut } from 'next-auth/react';
import Songs from '../components/Songs';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];



function Center() {

  const {data:session} = useSession();
  const [color, setColor] = useState(null);

  const playlistId = useRecoilValue(playlistIdState);
  const [playList,setPlaylist]= useRecoilState(playlistState);

  const spotifyApi = useSpotify();

  useEffect(() => {
    
  setColor(shuffle(colors).pop());
    
  }, [playlistId]);
  
  
  useEffect(() => {
    
    spotifyApi.getPlaylist(playlistId).then((data)=> {

      setPlaylist(data.body);
    }).catch((error)=> console.log("Something Went Wrong!",error));
      
    }, [spotifyApi,playlistId]);

    console.log(playList);


  return (
    <div className=' flex-grow h-screen overflow-y-scroll scrollbar-hide'>


    <header className='absolute right-8 top-5'>

    <div className='flex items-center bg-red-300 bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white' onClick={signOut}>

    <img className='rounded-full w-11 h-11'    src={session?.user.image} alt=''></img>

    <h2 className='text-white'>{session?.user.name}</h2>
    <ChevronDownIcon className=' text-white h-5 w-5'></ChevronDownIcon>

    </div>

    </header>
 
    <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white pl-5 pb-5 border-[.5px]`}

      > 
    <img className='h-44 w-44 shadow-2xl' src={playList?.images?.[0]?.url} alt=""></img>      
      
      <div>
      <p>PLAYLIST</p>
      <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playList?.name}</h1>
     
      </div>
      
      
      </section>
        
      <div>
        
        <Songs></Songs>
      </div>  
        
        
        
         </div>
  )
}

export default Center
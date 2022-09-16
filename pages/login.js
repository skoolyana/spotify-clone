import React from 'react';

import {getProviders,signIn} from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
        <img className='w-52 mb-5'  src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png'></img>
      
        {
            Object.values(providers).map((provider) =>(

                <div>
                    <button className='bg-[#18D860] p-5 text-white rounded-full'
                    
                    onClick={()=> signIn(provider.id, {
                        callbackUrl:"/"
                    })}
                    >
                        Login with {provider.name} 
                    
                    
                    
                    </button>
                </div>

            ))

            
        }

        </div>
  )
}

export default Login;

export async function getServerSideProps() {

    const providers = await getProviders();

    return {
        props:{
            providers,
        },
    };

}


import React from "react";
import Image from "next/image";
export default function Hero({ portfolio }) {
  const { profile, socials, name, email, username } = portfolio || {};
  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-6xl px-6 py-20 mx-auto space-y-8 sm:flex-row sm:space-y-0">
        <div>
          <div className="flex  justify-center">
    
            <Image
              src={profile?.picture || "/default-avatar.png"}
              height={100}
              width={100}
              alt={username || "User"}
              className="duration-300 object-cover w-[200px] transform rounded-full  h-[200px] hover:shadow-2xl animate-jump-in animate-duration-[300ms] animate-ease-in-out"
            />
          </div>
          <div className="flex justify-center">
            <div className="max-w-2xl mt-8 text-3xl  lg:text-6xl font-bold text-center text-transparent  animate-fade-up bg-gradient-to-r from-indigo-500 to-orange-500 bg-clip-text">
              {name}, <span class="text-gray-400 ">{profile?.tagline}</span>
            </div>
          </div>
          <div className="text-sm my-10 text-center text-gray-300 animate-fade-up animate-once animate-delay-300">
            {profile?.bio}
          </div>
          <div className="flex items-center justify-center w-full">
            <a
              href=""
              className="p-3 px-6 duration-200 rounded-full transform bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-gray-100 animate-fade-up hover:ring-2 ring-offset-2
                    animate-once animate-delay-[400ms] hover:scale-105"
            >
              Show My Resume
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react'

export default function SkeletalLoader() {
  return (
    <div className="bg-gray-50 wrapper min-h-screen">
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="flex items-center p-4 bg-gray-200 rounded-lg animate-pulse">
            <div className="w-16 h-16 rounded-full bg-gray-300"></div>
            <div className="ml-4 flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>

          <div className="flex space-x-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>

          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-32 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>

        <div className="space-y-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-4 bg-gray-200 rounded-lg space-y-2 animate-pulse"
            >
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
  )
}

export function MobilePreview() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[340px] h-[690px] bg-black rounded-[50px] overflow-hidden shadow-2xl">
        {/* Frame */}
        <div className="absolute inset-[4px] bg-gray-900 rounded-[50px]"></div>

        {/* Screen */}
        <div className="absolute inset-[8px] bg-white rounded-[46px] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black w-[150px] h-[30px] rounded-[30px]"></div>
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Mobile Preview
            </h2>
            <p className="text-gray-600">
              Realistic representation of your site on an iPhone 15 Pro Max
            </p>
          </div>
        </div>

        <div className="absolute left-[-2px] top-[140px] w-[2px] h-[60px] bg-gray-700"></div>
        <div className="absolute left-[-2px] top-[240px] w-[2px] h-[80px] bg-gray-700"></div>
        <div className="absolute right-[-2px] top-[140px] w-[2px] h-[60px] bg-gray-700"></div>
        <div className="absolute right-[-2px] top-[240px] w-[2px] h-[80px] bg-gray-700"></div>
      </div>
    </div>
  );
}

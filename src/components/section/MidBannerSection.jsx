import React from 'react'

const MidBannerSection = () => {
  return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1520975922071-aadf2ec350b9"
              alt="Season Sale"
              className="w-full h-80 object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center">
              <h2 className="text-4xl font-bold text-white">
                Winter Season Sale
              </h2>
              <p className="text-white mt-2 text-lg">
                Up to 50% off on premium collections
              </p>
              <button className="mt-5 px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-200">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default MidBannerSection
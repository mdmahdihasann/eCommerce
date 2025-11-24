import React from 'react'

const NewsLatterSection = () => {
  return (
    <section className="py-20 bg-gray-900 text-white mt-[60px] rounded-xl">
        <div className="max-w-4xl mx-auto text-center px-4 ">
          <h2 className="text-3xl font-bold">Join Our Newsletter</h2>
          <p className="mt-2 text-gray-300">
            Be the first to know about new drops & exclusive offers.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3 rounded-xl w-full sm:w-80 text-gray-900 outline-none"
            />
            <button className="px-6 py-3 bg-indigo-600 rounded-xl font-semibold hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
  )
}

export default NewsLatterSection
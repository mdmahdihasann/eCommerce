
const CategorySection = () => {
  return (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Men's Collection",
                img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
              },
              {
                title: "Women's Collection",
                img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
              },
              {
                title: "Accessories",
                img: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93",
              },
            ].map((cat, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              >
                <img
                  src={cat.img}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-semibold">
                    {cat.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}


export default CategorySection
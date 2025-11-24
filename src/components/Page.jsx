import FilterSection from "../Product/FilterSection";
import ProductCart from "../Product/ProductCart";
import CartSection from "../Product/Cart/CartSection";
import HeroSection from "./section/HeroSection";
import CategorySection from "./section/CategorySection";
import MidBannerSection from "./section/MidBannerSection";
import NewsLatterSection from "./section/NewsLatterSection";

const Page = ({ addToCart, onHandleDelete, data }) => {
  return (
    <main className="max-w-[1300px] w-full mx-auto px-4">

      {/* Hero Section */}
      <HeroSection />

      {/* Products Title */}
      <h2 className="text-2xl font-bold mb-6 mt-8">Your Products</h2>

      {/* Product + Cart Layout */}
        {/* Products (2 columns on large screen) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {data.slice(0,8).map((item) => (
            <ProductCart
              item={item}
              key={item.id}
              addToCart={addToCart}
              onHandleDelete={onHandleDelete}
            />
          ))}
        </div>

        {/* Cart Section (1 column on large screen) */}
        {/* <CartSection onHandleDelete={onHandleDelete} /> */}

      {/* Mid Banner */}

      {/* NewsLetter */}
      <NewsLatterSection />
    </main>
  );
};

export default Page;

import ProductCart from "../Product/ProductCart";
import HeroSection from "./section/HeroSection";
import NewsLatterSection from "./section/NewsLatterSection";
import getData from "../data/data";
import { useState } from "react";

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState(getData);
  // const [search, setSearch] = useState("");
  // const [select, setSelect] = useState("");

  function HandleAddCart(item) {
    const newData = data.map((product) =>
      product.id === item.id
        ? { ...product, stock: product.stock - 1 }
        : product
    );
    setData(newData);

    const product = data.find((i) => i.id === item.id);
    setCart([...cart, { ...product, stock: product.stock - 1, quantity: 1 }]);
  }

  function handleDeleteCart(cartId) {
    const newCart = cart.filter((item) => item.id !== cartId);
    setCart(newCart);

    const newData = data.map((product) =>
      product.id === cartId ? { ...product, stock: product.stock + 1 } : product
    );

    setData(newData);
  }

  // function handleSelected(e) {
  //   setSelect(e.target.value);
  // }

  // function handleSearchValue(e) {
  //   setSearch(e.target.value);
  // }

  // const filterData = data
  //   .filter((product) =>
  //     product.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  //   )
  //   .sort((a, b) => {
  //     if (select === "lowTohigh") return a.price - b.price;
  //     if (select === "highTolow") return b.price - a.price;
  //     if (select === "mostPopular") return b.rating - a.rating;
  //     return 0;
  //   });

  return (
    <div>
      <HeroSection />

      <h2 className="text-2xl font-bold mb-6 mt-8">Your Products</h2>
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data.slice(0, 8).map((item) => (
          <ProductCart
            item={item}
            key={item.id}
            addToCart={HandleAddCart}
            onHandleDelete={handleDeleteCart}
          />
        ))}
      </div>

      {/* Cart Section (1 column on large screen) */}
      {/* <CartSection onHandleDelete={onHandleDelete} /> */}

      <NewsLatterSection />
    </div>
  );
};

export default HomePage;

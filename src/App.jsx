import Header from "./components/Header";
import Page from "./components/Page";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import "./App.css";
import { useState } from "react";
import { CartContext } from "./context/CartContext";
import getData from "./data/data";
import NewsLatterSection from "./components/section/NewsLatterSection";

function App() {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState(getData);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");

  function HandleAddCart(item) {
    const newData = data.map((product)=>(
      product.id  === item.id ? {...product, stock: product.stock - 1} : product
    ))
    setData(newData)

    const product = data.find(i=>i.id === item.id);
    setCart([...cart, {...product, stock: product.stock - 1, quantity: 1}])
  }

  
  function handleDeleteCart(cartId) {
    const newCart = cart.filter((item) => item.id !== cartId);
    setCart(newCart);

    const newData = data.map((product)=>(
      product.id === cartId ? {...product, stock: product.stock + 1}: product
    ))

    setData(newData)
  }

  function handleSelected(e) {
    setSelect(e.target.value);
  }

  function handleSearchValue(e) {
    setSearch(e.target.value);
  }

  const filterData = data
    .filter((product) =>
      product.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .sort((a, b) => {
      if (select === "lowTohigh") return a.price - b.price;
      if (select === "highTolow") return b.price - a.price;
      if (select === "mostPopular") return b.rating - a.rating;
      return 0;
    });

  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        <Header handleInputValue={handleSearchValue} />
        <Page
          addToCart={HandleAddCart}
          onHandleDelete={handleDeleteCart}
          data={filterData}
          onHandleSelect={handleSelected}
        />
        <Footer />
      </CartContext.Provider>
    </>
  );
}

export default App;

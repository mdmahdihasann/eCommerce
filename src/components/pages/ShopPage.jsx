import ProductCart from "../../Product/ProductCart";
import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import { actions } from "../../actions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItemToCartAPI } from "../../features/product-cart/productCartSlice";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const { dispatch, state } = useProduct();
  const dispatchR = useDispatch();
  const {auth} = useAuth();
  const [isSelect, setIsSelect] = useState("all-product");
  const [displayProduct, setDisplayProduct] = useState([]);
  const Navigate = useNavigate();

  useEffect(()=>{
    if(state?.products?.length){
      setDisplayProduct(state?.products);
    }
  },[state?.products])

  useEffect(()=>{
    const data = [...state.products];
    switch(isSelect){
      case "low-price":
        data.sort((a, b)=> a.price - b.price);
        break;
      case "high-price":
        data.sort((a,b)=>b.price - a.price);
        break;
      case "most-popular":
        data.sort((a, b)=> b.rating - a.rating)
        break;

      default:
        
        break;  
    }
    setDisplayProduct(data)
  },[isSelect])

  const HandleAddCart = (item) => {
    if (!auth?.user?.id) {
          Navigate('/login')
          return;
        }
    
        const userId = auth.user.id;
        dispatchR(addItemToCartAPI({ item, userId }));
  };

  useEffect(() => {
    const getProductData = async () => {
      dispatch({ type: actions.products.DATA_FETCHING });
      try {
        const resposne = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/products`
        );
        if (resposne.status === 200) {
          dispatch({
            type: actions.products.DATA_FETCHED,
            data: resposne.data.products,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.products.DATA_FETCH_ERROR,
          data: error.message,
        });
      }
    };
    getProductData();
  }, []);
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 pt-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
          <p className="text-gray-500 text-sm mt-1">
            Browse and filter your favorite products
          </p>
        </div>

        <div className="w-64">
          <select
            className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
            onChange={(e) => setIsSelect(e.target.value)}
          >
            <option
              className="text-gray-700 p-2 hover:bg-indigo-100"
              value="all-product"
            >
              All Products
            </option>
            <option
              className="text-gray-700 p-2 hover:bg-indigo-100"
              value="most-popular"
            >
              Most Popular
            </option>
            <option
              className="text-gray-700 p-2 hover:bg-indigo-100"
              value="low-price"
            >
              Low Price
            </option>
            <option
              className="text-gray-700 p-2 hover:bg-indigo-100"
              value="high-price"
            >
              High Price
            </option>
          </select>
        </div>
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {displayProduct?.map((item) => (
          <ProductCart item={item} key={item.id} addToCart={HandleAddCart} />
        ))}
      </div>
    </>
  );
};

export default ShopPage;

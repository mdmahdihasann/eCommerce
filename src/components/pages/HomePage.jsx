import ProductCart from "../../Product/ProductCart";
import HeroSection from "../section/HeroSection";
import NewsLatterSection from "../section/NewsLatterSection";
import { useEffect } from "react";
import { useProduct } from "../../hooks/useProduct";
import { actions } from "../../actions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCartAPI,
  removeItem,
} from "../../features/product-cart/productCartSlice";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const HomePage = () => {
  const isLoading = useSelector((state) => state.cart.isLaoding);
  const { auth } = useAuth();
  const { dispatch, state } = useProduct();
  const Navigate = useNavigate();

  const dispatchR = useDispatch();

  const HandleAddCart = (item) => {
    if (!auth?.user?.id) {
      Navigate("/login");
      return;
    }

    const userId = auth.user.id;
    dispatchR(addItemToCartAPI({ item, userId }));
  };

  function handleDeleteCart(cartId) {
    dispatchR(removeItem(cartId));
  }

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
  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (state?.loading)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <div>
      <HeroSection />

      <h2 className="text-2xl font-bold mb-6 mt-8">Your Products</h2>
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {state.products.slice(0, 8).map((item) => (
          <ProductCart
            item={item}
            key={item.id}
            addToCart={HandleAddCart}
            onHandleDelete={handleDeleteCart}
          />
        ))}
      </div>
      <NewsLatterSection />
    </div>
  );
};

export default HomePage;

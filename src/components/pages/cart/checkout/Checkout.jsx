import { useDispatch } from "react-redux";
import { useAuth } from "../../../../hooks/useAuth";
import BillingDetails from "./BillingDetails";
import Payment from "./Payment";
import { productOrder } from "../../../../features/product-cart/productCartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleCheckoutFrom = (formData) => {
    if (!auth?.user?.id) {
      console.log("User not logged in");
      return;
    }

    try {
      const payload = {
        userId: auth.user.id,
        paymentMethod: "cod",
        customer: formData,
      };

      dispatch(productOrder(payload));
      navigate(`/order-success`)
      toast.success("Order Successfully")
    } catch (error) {
      console.log(error.message);
      toast.error("Order Faild")
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-14">
      <BillingDetails handleCheckoutFrom={handleCheckoutFrom} />
      <Payment />
    </div>
  );
};

export default Checkout;

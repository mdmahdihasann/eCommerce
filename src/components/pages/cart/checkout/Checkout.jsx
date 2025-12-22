import { useDispatch } from "react-redux";
import { useAuth } from "../../../../hooks/useAuth";
import BillingDetails from "./BillingDetails";
import Payment from "./Payment";
import { productOrder } from "../../../../features/product-cart/productCartSlice";

const Checkout = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const handleCheckoutFrom = (formData) => {
    if (!auth?.user?.id) {
      console.log("User not logged in");
      return;
    }

    const payload = {
      userId: auth.user.id,
      paymentMethod: "cod",
      customer: formData,
    };

    dispatch(productOrder(payload));
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-14">
      <BillingDetails handleCheckoutFrom={handleCheckoutFrom} />
      <Payment />
    </div>
  );
};

export default Checkout;

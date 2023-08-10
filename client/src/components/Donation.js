import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
// import Auth from "../../utils/auth";
// is auth necessary for donation ?

// revise once resolvers and typfefs have stripe integrated********

// stripe public key
// stripePromise is used to load stripe for the checkout session
const stripePromise = loadStripe(
  "pk_test_51NdeCcJJYT86npXC9P0eXGwM0LEojk6P7yMabT5rpFsACJ01ZiYQXY2OfqhYDEmP93DJyYkDbkHOuXTcnEHDklX400aBYioMbW"
);

// donation component
const Donation = () => {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  // handle click function for donation
  const handleClick = async (e) => {
    e.preventDefault();
    getCheckout();
  };

  return (
    <div>
      <h1>Donate</h1>
      <h2>Help us, help you!</h2>
      <input type="int" placeholder="Amount" />
      <button onClick={handleClick}>Donate</button>
      <p>Donations help us fund hosting used for this application</p>
    </div>
  );
};

export default Donation;

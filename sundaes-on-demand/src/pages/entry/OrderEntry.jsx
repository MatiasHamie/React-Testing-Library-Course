import React from "react";
import { useOrderDetails } from "../../contexs/OrderDetails";
import Options from "./Options";

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
    </div>
  );
};

export default OrderEntry;

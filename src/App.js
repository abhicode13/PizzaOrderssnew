import React, { useState, useEffect } from "react";
import OrderForm from "./components/OrderForm/OrderForm";
import PizzaStage from "./components/PizzaStage/PizzaStage";
import MainSection from "./components/MainSection/MainSection";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [orderCounter, setOrderCounter] = useState(1); 

  
  const activeOrders = orders.filter((order) => order.stage !== "Order Picked").length;

  
  const addOrder = (pizzaDetails) => {
    if (activeOrders >= 10) {
      alert("Not taking any order for now.");
      return;
    }

    const newOrder = {
      id: `Order ${String(orderCounter).padStart(3, "0")}`, 
      details: pizzaDetails,
      stage: "Order Placed",
      timeSpent: 0,
      timestamps: {
        placed: new Date(),
      },
    };

    setOrders([...orders, newOrder]); 
    setOrderCounter((prevCounter) => prevCounter + 1); 
  };


  const cancelOrder = (orderId) => {
    const orderToCancel = orders.find((order) => order.id === orderId);
    if (orderToCancel.stage === "Order Ready" || orderToCancel.stage === "Order Picked") {
      alert("Cannot cancel the order. It is already in 'Order Ready' or beyond.");
      return;
    }

    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId)); // Remove order
  };

  
  const moveOrderToNextStage = (orderId) => {
    const nextStages = ["Order Placed", "Order in Making", "Order Ready", "Order Picked"];

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              stage: nextStages[nextStages.indexOf(order.stage) + 1] || "Order Picked",
              timeSpent: 0,
              timestamps: {
                ...order.timestamps,
                picked:
                  nextStages[nextStages.indexOf(order.stage) + 1] === "Order Picked"
                    ? new Date()
                    : order.timestamps.picked,
              },
            }
          : order
      )
    );
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => ({
          ...order,
          timeSpent:
            order.stage !== "Order Picked"
              ? order.timeSpent + 1
              : order.timeSpent, 
        }))
      );
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds < 10 ? "0" : ""}${remainingSeconds} sec`;
  };

 
  const totalDelivered = orders.filter((order) => order.stage === "Order Picked").length;

  return (
    <div>
      <OrderForm
        addOrder={addOrder}
        activeOrders={activeOrders}
        totalDelivered={totalDelivered}
      />
      <PizzaStage
        orders={orders}
        moveOrderToNextStage={moveOrderToNextStage}
        formatTime={formatTime}
      />
      <MainSection
        orders={orders}
        formatTime={formatTime}
        totalDelivered={totalDelivered}
        cancelOrder={cancelOrder}
      />
    </div>
  );
};

export default App;

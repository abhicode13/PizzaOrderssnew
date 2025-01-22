import React from "react";
import "./PizzaStage.css";

const PizzaStage = ({ orders, moveOrderToNextStage,formatTime }) => {
  const renderOrders = (stage) =>
    orders
      .filter((order) => order.stage === stage)
      .map((order) => (
        <div
          key={order.id}
          className={`order-card ${
            order.timeSpent >= 180 ? "red-background" : ""
          }`}
        >
          <h4>{order.id}</h4>
          <p>{formatTime(order.timeSpent)}</p>
          {stage !== "Order Picked" && (
            <button onClick={() => moveOrderToNextStage(order.id)}>Next</button>
          )}
        </div>
      ));



  return (
    <div className="pizza-stages">
      <div className="stage-column">
        <h3>Order Placed</h3>
        {renderOrders("Order Placed")}
      </div>
      <div className="stage-column">
        <h3>Order in Making</h3>
        {renderOrders("Order in Making")}
      </div>
      <div className="stage-column">
        <h3>Order Ready</h3>
        {renderOrders("Order Ready")}
      </div>
      <div className="stage-column">
        <h3>Order Picked</h3>
        {renderOrders("Order Picked")}
      </div>
    </div>
  );
};

export default PizzaStage;

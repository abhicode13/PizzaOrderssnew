import React from "react";
import "./MainSection.css";

const MainSection = ({ orders, cancelOrder ,formatTime,totalDelivered}) => {

  const calculateTimeDifference = (startTime, endTime) => {
    if (!startTime || !endTime) {
      return "N/A"; 
    }
    const diff = (new Date(endTime) - new Date(startTime)) / 1000;
    const minutes = Math.floor(diff / 60);
    const seconds = Math.floor(diff % 60);
    return `${minutes} min ${seconds} sec`;
  };

  

  return (
    <div>
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Order ID</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Stage</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Total Time Spent (Time from Order Placed)
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>{order.id}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>{order.stage}</td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {order.stage === "Order Picked" && order.timestamps?.placed && order.timestamps?.picked
                  ? calculateTimeDifference(order.timestamps.placed, order.timestamps.picked)
                  : `${formatTime(order.timeSpent)}`}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {order.stage !== "Order Ready" && order.stage !== "Order Picked" && (
                  <button onClick={() => cancelOrder(order.id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan="3"
              style={{
                border: "1px solid orange",
                padding: "8px",
                fontWeight: "bold",
                backgroundColor: "#fff",
              }}
            >
              Total order delivered
            </td>
            <td
              style={{
                border: "1px solid orange",
                padding: "8px",
                fontWeight: "bold",
                backgroundColor: "#fff",
              }}
            >
              {`00${totalDelivered}`} 
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MainSection;



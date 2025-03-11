import React, { useState } from "react";

function PromotionsManager({ promotionsSent }) {
  const [promotions, setPromotions] = useState(promotionsSent);
  const [newCoupon, setNewCoupon] = useState({ couponCode: "", discount: "", expiry: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();

    if (!newCoupon.couponCode || !newCoupon.discount || !newCoupon.expiry) {
      alert("Please fill in all fields.");
      return;
    }

    setPromotions((prev) => [...prev, newCoupon]);
    setNewCoupon({ couponCode: "", discount: "", expiry: "" });
    alert("Coupon sent to users!");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Promotions Sent</h2>

      {/* Display promotions in a table */}
      <table className="min-w-full bg-white border border-gray-200 mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Coupon Code</th>
            <th className="py-2 px-4 border-b">Discount</th>
            <th className="py-2 px-4 border-b">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promotion, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{promotion.couponCode}</td>
              <td className="py-2 px-4 border-b">{promotion.discount}</td>
              <td className="py-2 px-4 border-b">{promotion.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add new coupon form */}
      <form onSubmit={handleAddCoupon} className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Send a New Coupon</h3>
        <div>
          <label className="block mb-2">Coupon Code:</label>
          <input
            type="text"
            name="couponCode"
            value={newCoupon.couponCode}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="Enter coupon code"
          />
        </div>
        <div>
          <label className="block mb-2">Discount:</label>
          <input
            type="text"
            name="discount"
            value={newCoupon.discount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder="Enter discount (e.g., 15%)"
          />
        </div>
        <div>
          <label className="block mb-2">Expiry Date:</label>
          <input
            type="date"
            name="expiry"
            value={newCoupon.expiry}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send Coupon
        </button>
      </form>
    </div>
  );
}

export default PromotionsManager;

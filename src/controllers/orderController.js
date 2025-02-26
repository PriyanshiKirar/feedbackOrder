const Order = require("../models/order");
const User = require("../models/user.js");
const { transporter, config } = require("../config/config.js");

const markOrderCompleted = async (req, res) => {
  try {
    const { orderId, adminId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "Shipped") {
      return res
        .status(400)
        .json({ message: "Order must be shipped before marking as completed" });
    }

    // Update order status
    order.status = "Completed";
    order.history.push({ action: "Marked as Completed", changedBy: adminId });
    await order.save();

    // Send Thank You Email
    await sendThankYouEmail(order.userId);

    res.status(200).json({ message: "Order marked as completed", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const sendThankYouEmail = async (userId) => {
  try {
    const user = await User.findById(userId).select("email"); // Fetch user email
    if (!user || !user.email) {
      console.error("User email not found, skipping email notification.");
      return;
    }

    const mailOptions = {
      from: config.EMAIL_USER,
      to: user.email,
      subject: "Thank You for Your Order!",
      text: "Your order has been successfully completed. We appreciate your business!",
    };

    await transporter.sendMail(mailOptions);
    console.log(`Thank You Email Sent Successfully to ${user.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate(
      "history.changedBy",
      "name email"
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order.history);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { markOrderCompleted, getOrderHistory };

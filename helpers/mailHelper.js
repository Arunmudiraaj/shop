const { transporter } = require("../nodemailer/mail.service");

const tdStyle =
  "text-align: center; border-style: solid; border-width: 1px; border-color: black; border-collapse: collapse;";
const thStyle =
  "border-style: solid; border-width: 1px; border-color: black; border-collapse: collapse;";
const tableStyle = "border-collapse: collapse; width: 50%;";

const sendOrderPlacedMail = async (user, totalAmount, orderItems, shippingAddress, paymentMethod) => {
  console.log("Order", orderItems, shippingAddress, paymentMethod, totalAmount, user.name, user.email);
  try {
    const mailData = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Order Placed | Shop",
      text: "Order Placed",
      html: `Hurray! ${user.name},
      <br/><br/>
      Your order has been placed successfully. Here are the details:
      <br/> <br/>
      <table style="${tableStyle}">
        <tr>
            <th style="${thStyle}">Product Name</th>
            <th style="${thStyle}">Quantity</th>
            <th style="${thStyle}">Price</th>
        </tr>
        ${generateOrderItemsRows(orderItems)} 
    </table>
    <br/>
      <b>Total: ${totalAmount}</b>
      <br/>
      Payment Method: ${paymentMethod}
      <br/>
      Order will be delivered to the address: ${shippingAddress}
      <br/> <br/>
      Best regards,
      <br/>
      Shop Team`,
    };

    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.error("Error in send mail", err);
      }
    });
    console.log("Mail sent successfully");
  } catch (err) {
    console.error("Error in send email", err);
  }
};

const generateOrderItemsRows = (orderItems) => {
  return orderItems.reduce((acc, el) => {
    return (
      acc +
      `<tr>
      <td style="${tdStyle}">${el?.dataValues?.product?.dataValues?.name}</td>
      <td style="${tdStyle}">${el?.dataValues?.quantity}</td>
      <td style="${tdStyle}">${parseInt(el?.dataValues?.product?.dataValues?.price) * parseInt(el?.quantity)}</td>
    </tr>`
    );
  }, "");
};

module.exports = { sendOrderPlacedMail };

import { transporter } from "./transporter";

export async function mailer(email) {
  try {
    const mailOptions = {
      from: `"Brew Haven" <ekaksha2001@gmail.com>`,
      to: `${email}`,
      subject: "Order Confirmation",
      html: `<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
            <table role="presentation"
              style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
              <tbody>
                <tr>
                  <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                    <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                      <tbody>
                        <tr>
                          <td style="padding: 40px 0px 0px;">
        
                            <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                              <div style="color: rgb(0, 0, 0); text-align: left;">
                                <h1 style="margin: 1rem 0">Your order has been placed!</h1>
                                <p style="padding-bottom: 16px">Thank you for your order! Your coffee is being prepared and will be ready soon.</p>
                                <p style="padding-bottom: 16px">Delivery boy will arrive in 15 minutes.</p>
                                <p style="padding-bottom: 16px">Thanks,<br>Brew Haven Team</p>
                              </div>
                            </div>
                            <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                              <p style="padding-bottom: 16px">Made with ♥ by Sohail</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
          `,
    };

    transporter
      .sendMail(mailOptions)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    console.log("Email sent:");
  } catch (error) {
    console.log("Error occured:", error);
  }
}

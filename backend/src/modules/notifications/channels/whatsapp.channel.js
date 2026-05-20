import axios from "axios";

export const sendWhatsApp = async (
  phone,
  message
) => {
  try {
    console.log("SEND TO:", phone);
    console.log("MESSAGE:", message);

    const response = await axios.post(
      "https://api.fonnte.com/send",
      {
        target: phone,
        message,
      },
      {
        headers: {
          Authorization:
            process.env.FONNTE_TOKEN,
          },
      }
    );

    console.log(
      "FONNTE RESPONSE:",
      response.data
    );

    return response.data;
  } catch (err) {
    console.error(
      "WA ERROR FULL:",
      err.response?.data || err.message
    );

    throw err;
  }
};
import axios from 'axios';

export const sendWhatsApp = async (phone, message) => {
  try {
    return await axios.post(
      'https://api.fonnte.com/send',
      {
        target: phone,
        message
      },
      {
        headers: {
          Authorization: process.env.FONNTE_TOKEN
        }
      }
    );
  } catch (err) {
    console.error('WA Error:', err.message);
  }
};
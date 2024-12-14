import { showToast } from "../helpers/ShowToast";

export const sendWhatsAppBookingOTP = async (phoneNumber,otp) => {
    const url = 'https://graph.facebook.com/v19.0/365577786631719/messages';
    const requestBody = {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "template",
      template: {
        name: "start_otp",
        language: {
          code: "en"
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: otp
              }
            ]
          }
        ]
      }
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer EAAaO7W1PA5ABO1sjb0y9IkZBk1nfxhNH2H2sxkF8ps9AHHAWOj96MODmLPYjbFrov0ht8fsJZAjSdNgZC765dwZCKZAgWvNZBICeNVFviO7GEE1ZAvJWDaKajQeGDBjoWFUc5iAdrNQhEeWhQTyO19sefTShOfPitB4rACuzKnmpLVHZBM64uJ7Cv4YFHPI3uzU06wZDZD'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('WhatsApp OTP sent successfully:', data);
        showToast('success', 'OTP sent successfully');
        return otp; // Return OTP for verification
      } else {
        const errorData = await response.json();
        console.error('Failed to send WhatsApp OTP:', errorData);
        return null;
      }
    } catch (error) {
      console.error('Error sending WhatsApp OTP:', error);
      return null;
    }
  }; 
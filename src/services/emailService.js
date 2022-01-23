import http from "./http";

const apiEndpoint = "/send";
const sendEmail = async (data) => {
  data.subject = "MerchFinder - Purchase Invoice";
  data.senderEmail = "merchfinder.noreply@gmail.com";
  data.senderPassword = "merchfinder@@123";
  return await http.post(apiEndpoint, data);
};

export default sendEmail;

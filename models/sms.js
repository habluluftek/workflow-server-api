const axios = require("axios");
var urlencode = require('urlencode');
const tlClient = axios.create({
    baseURL: "https://api.textlocal.in/",
    params: {
      apiKey: "6bWKwaWjA3I-ycUcGGvK7zeXMr5Up3pvI9ZIXeVQjj", //Text local api key
      sender: "Luftek"
    }
  });
const smsClient = {
  setServiceCall: user => {
    var name = user.name;
    var serviceCallId = user.serviceCallId;
    var createdby = user.createdby;
    var message_content = 'Hi Mr.'+name+',New Service Call (ID : '+serviceCallId+') registered by Mr.'+createdby+'.Please login to http://workflow.luftek.in.'
    var message =urlencode(message_content)
    
    if (user && user.phone && user.name) {
      const params = new URLSearchParams();
      params.append("numbers", [parseInt("91" + user.phone)]);
      params.append(
        "message",
        message
      );
      console.log(params);
      tlClient.post("/send", params);
    }
  },

  
  setServiceCallDailyReport: user => {
    var name = user.name;
    var pendingCall = user.pendingCall;
    var progressCall = user.progressCall;
    var message_content = 'Hello! Mr.'+name+', Good Morning. There are '+pendingCall+' call are awaiting to respond and '+progressCall+' call are in progress. Have a nice day.'
    var message =urlencode(message_content)
    
    if (user && user.phone && user.name) {
      const params = new URLSearchParams();
      params.append("numbers", [parseInt("91" + user.phone)]);
      params.append(
        "message",
        message
      );
      console.log(params);
      tlClient.post("/send", params);
    }
  },

    threeDailyReport: user => {
    var name = user.name;
    var seven = user.moreThanSeven;
    var three = user.moreThanThree;
    var message_content = 'Good Morning! Mr. '+name+', Totally '+seven+' service calls pending more than 7 days & '+three+' service calls are pending 3 days to complete. Have a Nice Day!'
    var message =urlencode(message_content)
    
    if (user && user.phone && user.name) {
      const params = new URLSearchParams();
      params.append("numbers", [parseInt("91" + user.phone)]);
      params.append(
        "message",
        message
      );
      console.log(params);
      tlClient.post("/send", params);
    }
  },


    setServiceCallCompleted: user => {
    var name = user.name;
    var serviceCallId = user.serviceCallId;
    var message_content = 'Hello! Mr. '+name+', The Service Call ID: '+serviceCallId+' is completed. Please take the report from https://workflow.luftek.in.'
    var message =urlencode(message_content)
    
    if (user && user.phone && user.name) {
      const params = new URLSearchParams();
      params.append("numbers", [parseInt("91" + user.phone)]);
      params.append(
        "message",
        message
      );
      console.log(params);
      tlClient.post("/send", params);
    }
  },
};

module.exports = smsClient;
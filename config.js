const appConfig = {
    "accessKeyId": process.env.AWS_AccessKey,
    "secretAccessKey": process.env.AWS_SecretKey,
    "region": "us-east-1",
    "apiVersion": "2016-11-28",
    "botAlias": process.env.AWS_BotAlias,
    "botName": process.env.AWS_BotName,
    "userId": process.env.AWS_UserId,
    bot: {
        name: "Tech Assist 🤖",
        initMessage: "Hi, I'm the Tech Assist Bot. How can I help you today?",
        completeMessage: "Anything else I can help you with?"
    },
    theme: {
        header:{
            bgColor: "black",
            textColor: "white",
        },
        message:{
            botMsgBgColor: "steelblue",
            botMsgTextColor: "white",
            userMsgBgColor: "green",
            userMsgTextColor: "white",
            dateTextColor: "white" //auto opacity 0.8
        }
    }
}
export default appConfig;
const Chat = require("../models/chat");
const chatController = {};

chatController.saveChat = async (message, user) => {
  const newMessage = new Chat({
    chat: message,
    user: {
      id: user._id, // 몽고 db에서 부여해주는 데이터의 id
      name: user.name,
    },
  });
  await newMessage.save();
  return newMessage;
};

module.exports = chatController;

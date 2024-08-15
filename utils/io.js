const chatController = require("../controller/chat.controller");
const userController = require("../controller/user.controller");

module.exports = function (io) {
  // on : 연결을 듣는것
  io.on("connection", async (socket) => {
    console.log("연결 성공...", socket.id);

    socket.on("login", async (userName, cb) => {
      console.log("사용자 이름 back > ", userName);

      try {
        // 유저 정보를 저장
        const user = await userController.saveUser(userName, socket.id);
        const welcomeMessage = {
          chat: `${user.name} is joined to this room.`,
          user: { id: null, name: "system" },
        };
        io.emit("message", welcomeMessage);
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("sendMessage", async (message, cb) => {
      try {
        // 유저 찾기 socket id로
        const user = await userController.ckeckUser(socket.id);
        // 메시지 저장
        const newMessage = await chatController.saveChat(message, user);
        console.log("neMessage >> ", newMessage);
        // 서버가 메시지를 말함(emit)! => 그러면 사용자 상관없이 모든 프론트에서 볼 수있음!
        io.emit("message", newMessage);
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("disconnect", async () => {
      console.log(" 사용자 연결 끊김 ...");
    });
  });
};

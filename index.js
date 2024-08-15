const { createServer } = require("http");
const app = require("./app");
const { Server } = require("socket.io");
require("dotenv").config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // 프론트엔드에서 허용할 주소
  },
});

require("./utils/io")(io); // io.js 파일에 io를 넘겨줌 (io에 적을 양이 많으므로..)

httpServer.listen(process.env.PORT, () => {
  console.log("server lisitening on port : ", process.env.PORT);
});

import Express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = Express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log("User Connected",socket.id)

    socket.on("send_message", (data) => {
      console.log(data)
        socket.broadcast.emit("recieve_message", data)
    })
})

server.listen(3002, () => {
  console.log("lis");
});

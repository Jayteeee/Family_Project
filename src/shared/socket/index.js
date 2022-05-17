// import React, { useEffect } from "react";
// import { Server } from "socket.io";

// const index = () => {
//   const io = new Server({
//     cors: {
//       origin: "http://localhost:3000",
//     },
//   });

//   let onlineUsers = []

//   io.on("connection", (socket) => {

//     [
//       {
//         username:"John",
//         socketId:"dasfasd",
//       },
//       {
//         username:"Monica",
//         socketId:"dfaehgasd",
//       }
//     ]

//     socket.on("disconnect", () => {
//       console.log("someone has left");
//     });
//   });

//   io.listen(3000);

//   return <div></div>;
// };

// export default index;

export const socket = new WebSocket(
  `wss://twotwentyk-api.pandoratoolbox.com/ws?token=${localStorage.getItem(
    "auth"
  )}`
);

socket.onopen = () => {
  console.log("webscoket connected");
};

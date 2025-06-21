const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

console.log("🖧 WebSocket server started on ws://localhost:8080");

var store = {};

wss.on("connection", (ws) => {
  let startTime = null;
  let elapsedBeforePause = null;
  let backupInterval = null;
  let interval = null;
  let timer = null;

  console.log("Connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    let id = data.id;
    timer = store[id];

    if (timer == undefined) {
      timer = { elapsed: 0 };
      store[data.id] = timer;
    } else {
      elapsedBeforePause = timer.elapsed;
    }

    switch (data.command) {
      case "start":
        start();
        break;
      case "stop":
        stop();
        break;
      case "pause":
        pause();
        break;
      case "reset":
        reset();
        break;
    }
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
    clearInterval(backupInterval);
    clearInterval(interval);
  });

  function start() {
    if (!interval) {
      startTime = Date.now();
      interval = setInterval(sendElapsedTime, 500);
      backupInterval = setInterval(backup, 5000);
    }
    sendMessage("started");
  }

  function stop() {
    clearInterval(backupInterval);
    clearInterval(interval);
    elapsedBeforePause = 0;
    timer.elapsed = 0;
    interval = null;
    sendMessage("stopped");
  }

  function pause() {
    elapsedBeforePause += Date.now() - startTime;
    clearInterval(interval);
    interval = null;
    startTime = null;
    sendMessage("paused");
  }

  function reset() {
    startTime = Date.now();
    elapsedBeforePause = 0;
    timer.elapsed = 0;
    sendMessage("reset");
  }

  function sendMessage(message) {
    ws.send(JSON.stringify({ type: "message", message }));
  }

  function sendElapsedTime() {
    var elapsed = Date.now() - startTime;
    elapsed += elapsedBeforePause;

    ws.send(JSON.stringify({ type: "tick", elapsed }));
  }

  function backup() {
    var elapsed = Date.now() - startTime;
    elapsed += elapsedBeforePause;
    timer.elapsed = elapsed;
  }
});


// Cree une class qui wrappe chaque timer en fonction de l'id et qui stock les socket

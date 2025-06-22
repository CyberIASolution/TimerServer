const timerList = {};

class Timer {
  #socketList = [];
  #interval = null;
  #elapsed = 0;
  #startTime = null;

  constructor() {}

  addSocket(socket) {
    this.#socketList.push(socket);

    socket.on("start", this.start.bind(this));
    socket.on("pause", this.pause.bind(this));
    socket.on("stop", this.stop.bind(this));
    socket.on("state", this.#sendState.bind(this));
  }

  getState() {
    var stopped = this.#startTime === null && this.#elapsed === null;
    var paused = this.#startTime === null && this.#elapsed !== null;
    var elapsed = this.#elapsed;
    if (this.#startTime)
      elapsed += Date.now() - this.#startTime;

    return { stopped, paused, elapsed };
  }

  start() {
    if (this.#startTime !== null) return;
    this.#startTime = Date.now();
    this.#interval = setInterval(this.#sendElapsedTime.bind(this), 500);
    this.#broadcast("started", this.getState());
    this.#sendState();
  }

  pause() {
    if (this.#startTime === null) return;
    this.#elapsed += Date.now() - this.#startTime;
    this.#startTime = null;
    clearInterval(this.#interval);
    this.#interval = null;
    this.#broadcast("paused", this.getState());
    this.#sendState();
  }

  stop() {
    this.#startTime = null;
    this.#elapsed = 0;
    clearInterval(this.#interval);
    this.#interval = null;
    this.#broadcast("stopped", this.getState());
    this.#sendState();
  }

  #sendState() {
    this.#broadcast("state", this.getState.call(this));
  }

  #sendElapsedTime() {
    const now = Date.now();
    const totalElapsed =
      this.#elapsed + (this.#startTime ? now - this.#startTime : 0);
    this.#broadcast("elapsed", { elapsed: totalElapsed });
  }

  #broadcast(event, data) {
    this.#socketList.forEach((socket) => socket.emit(event, data));
  }
}

function assignTimer(id, socket) {
  if (!timerList[id]) {
    timerList[id] = new Timer();
  }
  timerList[id].addSocket(socket);
}

module.exports = { assignTimer };

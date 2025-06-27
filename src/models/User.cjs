const Timer = require("./Timer.cjs");

var userList = new Map();

class User {
  #id = null;
  #timerList = new Map();

  constructor(id) {
    this.#id = id;
  }

  addTimer(timer) {
    let id = timer.getId();
    if (!this.#timerList.get(id)) {
      this.#timerList.set(id, timer);
    }
  }

  getTimer(timerId) {
    return this.#timerList.get(timerId);
  }

  getTimerList() {
    return this.#timerList;
  }
}

//  For sessoin controller
function createUser(id) {
  if (userList.get(id)) return;
  else userList.set(id, new User(id));
}

function assignSocket(userId, timerId, socket) {
  let user = userList.get(userId);
  if (user == undefined) {
    socket.emit("register:error", "Invalid USER ID");
    return;
  }

  let timer = user.getTimer(timerId);
  if (timer == undefined) {
    timer = new Timer(timerId);
    user.addTimer(timer);
  } else {
    console.log("Timer exist");
  }

  timer.addSocket(socket);
  socket.emit("register:success", "Timer registered");
}

module.exports = User;
module.exports.createUser = createUser;
module.exports.assignSocket = assignSocket;


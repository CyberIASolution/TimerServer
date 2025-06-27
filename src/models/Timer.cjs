class Timer {
	#id = null;
	#socketList = [];
	#interval = null;
	#elapsed = 0;
	#startTime = null;

	constructor(id) {
		this.#id = id;
	}

	getId() {
		return this.#id;
	}

	addSocket(socket) {
		if (!this.#socketList.includes(socket)) {
			this.#socketList.push(socket);
			socket.on("start", this.start.bind(this));
			socket.on("pause", this.pause.bind(this));
			socket.on("stop", this.stop.bind(this));
			socket.on("status", this.#sendState.bind(this));
			socket.on("disconnect", () => {
				this.#socketList = this.#socketList.filter(s => s !== socket);
			});

		}
	}

	getState() {
		var stopped = this.#startTime === null && this.#elapsed === 0;
		var paused = this.#startTime === null && this.#elapsed !== 0;
		var elapsed = this.#elapsed;
		if (this.#startTime)
			elapsed += Date.now() - this.#startTime;

		return { stopped, paused, elapsed };
	}

	start() {
		if (this.#startTime !== null) {
			this.#broadcast("start:error", "Timer already running");
			return;
		}
		this.#startTime = Date.now();
		this.#interval = setInterval(this.#sendElapsedTime.bind(this), 500);
		this.#broadcast("start:success", this.getState());
	}

	pause() {
		if (this.#startTime === null) {
			this.#broadcast("pause:error", "Timer not started");
			return;
		}
		this.#elapsed += Date.now() - this.#startTime;
		this.#startTime = null;
		clearInterval(this.#interval);
		this.#interval = null;
		this.#broadcast("pause:success", this.getState());
	}

	stop() {
		this.#startTime = null;
		this.#elapsed = 0;
		clearInterval(this.#interval);
		this.#interval = null;
		this.#broadcast("stop:success", this.getState());
	}

	#sendState() {
		this.#broadcast("status:success", this.getState.call(this));
	}

	#sendElapsedTime() {
		const now = Date.now();
		const totalElapsed =
			this.#elapsed + (this.#startTime ? now - this.#startTime : 0);
		this.#broadcast("timer:elapsed", { elapsed: totalElapsed });
	}

	#broadcast(event, data) {
		this.#socketList.forEach((socket) => socket.emit(event, data));
	}
}

module.exports = Timer;
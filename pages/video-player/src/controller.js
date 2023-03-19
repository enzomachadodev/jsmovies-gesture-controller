export default class Controller {
	#view;
	#cam;
	#worker;
	#blinkCounter = 0;

	constructor({ view, worker, cam }) {
		this.#view = view;
		this.#cam = cam;
		this.#worker = this.#configureWorker(worker);

		this.#view.configureOnBtnClick(this.onBtnStart.bind(this));
	}

	static async initialize(deps) {
		const controller = new Controller(deps);
		controller.log("Not yet detecting eye blink! click in the button to start");
		return controller.init();
	}

	#configureWorker(worker) {
		let ready = false;

		worker.onmessage = ({ data }) => {
			if (data === "READY") {
				console.log("worker is ready!");
				this.#view.enableButton();
				ready = true;
				return;
			}
			const blinked = data.blinked;
			this.#blinkCounter++;
			this.#view.togglePlayVideo();
			console.log(blinked);
		};

		return {
			send(msg) {
				if (!ready) return;
				worker.postMessage(msg);
			},
		};
	}

	async init() {
		console.log("init controller");
	}

	loop() {
		const video = this.#cam.video;
		const img = this.#view.getVideoFrame(video);
		this.#worker.send(img);
		this.log(`Detectiong eye blink...`);

		setTimeout(() => this.loop(), 100);
	}

	log(text) {
		const times = `     - bliked times: ${this.#blinkCounter}`;
		this.#view.log(`status: ${text}`.concat(this.#blinkCounter ? times : ""));
	}

	onBtnStart() {
		this.log("initialing detection...");
		this.#blinkCounter = 0;
		this.loop();
	}
}

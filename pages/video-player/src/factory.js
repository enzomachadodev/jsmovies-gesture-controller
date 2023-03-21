import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";
import Cam from "../../../lib/shared/cam.js";
import { supportsWorkerType } from "../../../lib/shared/util.js";

async function getWorker() {
	if (supportsWorkerType()) {
		console.log("initializing esm workers");
		const worker = new Worker("./src/worker.js", { type: "module" });
		return worker;
	}

	console.warn("Your browser doesn't support esm modules on webworkers!");
	console.warn("Importing libraries...");

	await import("https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js");
	await import("https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js");
	await import(
		"https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js"
	);
	await import("https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js");

	console.warn("using worker mock instead!");

	const service = new Service({
		faceLandmarksDetection: window.faceLandmarksDetection,
	});

	const workerMock = {
		async postMessage(video) {
			const blinked = await service.handBlinked(video);
			if (!blinked) return;
			workerMock.onmessage({ data: { blinked } });
		},
		onmessage(msg) {},
	};

	console.log("loading tf model...");

	await service.loadModel();

	console.log("tf model loaded!");

	setTimeout(() => {
		worker.onmessage({ data: "READY" });
	}, 2000);

	console.log("nao suporta");

	return workerMock;
}

const view = new View();
const [rootPath] = window.location.href.split("/pages/");
view.setVideoSrc(`${rootPath}/assets/video-jsmovies.mp4`);

const worker = await getWorker();

const cam = await Cam.init();

const factory = {
	async initalize() {
		return Controller.initialize({
			view: new View(),
			worker,
			cam,
		});
	},
};

export default factory;

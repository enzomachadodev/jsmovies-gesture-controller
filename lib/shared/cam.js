export default class Cam {
	constructor() {
		this.video = document.createElement("video");
	}
	static async init() {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			throw new Error(`Browser API navigator.mediaDevices.getUserMedia not avaliable`);
		}

		const videoConfig = {
			audio: false,
			video: {
				width: globalThis.screen.availWidth,
				height: globalThis.screen.availHeight,
				frameRate: {
					ideal: 60,
				},
			},
		};

		const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
		const cam = new Cam();
		cam.video.srcObject = stream;

		cam.video.height = 240;
		cam.video.width = 320;
		document.body.append(cam.video);

		await new Promise((resolve) => {
			cam.video.onloadedmetadata = () => {
				resolve(cam.video);
			};
		});

		cam.video.play();

		return cam;
	}
}

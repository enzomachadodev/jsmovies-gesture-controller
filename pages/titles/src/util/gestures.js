const { GestureDescription, Finger, FingerCurl, FingerDirection } = window.fp;

const ScrollDownGesture = new GestureDescription("scroll-down"); // ✊️
const ScrollUpGesture = new GestureDescription("scroll-up"); // 🖐
const RockGesture = new GestureDescription("rock'n roll"); //🤟
const DontGesture = new GestureDescription("not"); //🙅‍♂️
const ClickGesture = new GestureDescription("click"); // 🤏

// ScrollDownGesture
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
	ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
	ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// ScrollUpGesture
// -----------------------------------------------------------------------------

// no finger should be curled
for (let finger of Finger.all) {
	ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
	ScrollUpGesture.addCurl(finger, FingerDirection.VerticalUp, 1.0);
}

//Rock'n Roll Gesture

RockGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);
RockGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
RockGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
RockGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

for (let finger of [Finger.Thumb, Finger.Index, Finger.Pinky]) {
	RockGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

//Dont gesture

for (let finger of Finger.all) {
	DontGesture.addCurl(finger, FingerDirection.DiagonalUpRight, 1.0);
	DontGesture.addCurl(finger, FingerDirection.DiagonalUpLeft, 1.0);

	DontGesture.addCurl(finger, FingerDirection.HorizontalUpRight, 1.0);
	DontGesture.addCurl(finger, FingerDirection.HorizontalUpLeft, 1.0);
}

//Click

ClickGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.8);
ClickGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 0.5);

ClickGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ClickGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.4);

ClickGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
ClickGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.9);

ClickGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0);
ClickGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.9);

ClickGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);
ClickGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.9);

const knowGestures = [ScrollDownGesture, DontGesture, RockGesture, ScrollUpGesture, ClickGesture];

const gestureStrings = {
	"scroll-up": "🖐",
	"scroll-down": "✊️",
	"rock'n roll": "🤟",
	not: "🙅‍♂️",
	click: "🤏",
};

export { knowGestures, gestureStrings };

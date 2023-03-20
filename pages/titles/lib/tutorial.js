const tutorialModal = document.querySelector(".tutorial-modal-overlay");

const tipBtn = document.querySelector("#help-gesture-btn");
tipBtn.addEventListener("click", () => {
	tutorialModal.classList.toggle("active");
});

const closeTip = document.querySelector(".close-tutorial-modal");
closeTip.addEventListener("click", () => {
	tutorialModal.classList.toggle("active");
});

let slides = document.getElementsByClassName("mySlides");

let current = 0;
let length = slides.length;

function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("mySlides");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex - 1].style.display = "block";
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides((slideIndex += n));
}

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

nextBtn.addEventListener("click", (e) => {
	plusSlides(1);
});

prevBtn.addEventListener("click", (e) => {
	plusSlides(-1);
});

const finalBtn = document.querySelector(".final-tutorial-btn");
finalBtn.addEventListener("click", () => {
	tutorialModal.classList.toggle("active");
});

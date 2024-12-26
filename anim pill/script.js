// This function scales the container to fit the screen.
function scaleContainer () {
	const container = document.getElementById("animation-container");
	const scale = Math.min(window.innerWidth / 1200, window.innerHeight / 1005);
	container.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", scaleContainer);
scaleContainer();

// This function creates the animation.
document.addEventListener("DOMContentLoaded", () => {
	const getCoordinatesRandomValue = () => Math.random() * 20 - 10;
	const getDurationRandomValue = () => 2 + Math.random() * 1;
	const getRotationRandomValue = () => Math.random() * 20 - 10;

	// This function creates the animation for each component.
	document.querySelectorAll(".component").forEach((component) => {
		const tl = gsap.timeline({ repeat: -1, yoyo: true });

		tl.to(component, {
			y: `+=${getCoordinatesRandomValue()}`,
			x: `+=${getCoordinatesRandomValue()}`,
			rotation: `+=${getRotationRandomValue()}`,
			duration: getDurationRandomValue(),
			ease: "sine.inOut",
		})
			.to(component, {
				y: `+=${getCoordinatesRandomValue()}`,
				x: `+=${getCoordinatesRandomValue()}`,
				rotation: `+=${getRotationRandomValue()}`,
				duration: getDurationRandomValue(),
				ease: "sine.inOut",
			})
			.to(component, {
				y: `+=${getCoordinatesRandomValue()}`,
				x: `+=${getCoordinatesRandomValue()}`,
				rotation: `+=${getRotationRandomValue()}`,
				duration: getDurationRandomValue(),
				ease: "sine.inOut",
			});
	});

	gsap.timeline()
		.to(".components", {
			scale: 0,
			rotation: 360,
			duration: 2,
			ease: "linear",
		}, "+=5")
		.from(".images", {
			scale: 0,
			duration: 2,
			ease: "linear",
		}, "+=2")
		.from(".logo", {
			x: -400,
			duration: 1,
		}, "+=0.6");
});

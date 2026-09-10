// Close the mobile nav after tapping a link.
document.addEventListener("DOMContentLoaded", function () {
	var toggle = document.getElementById("nav-toggle");
	if (toggle) {
		document.querySelectorAll(".site-nav a").forEach(function (link) {
			link.addEventListener("click", function () {
				toggle.checked = false;
			});
		});
	}

	var slider = document.querySelector("[data-testimonials]");
	if (!slider) return;
	var slides = slider.querySelectorAll(".testimonial-slide");
	var dots = slider.querySelectorAll(".testimonial-dot");
	var current = 0;
	var timer;

	function showSlide(index) {
		current = (index + slides.length) % slides.length;
		slides.forEach(function (slide, slideIndex) {
			var active = slideIndex === current;
			slide.hidden = !active;
			slide.classList.toggle("is-active", active);
		});
		dots.forEach(function (dot, dotIndex) {
			var active = dotIndex === current;
			dot.classList.toggle("is-active", active);
			dot.setAttribute("aria-selected", active ? "true" : "false");
		});
	}

	function startRotation() {
		clearInterval(timer);
		timer = setInterval(function () { showSlide(current + 1); }, 6500);
	}

	slider.querySelector("[data-testimonial-prev]").addEventListener("click", function () {
		showSlide(current - 1);
		startRotation();
	});
	slider.querySelector("[data-testimonial-next]").addEventListener("click", function () {
		showSlide(current + 1);
		startRotation();
	});
	dots.forEach(function (dot, dotIndex) {
		dot.addEventListener("click", function () {
			showSlide(dotIndex);
			startRotation();
		});
	});
	slider.addEventListener("mouseenter", function () { clearInterval(timer); });
	slider.addEventListener("mouseleave", startRotation);
	slider.addEventListener("focusin", function () { clearInterval(timer); });
	slider.addEventListener("focusout", function (event) {
		if (!slider.contains(event.relatedTarget)) startRotation();
	});

	if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		startRotation();
	}
});

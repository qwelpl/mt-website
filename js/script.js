// Close the mobile nav after tapping a link.
document.addEventListener("DOMContentLoaded", function () {
	var toggle = document.getElementById("nav-toggle");
	if (!toggle) return;
	document.querySelectorAll(".site-nav a").forEach(function (link) {
		link.addEventListener("click", function () {
			toggle.checked = false;
		});
	});
});

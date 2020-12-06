$(".alert").hide();
let urlShortnerButton = document.querySelector(".urlShortnerButton");

let urlShortnerUrl = "https://shotlyurl.herokuapp.com/urlShortner";

let url = document.getElementById("urlInput");

let logoutUrl = "https://password-reset-api.herokuapp.com/logout";

$(".sucessfullLogin").show();

function isValidUrl(string) {
	try {
		new URL(string);
	} catch (_) {
		return false;
	}
	return true;
}

(async () => {
	setTimeout(function () {
		$(".alert").alert("close");
	}, 1000);
	let form = document.querySelector("#urlShortnerForm");

	form.addEventListener("input", (e) => {
		if (url.value.length > 0) {
			urlShortnerButton.removeAttribute("disabled");
		} else {
			urlShortnerButton.setAttribute("disabled", "disabled");
		}
	});

	form.addEventListener("submit", checkOnSubmit, true);
})();

let logoutButton = document.querySelector("#logout");

async function logout() {
	const response = await fetch(logoutUrl);

	let data = await response.json();

	if (!data.loggedIn) {
		location.href = "../index.html";
	}
}

logoutButton.addEventListener("click", (e) => {
	e.preventDefault();
	logout();
});

async function checkOnSubmit() {
	let urlShortnerButtonDiv = document.querySelector(".urlShortnerButtonDiv");

	if (isValidUrl(url.value)) {
		$(".validUrl").show();
		let body = {
			fullUrl: url.value,
		};

		const response = await fetch(urlShortnerUrl, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		let data = await response.json();
		if (data != null) {
			let shortUrlLink = document.getElementById("shortUrlLink");
			let redirectLink = urlShortnerUrl + "/" + data.short;
			shortUrlLink.innerHTML = `<a href=${redirectLink}>${redirectLink}</a>`;
			$("#shortUrlModal").modal("show");
		}

		console.log(data);
	} else {
		$(".invalidUrl").show();
		$("form :input").val("");
	}
	setTimeout(function () {
		$(".alert").alert("close");
	}, 1000);
}

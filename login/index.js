$(".alert").hide();

let loginUrl = "https://password-reset-api.herokuapp.com/login";

//let loginUrl = "http://localhost:8000/login";

(async () => {
	const response = await fetch(loginUrl, { credentials: "include" });
	let data = await response.json();

	console.log(data);

	if (data.loggedIn) {
		location.href = "welcome.html";
	}
})();

let email = document.getElementById("username");

let password = document.getElementById("password");

let loginButton = document.querySelector(".loginButton");
(async () => {
	let form = document.querySelector("#loginForm");

	form.addEventListener("input", (e) => {
		if (email.value.length > 0 && password.value.length > 0) {
			loginButton.removeAttribute("disabled");
		} else {
			loginButton.setAttribute("disabled", "disabled");
		}
	});

	form.addEventListener("submit", checkOnSubmit, true);
})();

async function checkOnSubmit() {
	let loginButtonDiv = document.querySelector("#loginButtonDiv");

	loginButtonDiv.innerHTML = `<button class=" w-100 btn btn-outline-dark py-2" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>`;

	let body = {
		username: email.value,
		password: password.value,
	};

	const response = await fetch(loginUrl, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	});

	let data = await response.json();

	if (data.loggedIn) {
		location.href = "../urlShortner/urlShortner.html";
	} else {
		$(".alert").show();
		setTimeout(() => {
			$(".alert").hide();
			location.reload();
		}, 1500);
	}
}

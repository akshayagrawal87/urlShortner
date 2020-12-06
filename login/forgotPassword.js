let forgetPasswordUrl =
	"https://password-reset-api.herokuapp.com/forgotPassword";

$(".alert").hide();

let email = document.getElementById("username");

let resetButton = document.querySelector(".resetButton");
(async () => {
	let form = document.querySelector("#forgetPasswordForm");

	form.addEventListener("input", (e) => {
		if (email.value.length > 0) {
			resetButton.removeAttribute("disabled");
		} else {
			resetButton.setAttribute("disabled", "disabled");
		}
	});

	form.addEventListener("submit", checkOnSubmit, true);
})();

async function checkOnSubmit() {
	resetButton.innerHTML = ` <span class="spinner-grow spinner-grow-sm"></span>
  Loading..`;

	let body = {
		username: email.value,
	};

	const response = await fetch(forgetPasswordUrl, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	});

	let data = await response.json();

	if (data.linkSent) {
		location.href = "outputPages/linkSent.html";
	} else {
		let alertMesssge = document.querySelector(".alertMessage");
		alertMesssge.innerHTML = data.message;

		$(".alert").show();
		setTimeout(() => {
			$(".alert").hide();
		}, 6000);
	}
}

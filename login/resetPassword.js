let resetUrl =
	"https://password-reset-api.herokuapp.com/forgotPassword/changePassword";

$(".alert").hide();

let email = document.getElementById("username");

let password = document.getElementById("password");

let resetButton = document.querySelector(".resetButton");

(async () => {
	let form = document.querySelector("#resetPasswordForm");

	form.addEventListener("input", (e) => {
		if (email.value.length > 0 && password.value.length > 0) {
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
		password: password.value,
	};

	const response = await fetch(resetUrl, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	});

	let data = await response.json();

	if (data.changed) {
		location.href = "outputPages/passwordChangeSuccess.html";
	} else {
		let alertMesssge = document.querySelector(".alertMessage");
		alertMesssge.innerHTML = data.message;

		$(".alert").show();
		await setTimeout(() => {
			$(".alert").hide();
		}, 9000);

		setTimeout(() => {
			location.href = "outputPages/passwordChangeFailed.html";
		}, 3000);
	}
}

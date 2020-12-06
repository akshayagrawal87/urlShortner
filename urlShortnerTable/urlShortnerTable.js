let urlShortnerTableBody = document.querySelector("#urlShortnerTableBody");

let urlShortnerUrl = "https://shotlyurl.herokuapp.com/urlShortner";

let logoutUrl = "https://password-reset-api.herokuapp.com/logout";

(async () => {
	const response = await fetch(urlShortnerUrl);

	let data = await response.json();

	console.log(data);

	for (let i = 0; i < data.length; i++) {
		let tr = document.createElement("tr");

		let th = document.createElement("th");
		th.setAttribute("scope", "row");

		th.innerText = i + 1;

		let td1 = document.createElement("td");
		td1.innerHTML = `<a href=${data[i].full}>${data[i].full}</a>`;

		let redirectLink = urlShortnerUrl + "/" + data[i].short;

		let td2 = document.createElement("td");
		td2.innerHTML = `<a href=${redirectLink}>${redirectLink}</a>`;

		let td3 = document.createElement("td");
		td3.innerText = data[i].clicks;

		tr.appendChild(th);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);

		urlShortnerTableBody.appendChild(tr);
	}
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

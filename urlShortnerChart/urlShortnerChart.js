let urlShortnerUrl = "https://shotlyurl.herokuapp.com/urlShortner/chartData";

let logoutUrl = "https://password-reset-api.herokuapp.com/logout";

(async () => {
	const response = await fetch(urlShortnerUrl);

	let data = await response.json();
	let dates = [];
	let value = [];

	for (let a in data) {
		dates.push(a);
	}

	for (let a of dates) {
		value.push(data[a]);
	}

	var ctx = document.getElementById("myChart").getContext("2d");
	var chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: dates,
			datasets: [
				{
					label: "Short Urls Created Per Month",
					backgroundColor: "rgb(225, 69, 74)",
					borderColor: "rgb(255, 99, 132)",
					data: value,
				},
			],
		},

		// Configuration options go here
		options: {},
	});
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

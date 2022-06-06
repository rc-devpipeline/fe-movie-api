class Header extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
		<style>
			.header-nav-container {
				font-family: 'Roboto', sans-serif;
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				grid-template-rows: 60px;
				align-items: center;
				height: 60px;
				background-color: #27383e;
				color: #aaaaaa;
				font-size: 1.25rem;
			}
			
			.header-nav-container .header-left {
				align-self: start;
			}

			.header-nav-container .header-left img {
				height: 60px;
				transition: all 0.3s ease-in-out;
				filter: invert(50%);
			}
			
			.header-nav-container .header-left a img:hover {
				filter: invert(70%);
			}

			.header-nav-container .header-center {
				width: 33%;
				justify-self: center;

			}

			.header-nav-container .header-right {
				display: flex;
				justify-content: space-between;
				justify-self: end;
				width: 50%;
			}
			
			.header-nav-container .header-right .nav-item {
			width: 100%;
			}

			.header-nav-container .header-right .nav-item a {
				transition: all 0.3s ease-in-out;
			}

			.header-nav-container .header-right .nav-item a:hover {
				letter-spacing: 1.5px;
				color: white;
			}
		</style>
		<div class="header-nav-container">
		<div class="header-left">
			<a href="/">
				<img src="./static/images/logos/dc_long.png" alt="Movie API" />
			</a>
		</div>

		<div class="header-center">
			<h1>${this.formatPath()}</h1>
		</div>

		<div class="header-right">
			<div class="nav-item">
				<a href="/">Home</a>
			</div>

			<div class="nav-item">
				<a href="/login">Login</a>
			</div>

			<div class="nav-item">
				<a href="/register">Register</a>
			</div>
		</div>
`;
	}

	formatPath() {
		if (window.location.pathname === "/") {
			return "Home";
		}

		return (
			window.location.pathname[1].toUpperCase() +
			window.location.pathname.slice(2).toLowerCase()
		);
	}
}

customElements.define("header-component", Header);

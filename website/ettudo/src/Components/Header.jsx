function Header() {
	return (
		<section className="Navbar">
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<a className="navbar-brand mx-4" href="#">Ettudo</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav mx-auto">
						<li className="nav-item active">
							<a className="nav-link" href="#">Home</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Analyse</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Export</a>
						</li>
					</ul>
				</div>
			</nav>
		</section>
	)
}

export default Header
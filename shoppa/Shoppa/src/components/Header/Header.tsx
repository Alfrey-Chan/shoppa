import { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import styles from "./Header.module.css";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className={`${styles.header} ${isMenuOpen ? styles.extended : ""}`}>
			<nav
				className={`${styles.nav} ${isMenuOpen ? styles.extended : ""}`}
				aria-label="Main navigation"
			>
				{/* Logo */}
				<Link to="/home" className={styles.logo}>
					<span className={styles.logoMark}></span>
					<span className={styles.logoText}>TabiGoods</span>
				</Link>

				{/* Navigation links */}
				<ul className={`${styles.links} ${isMenuOpen ? styles.show : ""}`}>
					<li>
						<a href="#how-it-works">How it works</a>
					</li>
					<li>
						<a href="#ideas">Ideas</a>
					</li>
					<li>
						<a href="#faq">FAQ</a>
					</li>
					<li>
						<a href="#contact">Contact</a>
					</li>
					<li>
						{/* Language toggle */}
						<div className="language-toggle">
							<button className="language-btn">English</button>
							<ul className={styles.languageDropDown}>
								<li>English</li>
								<li>日本語</li>
							</ul>
						</div>
					</li>
				</ul>

				{/* Hamburger button */}
				<HamburgerButton
					isOpen={isMenuOpen}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				/>
			</nav>
		</header>
	);
};

export default Header;

import { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import styles from "./Header.module.css";
import { useLanguage } from "../../contexts/LanguageContext";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { lang: currentLang, t } = useLanguage();

	return (
		<header className={`${styles.header} ${isMenuOpen ? styles.extended : ""}`}>
			<nav
				className={`${styles.nav} ${isMenuOpen ? styles.extended : ""}`}
				aria-label="Main navigation"
			>
				{/* Logo */}
				<Link to={`/${currentLang}`} className={styles.logo}>
					<span className={styles.logoMark}></span>
					<span className={styles.logoText}>TabiGoods</span>
				</Link>

				{/* Navigation links */}
				<ul className={`${styles.links} ${isMenuOpen ? styles.show : ""}`}>
					<li>
						<a href="#how-it-works">{t.header.howItWorks}</a>
					</li>
					<li>
						<a href="#ideas">{t.header.ideas}</a>
					</li>
					<li>
						<a href="#faq">{t.header.faq}</a>
					</li>
					<li>
						<a href="#contact">{t.header.contact}</a>
					</li>
					<li>
						{/* Language toggle */}
						<div className="language-toggle">
							<button className="language-btn">{currentLang === 'jp' ? '日本語' : 'English'}</button>
							<ul className={styles.languageDropDown}>
								<li><Link to="/en">English</Link></li>
								<li><Link to="/jp">日本語</Link></li>
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

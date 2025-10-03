import styles from "./HamburgerButton.module.css";

interface HamburgerButtonProps {
	isOpen: boolean;
	onClick: () => void;
}

const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
	return (
		<button
			className={`${styles.hamburger} ${isOpen ? styles.isActive : ""}`}
			onClick={onClick}
			aria-label="menu"
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};

export default HamburgerButton;

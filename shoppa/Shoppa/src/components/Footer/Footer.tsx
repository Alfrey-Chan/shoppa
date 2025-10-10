import styles from "./Footer.module.css";
import { useLanguage } from "../../contexts/LanguageContext";

const Footer = () => {
	const { t } = useLanguage();

	return (
		<div className={styles.footer}>
			<p>{t.footer.copyright}</p>
		</div>
	)
}

export default Footer;
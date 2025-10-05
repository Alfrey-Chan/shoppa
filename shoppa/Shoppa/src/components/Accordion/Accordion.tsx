import { useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionProps {
	question: string;
	answer: string;
}

const Accordion = ({ question, answer }: AccordionProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.accordion}>
			<button className={styles.question} onClick={() => setIsOpen(!isOpen)}>
                {question}
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					className={isOpen ? styles.iconOpen : styles.icon}
				>
					<path
						d="M4 6l4 4 4-4"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
					/>
				</svg>
			</button>
			{isOpen && <p className={styles.answer}>{answer}</p>}
		</div>
	);
};

export default Accordion;

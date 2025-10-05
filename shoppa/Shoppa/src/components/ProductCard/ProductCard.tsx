import styles from "./ProductCard.module.css";

interface ProductCardProps {
	imgPath: string;
	caption?: string;
}

const ProductCard = ({ imgPath, caption}: ProductCardProps) => {
	return (
		<div className={styles.card}>
			<img src={imgPath} alt="product image" />
			{caption && <p className={styles.caption}>{caption}</p>}
		</div>
	);
};

export default ProductCard;

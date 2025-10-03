import Hero from "../components/Hero/Hero";
import styles from "./HomePage.module.css";

const HomePage = () => {
	return (
		<div className={styles.container}>
			<Hero />

			{/* How it works */}
			<section className={styles.section}>
				<h2 className={styles.sectionHeading}>How it works (3 steps)</h2>

				<div className={styles.sectionContainer}>
					<div className={styles.stepper}>
						<div className={styles.stepItems} role="list">
							<article className={styles.stepItem} role="listitem">
								<div className={styles.icon} aria-hidden="true">
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
										<path
											d="M4 5h16M4 12h16M4 19h10"
											stroke="#6b2d00"
											strokeWidth="1.5"
										/>
									</svg>
								</div>
								<div className={styles.stepText}>
									<h3>1. Request & Chat</h3>
									<p>
										Tell us what you want (links, photos, details). We connect
										you with a shopper in Japan to confirm availability and
										options.
									</p>
								</div>
							</article>

							<article className={styles.stepItem} role="listitem">
								<div className={styles.icon} aria-hidden="true">
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
										<path
											d="M3 7h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
											stroke="#6b2d00"
											strokeWidth="1.5"
										/>
										<path d="M3 9h18" stroke="#6b2d00" strokeWidth="1.5" />
									</svg>
								</div>
								<div className={styles.stepText}>
									<h3>2. Quote, Pay & Set Pickup</h3>
									<p>
										We send a total price <em>(item + JP fees + service)</em>{" "}
										and payment options. Once paid, we agree on a time & place
										to pick up in the Lower Mainland.
									</p>
								</div>
							</article>

							<article className={styles.stepItem} role="listitem">
								<div className={styles.icon} aria-hidden="true">
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none">
										<path
											d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
											stroke="#6b2d00"
											strokeWidth="1.5"
											fill="none"
										/>
									</svg>
								</div>
								<div className={styles.stepText}>
									<h3>3. We Shop & Meet</h3>
									<p>
										Your shopper buys the item in Japan and brings it to BC.
										Meet at the confirmed spot—no international shipping.
									</p>
								</div>
							</article>
						</div>
					</div>
				</div>

				<div className={styles.sectionContainer}>
					<div className={styles.locationsRow}>
						<div className={styles.locationsHeader}>
							<div className={styles.icon} aria-hidden="true">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
									<path
										d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
										stroke="#6b2d00"
										strokeWidth="1.5"
										fill="none"
									/>
								</svg>
							</div>
							<div className={styles.locationsText}>
								<h3>Lower Mainland meetup only</h3>
								<p>
									Your shopper buys the item in Japan and brings it to BC. Meet
									at the confirmed spot—no international shipping.
								</p>
							</div>
						</div>
					</div>

					<div className={styles.locationsRow}>
						<div className={styles.locationsPills}>
							<span>Vancouver</span>
							<span>Burnaby</span>
							<span>Richmond</span>
							<span>North Vancouver</span>
							<span>West Vancouver</span>
							<span>New Westminster</span>
							<span>Surrey</span>
							<span>Delta</span>
							<span>Coquitlam</span>
							<span>Port Coquitlam</span>
							<span>Port Moody</span>
							<span>Langley</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;

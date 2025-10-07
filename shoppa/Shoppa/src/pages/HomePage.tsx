import Hero from "../components/Hero/Hero";
import styles from "./HomePage.module.css";
import ProductCard from "../components/ProductCard/ProductCard";
import Accordion from "../components/Accordion/Accordion";
import { useState } from "react";

const HomePage = () => {
	const [showModal, setShowModal] = useState(false);
	const [uploadedImages, setUploadedImages] = useState<File[]>([]);
	const [requestFormData, setRequestFormData] = useState({
		email: "",
		requestDetails: "",
		pickupCity: "",
	});
	const [contactFormData, setContactFormData] = useState({
		email: "",
		topic: "",
		message: "",
	});

	// Request form states
	const [requestSubmitting, setRequestSubmitting] = useState(false);
	const [requestError, setRequestError] = useState<string | null>(null);
	const [requestSuccess, setRequestSuccess] = useState<string | null>(null);

	// Contact form states
	const [contactSubmitting, setContactSubmitting] = useState(false);
	const [contactError, setContactError] = useState<string | null>(null);
	const [contactSuccess, setContactSuccess] = useState<string | null>(null);

	const picturePaths = [
		"snackbundle.jpg",
		"snacks.jpg",
		"royce.jpg",
		"pringles.jpg",
		"kitkat.jpg",
		"mango.jpg",
		"cosmetics.jpg",
		"frypan.jpg",
		"suito.jpg",
	];

	const FAQ = {
		"How is total pricing calculated?":
			"Your quote includes the original item price (converted to CAD) plus our service fee.",
		"How is the service fee calculated?":
			"There is a base service fee of $25, which may increase for large orders or requests involving multiple stores or categories.",
		"Are there any item restrictions?":
			"Oversized items may not be accepted. Please inquire via the contact form or submit a request, and we'll confirm if we can accommodate your item.",
		"What payment methods do you accept?":
			"We currently only accept Interac e-Transfer.",
		"Do you do delivery?":
			"No, we arrange a time and place to meet up so we can hand off the items directly to you",
		"Where and when do meets up happen?":
			"We'll coordinate via email to arrange a time and location that works for you. We recommend safe designated transaction areas offered by police stations, but malls and skytrain stations are also an option.",
		"Do you offer refunds?":
			"Unfortunately, we do not offer refunds. All sales are final once payment is received.",
	};

	const handleRequestSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setRequestSubmitting(true);
		setRequestError(null);
		setRequestSuccess(null);

		const formData = new FormData();

		formData.append("email", requestFormData.email);
		formData.append("request_details", requestFormData.requestDetails);
		formData.append("pickup_city", requestFormData.pickupCity);

		uploadedImages.forEach((file) => {
			formData.append("images[]", file);
		});

		const url = `${import.meta.env.VITE_API_URL}/api/request`;
		try {
			const response = await fetch(url, {
				method: "POST",
				body: formData,
			});

			const data = await response.json();

			if (response.status === 422) {
				const errorMessages = Object.values(data.errors).flat().join(", ");
				setRequestError(errorMessages);
				return;
			}

			if (!response.ok) {
				setRequestError("Something went wrong. Please try again.");
				return;
			}

			// Success
			setRequestSuccess(
				"Request submitted successfully! We'll respond within 24 hours."
			);
			setRequestFormData({ email: "", requestDetails: "", pickupCity: "" });
			setUploadedImages([]);
		} catch (error) {
			setRequestError("Server error. Please check your connection.");
		} finally {
			setRequestSubmitting(false);
		}
	};

	const handleContactSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setContactSubmitting(true);
		setContactError(null);
		setContactSuccess(null);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/contact`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(contactFormData),
				}
			);

			const data = await response.json();

			if (response.status === 422) {
				const errorMessages = Object.values(data.errors).flat().join(", ");
				setContactError(errorMessages);
				return;
			}

			if (!response.ok) {
				setContactError("Something went wrong. Please try again.");
				return;
			}

			// Success
			setContactSuccess(
				"Message sent successfully! We'll respond within 24 hours."
			);
			setContactFormData({ email: "", topic: "", message: "" });
		} catch (error) {
			setContactError("Server error. Please try again later.");
		} finally {
			setContactSubmitting(false);
		}
	};

	return (
		<div className={styles.container}>
			{/* Important Notice Banner */}
			<div className={styles.importantBanner}>
				<p>
					<span>
						Accepting orders until{" "}
						<strong className={styles.highlightDate}>Dec 25th</strong>
					</span>
					<span className={styles.separator}>|</span>
					<span>
						Pickup Period:{" "}
						<strong className={styles.highlightDate}>Jan 12 - Jan 25</strong>
					</span>
				</p>
			</div>

			<Hero
				title="Shop from any store in Japan.<br />We'll deliver to BC."
				subtitle="Tell us what you want, get a quote, pay, and meet locally for pickup
                    — simple, transparent, and affordable.<br />No expensive international shipping fees."
				ctaBtnText="Get Started"
				onClick={() => setShowModal(!showModal)}
			/>

			{/* Modal Request Form */}
			<div className={`${styles.overlay} ${showModal ? styles.showModal : ""}`}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h3 className={styles.modalTitle}>Start your request</h3>

						<button
							className={styles.closeModalBtn}
							onClick={() => setShowModal(!showModal)}
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M18 6L6 18M6 6l12 12"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
						</button>
					</div>

					<form onSubmit={handleRequestSubmit} className={styles.modalForm}>
						<div className={styles.inputGroup}>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="you@example.com"
								value={requestFormData.email}
								onChange={(e) =>
									setRequestFormData({
										...requestFormData,
										email: e.target.value,
									})
								}
								required
							/>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor="requestDetails">Your request details</label>
							<textarea
								id="requestDetails"
								name="requestDetails"
								placeholder="Tell us what you want! Include product links, photos, or specific details (brand, size, color, etc.)"
								value={requestFormData.requestDetails}
								onChange={(e) =>
									setRequestFormData({
										...requestFormData,
										requestDetails: e.target.value,
									})
								}
								required
							/>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor="location">Pickup city</label>
							<select
								id="location"
								name="location"
								value={requestFormData.pickupCity}
								onChange={(e) =>
									setRequestFormData({
										...requestFormData,
										pickupCity: e.target.value,
									})
								}
								required
							>
								<option value="" disabled>
									Select one
								</option>
								<option value="Burnaby">Burnaby</option>
								<option value="Richmond">Richmond</option>
								<option value="West Vancouver">West Vancouver</option>
								<option value="New Westminster">New Westminster</option>
								<option value="Surrey">Surrey</option>
								<option value="Coquitlam">Coquitlam</option>
								<option value="Port Coquitlam">Port Coquitlam</option>
								<option value="Port Moody">Port Moody</option>
								<option value="Langley">Langley</option>
							</select>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor="images">Upload image (optional, max 5)</label>
							<input
								type="file"
								id="images"
								name="images"
								accept="image/jpeg,image/png,image/jpg"
								multiple
								onChange={(e) => {
									if (e.target.files) {
										const newFiles = Array.from(e.target.files);
										setUploadedImages([...uploadedImages, ...newFiles]);
									}
								}}
							/>

							{uploadedImages.length > 0 && (
								<div className={styles.imagePreview}>
									<div className={styles.imageList}>
										{uploadedImages.map((file, index) => (
											<div key={index} className={styles.imageItem}>
												<span className={styles.fileName}>{file.name}</span>
												<button
													type="button"
													className={styles.removeBtn}
													onClick={() => {
														setUploadedImages(
															uploadedImages.filter((_, i) => i !== index)
														);
													}}
												>
													✕
												</button>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{requestError && <div className={styles.formError}>{requestError}</div>}

						{requestSuccess && (
							<div className={styles.formSuccess}>{requestSuccess}</div>
						)}

						<div className={styles.modalFooter}>
							<button
								type="submit"
								className={styles.requestSubmitBtn}
								disabled={requestSubmitting}
							>
								{requestSubmitting ? "Submitting..." : "Submit request"}
							</button>
							<p>We typically respond within 24 hours.</p>
						</div>
					</form>
				</div>
			</div>

			{/* How it works */}
			<section id="how-it-works" className={styles.section}>
				<h2 className={styles.sectionHeader}>How it works (3 steps)</h2>

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
										We provide a quote <em>(item cost + service fee)</em> and
										payment instructions. Once paid, we agree on a time & place
										to pick up in the Great Vancouver area.
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
								<h3>Meetup locations</h3>
								<p>Service available in these Greater Vancouver locations:</p>
							</div>
						</div>
					</div>

					<div className={styles.locationsRow}>
						<div className={styles.locationsPills}>
							<span>Vancouver</span>
							<span>Burnaby</span>
							<span>Richmond</span>
							<span>West Vancouver</span>
							<span>New Westminster</span>
							<span>Surrey</span>
							<span>Coquitlam</span>
							<span>Port Coquitlam</span>
							<span>Port Moody</span>
							<span>Langley</span>
						</div>
					</div>
				</div>
			</section>

			{/* Recommendations */}
			<section
				id="ideas"
				className={`${styles.section} ${styles.recommendationsSection}`}
			>
				<h2 className={styles.sectionHeader}>What we can get for you</h2>

				<div className={styles.borderLine}></div>

				<p className={styles.sectionSubheader}>
					Popular Japanese snacks, treats, and other authentic goods you can't
					find in the Lower Mainland.
					<br />
					<br />
					Not sure what to get? Here are some ideas.
				</p>

				<div className={styles.popularRequests}>
					<p className={styles.popularRequestsTitle}>Popular requests:</p>
					<ul className={styles.requestsList}>
						<li>
							<strong>Snack Mix</strong> — Share your budget and we'll curate
							authentic Japanese snacks you won't find locally
						</li>
						<li>
							<strong>Royce Chocolates</strong> — Premium chocolates exclusive
							to Japan
						</li>
						<li>
							<strong>Tokyo Banana</strong> — The iconic Japanese souvenir snack
						</li>
						<li>
							<strong>Cosmetics</strong> — Makeup, skincare, shampoo, and beauty
							products
						</li>
						<li>
							<strong>Stationery</strong> — High-quality Japanese pens, markers,
							and notebooks
						</li>
						<li>
							<strong>Fashion</strong> — GU, UNIQLO, BAPE, MUJI, and more
						</li>
						<li>
							<strong>Anime Figures</strong> — Gundam, Demon Slayer, One Piece,
							and other collectibles
						</li>
					</ul>
				</div>

				<div className={styles.cards}>
					{picturePaths.map((path) => (
						<ProductCard key={path} imgPath={`/${path}`} />
					))}
				</div>
			</section>

			{/* FAQ */}
			<section id="faq" className={styles.section}>
				<h2 className={styles.sectionHeader}>FAQ</h2>
				<div className={styles.borderLine}></div>

				<div className={styles.faq}>
					{Object.entries(FAQ).map(([question, answer]) => (
						<Accordion key={question} question={question} answer={answer} />
					))}
				</div>
			</section>

			{/* Contact */}
			<section id="contact" className={styles.section}>
				<h2 className={styles.sectionHeader}>Contact</h2>

				<div className={styles.borderLine}></div>

				<div className={`${styles.contactContainer}`}>
					<form onSubmit={handleContactSubmit} id="#contact">
						<div className={styles.contactHeader}>
							Have a question? Send us a message. For a price quote or to begin
							your request,{" "}
							<b
								onClick={() => setShowModal(true)}
								style={{ cursor: "pointer", color: "var(--accent)" }}
							>
								click here
							</b>{" "}
							to get started
						</div>

						<div className="inputGroup">
							<label htmlFor="email">
								Email <span className={styles.asterick}>*</span>
							</label>
							<input
								type="email"
								id="email"
								value={contactFormData.email}
								onChange={(e) =>
									setContactFormData({
										...contactFormData,
										email: e.target.value,
									})
								}
								required
							/>
						</div>

						<div className="inputGroup">
							<label htmlFor="topic">
								Topic <span className={styles.asterick}>*</span>
							</label>
							<select
								id="topic"
								value={contactFormData.topic}
								onChange={(e) =>
									setContactFormData({
										...contactFormData,
										topic: e.target.value,
									})
								}
								required
							>
								<option value="" disabled={true}></option>
								<option value="General Question">General Question</option>
								<option value="Item Request">Item Requests</option>
								<option value="Pricing/Payment">Pricing/Payment</option>
								<option value="Cancellation">Cancellation</option>
							</select>
						</div>

						<div className="inputGroup">
							<label htmlFor="message">
								Message <span className={styles.asterick}>*</span>
							</label>
							<textarea
								name="message"
								id="message"
								value={contactFormData.message}
								onChange={(e) =>
									setContactFormData({
										...contactFormData,
										message: e.target.value,
									})
								}
								required
							/>
						</div>

						{contactError && <div className={styles.formError}>{contactError}</div>}

						{contactSuccess && (
							<div className={styles.formSuccess}>{contactSuccess}</div>
						)}

						<button
							type="submit"
							className={styles.submit}
							disabled={contactSubmitting}
						>
							{contactSubmitting ? "Sending..." : "Send"}
						</button>
					</form>
				</div>
			</section>
		</div>
	);
};

export default HomePage;

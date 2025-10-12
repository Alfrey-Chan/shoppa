import Hero from "../components/Hero/Hero";
import styles from "./HomePage.module.css";
import ProductCard from "../components/ProductCard/ProductCard";
import Accordion from "../components/Accordion/Accordion";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const HomePage = () => {
	const { t } = useLanguage();

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

	const FAQ = Object.values(t.faq.questions);

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
		// const url = `http://127.0.0.1:8001/api/request`;
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
				setRequestError(t.modal.errorGeneric);
				return;
			}

			// Success
			setRequestSuccess(t.modal.successMessage);
			setRequestFormData({ email: "", requestDetails: "", pickupCity: "" });
			setUploadedImages([]);
		} catch (error) {
			setRequestError(t.modal.errorServer);
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
				setContactError(t.contact.errorGeneric);
				return;
			}

			// Success
			setContactSuccess(t.contact.successMessage);
			setContactFormData({ email: "", topic: "", message: "" });
		} catch (error) {
			setContactError(t.contact.errorServer);
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
						{t.banner.acceptingOrdersUntil}{" "}
						<strong className={styles.highlightDate}>{t.banner.orderDeadline}</strong>
					</span>
					<span className={styles.separator}>|</span>
					<span>
						{t.banner.pickupPeriod}{" "}
						<strong className={styles.highlightDate}>{t.banner.pickupDates}</strong>
					</span>
				</p>
			</div>

			<Hero
				title={t.hero.title}
				subtitle={t.hero.subtitle}
				ctaBtnText={t.hero.ctaButton}
				servingArea={t.hero.servingArea}
				onClick={() => setShowModal(!showModal)}
			/>

			{/* Modal Request Form */}
			<div className={`${styles.overlay} ${showModal ? styles.showModal : ""}`}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h3 className={styles.modalTitle}>{t.modal.title}</h3>

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
							<label htmlFor="email">{t.modal.email}</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder={t.modal.emailPlaceholder}
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
							<label htmlFor="requestDetails">{t.modal.requestDetails}</label>
							<textarea
								id="requestDetails"
								name="requestDetails"
								placeholder={t.modal.requestDetailsPlaceholder}
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
							<label htmlFor="location">{t.modal.pickupCity}</label>
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
									{t.modal.selectOne}
								</option>
								<option value="Burnaby">{t.cities.burnaby}</option>
								<option value="Richmond">{t.cities.richmond}</option>
								<option value="West Vancouver">{t.cities.westVancouver}</option>
								<option value="New Westminster">{t.cities.newWestminster}</option>
								<option value="Surrey">{t.cities.surrey}</option>
								<option value="Coquitlam">{t.cities.coquitlam}</option>
								<option value="Port Coquitlam">{t.cities.portCoquitlam}</option>
								<option value="Port Moody">{t.cities.portMoody}</option>
								<option value="Langley">{t.cities.langley}</option>
							</select>
						</div>

						<div className={styles.inputGroup}>
							<label htmlFor="images">{t.modal.uploadImage}</label>
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

						{requestError && (
							<div className={styles.formError}>{requestError}</div>
						)}

						{requestSuccess && (
							<div className={styles.formSuccess}>{requestSuccess}</div>
						)}

						<div className={styles.modalFooter}>
							<button
								type="submit"
								className={styles.requestSubmitBtn}
								disabled={requestSubmitting}
							>
								{requestSubmitting ? t.modal.submitting : t.modal.submitButton}
							</button>
							<p>{t.modal.responseTime}</p>
						</div>
					</form>
				</div>
			</div>

			{/* How it works */}
			<section id="how-it-works" className={styles.section}>
				<h2 className={styles.sectionHeader}>{t.howItWorks.title}</h2>

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
									<h3>{t.howItWorks.step1Title}</h3>
									<p>{t.howItWorks.step1Description}</p>
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
									<h3>{t.howItWorks.step2Title}</h3>
									<p>{t.howItWorks.step2Description}</p>
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
									<h3>{t.howItWorks.step3Title}</h3>
									<p>{t.howItWorks.step3Description}</p>
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
								<h3>{t.howItWorks.meetupLocationsTitle}</h3>
								<p>{t.howItWorks.meetupLocationsDescription}</p>
							</div>
						</div>
					</div>

					<div className={styles.locationsRow}>
						<div className={styles.locationsPills}>
							<span>{t.cities.vancouver}</span>
							<span>{t.cities.burnaby}</span>
							<span>{t.cities.richmond}</span>
							<span>{t.cities.westVancouver}</span>
							<span>{t.cities.newWestminster}</span>
							<span>{t.cities.surrey}</span>
							<span>{t.cities.coquitlam}</span>
							<span>{t.cities.portCoquitlam}</span>
							<span>{t.cities.portMoody}</span>
							<span>{t.cities.langley}</span>
						</div>
					</div>
				</div>
			</section>

			{/* Recommendations */}
			<section
				id="ideas"
				className={`${styles.section} ${styles.recommendationsSection}`}
			>
				<h2 className={styles.sectionHeader}>{t.recommendations.title}</h2>

				<div className={styles.borderLine}></div>

				<p className={styles.sectionSubheader}>
					{t.recommendations.subtitle.split('\n').map((line, i) => (
						<span key={i}>
							{line}
							{i < t.recommendations.subtitle.split('\n').length - 1 && <br />}
						</span>
					))}
				</p>

				<div className={styles.popularRequests}>
					<p className={styles.popularRequestsTitle}>{t.recommendations.popularRequestsTitle}</p>
					<ul className={styles.requestsList}>
						<li>
							<strong>{t.recommendations.snackMix}</strong> — {t.recommendations.snackMixDesc}
						</li>
						<li>
							<strong>{t.recommendations.royceChocolates}</strong> — {t.recommendations.royceChocolatesDesc}
						</li>
						<li>
							<strong>{t.recommendations.tokyoBanana}</strong> — {t.recommendations.tokyoBananaDesc}
						</li>
						<li>
							<strong>{t.recommendations.cosmetics}</strong> — {t.recommendations.cosmeticsDesc}
						</li>
						<li>
							<strong>{t.recommendations.stationery}</strong> — {t.recommendations.stationeryDesc}
						</li>
						<li>
							<strong>{t.recommendations.fashion}</strong> — {t.recommendations.fashionDesc}
						</li>
						<li>
							<strong>{t.recommendations.animeFigures}</strong> — {t.recommendations.animeFiguresDesc}
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
				<h2 className={styles.sectionHeader}>{t.faq.title}</h2>
				<div className={styles.borderLine}></div>

				<div className={styles.faq}>
					{FAQ.map((item) => (
						<Accordion key={item.question} question={item.question} answer={item.answer} />
					))}
				</div>
			</section>

			{/* Contact */}
			<section id="contact" className={styles.section}>
				<h2 className={styles.sectionHeader}>{t.contact.title}</h2>

				<div className={styles.borderLine}></div>

				<div className={`${styles.contactContainer}`}>
					<form onSubmit={handleContactSubmit} id="#contact">
						<div className={styles.contactHeader}>
							{t.contact.header}{" "}
							<b
								onClick={() => setShowModal(true)}
								style={{ cursor: "pointer", color: "var(--accent)" }}
							>
								{t.contact.clickHere}
							</b>{" "}
							{t.contact.toGetStarted}
						</div>

						<div className="inputGroup">
							<label htmlFor="email">
								{t.contact.email} <span className={styles.asterick}>{t.contact.required}</span>
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
								{t.contact.topic} <span className={styles.asterick}>{t.contact.required}</span>
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
								<option value="General Question">{t.contact.topicOptions.generalQuestion}</option>
								<option value="Item Request">{t.contact.topicOptions.itemRequest}</option>
								<option value="Pricing/Payment">{t.contact.topicOptions.pricingPayment}</option>
								<option value="Cancellation">{t.contact.topicOptions.cancellation}</option>
							</select>
						</div>

						<div className="inputGroup">
							<label htmlFor="message">
								{t.contact.message} <span className={styles.asterick}>{t.contact.required}</span>
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

						{contactError && (
							<div className={styles.formError}>{contactError}</div>
						)}

						{contactSuccess && (
							<div className={styles.formSuccess}>{contactSuccess}</div>
						)}

						<button
							type="submit"
							className={styles.submit}
							disabled={contactSubmitting}
						>
							{contactSubmitting ? t.contact.sending : t.contact.sendButton}
						</button>
					</form>
				</div>
			</section>
		</div>
	);
};

export default HomePage;

import styles from "./Hero.module.css";

interface HeroProps {
	title: string;
	subtitle: string;
	ctaBtnText?: string;
	onClick: () => void;
}

const Hero = ({ title, subtitle, ctaBtnText, onClick }: HeroProps) => {
	return (
		<section className={styles.hero} aria-labelledby="hero-heading">
			<div className={`${styles.container} ${styles.heroWrap}`}>
				<div className={styles.brandPill}>
					Serving the Greater Vancouver Area
				</div>
				<h1
					className={styles.heroTitle}
					id="hero-heading"
					dangerouslySetInnerHTML={{ __html: title }}
				/>
				<p
					className={styles.heroSubtitle}
					dangerouslySetInnerHTML={{ __html: subtitle }}
				/>
				<div className={styles.heroCta}>
					<button
						className={styles.heroBtn}
						id="openQuoteHero"
						aria-haspopup="dialog"
						aria-controls="quoteModal"
						onClick={onClick}
					>
						{ctaBtnText}
					</button>
				</div>
			</div>
			<div className={styles.heroIllustration} aria-hidden="true">
				<svg
					viewBox="0 0 1600 520"
					width="100%"
					preserveAspectRatio="xMidYMid slice"
					role="img"
					aria-label="Asakusa skyline with Azuma Bridge, Asahi HQ & Beer Hall, Skytree, river waves, buildings, torii, pagoda, Tokyo Tower and sakura petals"
				>
					<defs>
						<linearGradient id="sunGrad" x1="0" x2="1" y1="0" y2="1">
							<stop offset="0" stopColor="#ffb454" />
							<stop offset="1" stopColor="#e84b4b" />
						</linearGradient>
						<linearGradient id="riverGrad" x1="0" x2="0" y1="0" y2="1">
							<stop offset="0" stopColor="#d8ecff" />
							<stop offset="1" stopColor="#eef6ff" />
						</linearGradient>
						<pattern
							id="waves"
							width="60"
							height="16"
							patternUnits="userSpaceOnUse"
						>
							<path
								d="M0 8 Q 15 0 30 8 T 60 8"
								stroke="#ffffff"
								strokeOpacity=".65"
								fill="none"
								strokeWidth="1.6"
							/>
						</pattern>
						<radialGradient id="blossom" cx="50%" cy="50%" r="0.8">
							<stop offset="0" stopColor="#ffd4e5" />
							<stop offset="1" stopColor="#ff9ac3" />
						</radialGradient>
						<linearGradient id="flameGrad" x1="0" x2="1">
							<stop offset="0" stopColor="#ffe08c" />
							<stop offset="1" stopColor="#ff9a3c" />
						</linearGradient>
						<linearGradient id="hqGlass" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" stopColor="#ffe6a6" />
							<stop offset="1" stopColor="#ffc35a" />
						</linearGradient>
						<linearGradient id="hqReflect" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0" stopColor="#ffffff" stopOpacity=".22" />
							<stop offset=".45" stopColor="#ffffff" stopOpacity=".06" />
							<stop offset="1" stopColor="#ffffff" stopOpacity="0" />
						</linearGradient>
						<path
							id="petalShape"
							d="M8 0 C 14 6, 14 16, 8 20 C 2 16, 2 6, 8 0 Z"
						/>
						<style>
							{`
                            line, path[stroke] {
                                vector-effect: non-scaling-stroke;
                            }
                            `}
						</style>
					</defs>

					<circle cx="1280" cy="80" r="78" fill="url(#sunGrad)" opacity=".9" />

					<g opacity=".75">
						<path d="M40 300 L150 190 L260 300 Z" fill="#e3e7ef" />
						<path
							d="M95 230 L150 190 L205 230 L185 230 L170 242 L130 242 Z"
							fill="#ffffff"
							opacity=".9"
						/>
						<g fill="#e3e7ef" opacity=".9">
							<rect x="280" y="238" width="120" height="14" rx="7" />
							<rect x="300" y="224" width="80" height="12" rx="6" />
						</g>
					</g>

					<g transform="translate(250,20)">
						<rect x="0" y="36" width="20" height="210" fill="#cfd6e3" />
						<ellipse cx="10" cy="112" rx="48" ry="16" fill="#dee3ec" />
						<ellipse cx="10" cy="148" rx="36" ry="12" fill="#e9ecf2" />
						<rect x="8" y="12" width="4" height="44" fill="#cfd6e3" />
						<rect x="6" y="6" width="8" height="10" rx="3" fill="#e7e9ee" />
						<path
							d="M4 156 L16 98 M16 156 L4 98"
							stroke="#d9dee8"
							strokeWidth="1.6"
							opacity="0.6"
						/>
					</g>

					<g>
						<rect
							x="760"
							y="220"
							width="128"
							height="96"
							rx="8"
							fill="#121316"
						/>
						<path
							d="M748 216 C 812 144, 916 200, 840 226 C 814 234, 780 226, 764 220 Z"
							fill="url(#flameGrad)"
						/>
					</g>

					<g>
						<rect
							x="910"
							y="192"
							width="160"
							height="136"
							rx="12"
							fill="url(#hqGlass)"
						/>
						<g stroke="#f3c14b" strokeWidth="2">
							<line x1="934" y1="192" x2="934" y2="328" />
							<line x1="958" y1="192" x2="958" y2="328" />
							<line x1="982" y1="192" x2="982" y2="328" />
							<line x1="1006" y1="192" x2="1006" y2="328" />
							<line x1="1030" y1="192" x2="1030" y2="328" />
						</g>
						<g stroke="#f6cf77" strokeWidth="2">
							<line x1="910" y1="218" x2="1070" y2="218" />
							<line x1="910" y1="246" x2="1070" y2="246" />
							<line x1="910" y1="274" x2="1070" y2="274" />
						</g>
						<rect
							x="910"
							y="192"
							width="160"
							height="136"
							rx="12"
							fill="url(#hqReflect)"
						/>
					</g>

					<g fill="#e84b4b" opacity=".35" transform="translate(520,238)">
						<rect x="0" y="0" width="8" height="48" rx="3" />
						<rect x="52" y="0" width="8" height="48" rx="3" />
						<rect x="-8" y="-10" width="76" height="8" rx="4" />
						<rect x="-12" y="-16" width="84" height="6" rx="3" />
					</g>

					<g fill="#e3e7ef" opacity=".85">
						<rect x="1188" y="226" width="74" height="90" rx="10" />
						<rect x="1270" y="210" width="58" height="104" rx="10" />
					</g>

					<g transform="translate(1410,180)" opacity=".95">
						<rect x="-1.5" y="-34" width="3" height="34" fill="#cfd6e3" />
						<polygon points="-14,0 0,-28 14,0" fill="#e84b4b" />
						<rect x="-6" y="0" width="12" height="160" fill="#e84b4b" />
						<polygon points="-48,160 -20,56 20,56 48,160" fill="#e84b4b" />
						<rect x="-16" y="24" width="32" height="8" fill="#f6f8fc" />
						<rect x="-20" y="68" width="40" height="8" fill="#f6f8fc" />
						<rect
							x="-24"
							y="120"
							width="48"
							height="10"
							fill="#f6f8fc"
							opacity=".92"
						/>
						<rect x="-16" y="40" width="32" height="10" rx="5" fill="#f6f8fc" />
						<rect x="-28" y="86" width="56" height="12" rx="6" fill="#f6f8fc" />
						<g stroke="#ffffff" strokeOpacity=".45" strokeWidth="2">
							<line x1="-38" y1="160" x2="38" y2="80" />
							<line x1="-28" y1="160" x2="28" y2="92" />
							<line x1="-18" y1="160" x2="18" y2="104" />
						</g>
					</g>

					<g>
						<rect x="1220" y="300" width="6" height="28" fill="#b98a6e" />
						<circle cx="1223" cy="296" r="16" fill="url(#blossom)" />
						<circle cx="1238" cy="302" r="12" fill="url(#blossom)" />
					</g>

					<g>
						<rect x="520" y="300" width="6" height="28" fill="#b98a6e" />
						<circle cx="523" cy="296" r="18" fill="url(#blossom)" />
						<circle cx="540" cy="302" r="14" fill="url(#blossom)" />
						<circle cx="506" cy="304" r="12" fill="url(#blossom)" />
						<rect x="740" y="300" width="6" height="28" fill="#b98a6e" />
						<circle cx="743" cy="296" r="18" fill="url(#blossom)" />
						<circle cx="760" cy="302" r="14" fill="url(#blossom)" />
						<circle cx="726" cy="304" r="12" fill="url(#blossom)" />
						<rect x="1080" y="300" width="6" height="28" fill="#b98a6e" />
						<circle cx="1083" cy="296" r="18" fill="url(#blossom)" />
						<circle cx="1100" cy="302" r="14" fill="url(#blossom)" />
						<circle cx="1066" cy="304" r="12" fill="url(#blossom)" />
					</g>

					<rect
						x="0"
						y="360"
						width="1600"
						height="160"
						fill="url(#riverGrad)"
					/>
					<rect
						x="0"
						y="360"
						width="1600"
						height="160"
						fill="url(#waves)"
						opacity=".35"
					/>

					<path
						d="M120 360 Q 800 286 1480 360"
						fill="none"
						stroke="#e84b4b"
						strokeWidth="18"
						strokeLinecap="round"
						transform="translate(0, 10)"
					/>
					<path
						d="M120 364 Q 800 290 1480 364"
						fill="none"
						stroke="#2a4a7a"
						strokeOpacity=".08"
						strokeWidth="24"
						strokeLinecap="round"
						transform="translate(0, 10)"
					/>
					<g stroke="#e84b4b" strokeWidth="12" strokeLinecap="round">
						<line x1="300" y1="360" x2="300" y2="320" />
						<line x1="520" y1="360" x2="520" y2="308" />
						<line x1="800" y1="360" x2="800" y2="300" />
						<line x1="1080" y1="360" x2="1080" y2="308" />
						<line x1="1300" y1="360" x2="1300" y2="320" />
					</g>

					<g className={styles.petals} fill="url(#blossom)" opacity=".9">
						<g
							className={styles.petal}
							style={
								{
									"--x": "120px",
									"--dx": "60px",
									animationDuration: "11s",
									animationDelay: "0.2s",
								} as React.CSSProperties
							}
						>
							<use href="#petalShape" />
						</g>
						<g
							className={styles.petal}
							style={
								{
									"--x": "340px",
									"--dx": "80px",
									animationDuration: "12s",
									animationDelay: "1.1s",
								} as React.CSSProperties
							}
						>
							<use href="#petalShape" />
						</g>
						<g
							className={styles.petal}
							style={
								{
									"--x": "560px",
									"--dx": "50px",
									animationDuration: "10s",
									animationDelay: "0.7s",
								} as React.CSSProperties
							}
						>
							<use href="#petalShape" />
						</g>
						<g
							className={styles.petal}
							style={
								{
									"--x": "720px",
									"--dx": "70px",
									animationDuration: "13s",
									animationDelay: "0.4s",
								} as React.CSSProperties
							}
						>
							<use href="#petalShape" />
						</g>
						<g
							className={styles.petal}
							style={
								{
									"--x": "900px",
									"--dx": "90px",
									animationDuration: "12s",
									animationDelay: "1.6s",
								} as React.CSSProperties
							}
						>
							<use href="#petalShape" />
						</g>
						<g
							className={styles.petal}
							style={
								{
									"--x": "1100px",
									"--dx": "60px",
									animationDuration: "9s",
									animationDelay: "0.9s",
								} as React.CSSProperties
							}
						>
							<use href="#petalShape" />
						</g>
						<g
							className={styles.petal}
							style={
								{
									"--x": "1360px",
									"--dx": "80px",
									animationDuration: "14s",
									animationDelay: "0.3s",
								} as React.CSSProperties
							}
						>
							<use href="#petalShape" />
						</g>
					</g>
				</svg>
			</div>
		</section>
	);
};

export default Hero;

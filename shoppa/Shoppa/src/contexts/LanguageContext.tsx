import { createContext, useContext, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import enTranslations from '../locales/en.json';
import jpTranslations from '../locales/jp.json';

type Translations = typeof enTranslations;

interface LanguageContextType {
	lang: string;
	t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const { lang } = useParams();
	const currentLang = lang === 'jp' ? 'jp' : 'en';
	const t = currentLang === 'jp' ? jpTranslations : enTranslations;

	return (
		<LanguageContext.Provider value={{ lang: currentLang, t }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error('useLanguage must be used within LanguageProvider');
	}
	return context;
};

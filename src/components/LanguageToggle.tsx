import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const isSpanish = currentLang.startsWith('es');

  const toggleLanguage = () => {
    const newLang = isSpanish ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/80 hover:text-[#00F0FF] transition-colors rounded-full hover:bg-white/5"
      aria-label={t('language.toggle')}
    >
      <Globe className="w-3.5 h-3.5" />
      <span className={`${isSpanish ? 'text-[#00F0FF]' : ''}`}>ES</span>
      <span className="text-white/40">/</span>
      <span className={`${!isSpanish ? 'text-[#00F0FF]' : ''}`}>EN</span>
    </button>
  );
};

export default LanguageToggle;

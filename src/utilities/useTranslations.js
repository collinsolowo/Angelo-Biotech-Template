import { useEffect, useState } from 'react';
import TRANSLATIONS from '../i18n/translations';

export default function useTranslation() {
  const [lang, setLang] = useState(localStorage.getItem('siteLang') || 'en');

  useEffect(() => {
    function handleLangChange(e) {
      setLang(e.detail.lang);
    }
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  return TRANSLATIONS[lang];
}

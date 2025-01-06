import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const handleChangeLanguage = (newLocale) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="flex space-x-2">
      {['en', 'es', 'fr', 'de'].map((locale) => (
        <button
          key={locale}
          onClick={() => handleChangeLanguage(locale)}
          className={`px-3 py-1 rounded ${
            router.locale === locale 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
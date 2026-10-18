import { useEffect } from 'react';

const SITE_URL = 'https://melinaschimpf-portfolio.vercel.app';

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

// Actualiza título, descripción y URL canónica según la página y el idioma
const useDocumentMeta = ({ title, description, path = '/' }) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [title, description, path]);
};

export default useDocumentMeta;

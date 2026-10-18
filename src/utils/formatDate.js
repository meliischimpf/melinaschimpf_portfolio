export const formatDate = (isoDate, language) =>
  new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-AR', { dateStyle: 'long' }).format(
    new Date(`${isoDate}T12:00:00`),
  );

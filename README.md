# Melina Schimpf Baldo · Portfolio

[![CI](https://github.com/meliischimpf/melinaschimpf_portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/meliischimpf/melinaschimpf_portfolio/actions/workflows/ci.yml)

Portfolio personal de una Backend & Security Engineer: experiencia, casos de estudio, notas técnicas y contacto, en español e inglés.

🔗 **https://melinaschimpf-portfolio.vercel.app**

## Stack

- **React 18 + Vite**, sin frameworks de UI: CSS propio con variables para el tema claro/oscuro.
- **i18next** para español e inglés, con detección automática del idioma.
- **EmailJS** para el formulario de contacto, con campo trampa, tiempo mínimo y límite de envíos contra spam.
- **Vercel** para el hosting, con Vercel Analytics.

## Seguridad y calidad

- **Content Security Policy estricta** sin `unsafe-inline`: el único script inline está permitido por su hash SHA-256, y un chequeo en CI falla si el hash deja de coincidir ([scripts/check-csp.mjs](scripts/check-csp.mjs)).
- Headers de seguridad en [vercel.json](vercel.json): HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y `Cross-Origin-Opener-Policy`.
- Fuentes e imágenes alojadas en el propio sitio: no se carga nada de terceros salvo la API de EmailJS.
- CI en GitHub Actions: lint, build, verificación de la CSP y `npm audit` de las dependencias de producción.
- Lighthouse: 100 en rendimiento, accesibilidad, buenas prácticas y SEO en escritorio.
- Accesible: navegación por teclado, modales con foco atrapado, `prefers-reduced-motion` y contraste AA.

## Desarrollo

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:3000
npm run lint       # ESLint
npm run build      # build de producción en dist/
npm run check:csp  # verifica que los scripts inline estén permitidos por la CSP (requiere build)
```

## Estructura

```
src/
├── components/   Secciones de la página (Hero, Experience, Projects, Notes…) y el modal
├── content/      Notas técnicas (notes.js)
├── context/      Tema e idioma
├── data/         Datos de contacto y enlaces (profile.js)
├── hooks/        Animaciones al hacer scroll y metadatos por página
└── i18n/         Traducciones en español e inglés
```

Los textos del sitio están en `src/i18n/locales/{es,en}/translation.json`, y las notas en `src/content/notes.js`.

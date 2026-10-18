import { useTranslation } from 'react-i18next';
import './CaseStudy.css';

const CaseStudy = ({ project, children }) => {
  const { t } = useTranslation();
  const text = t(`projects.items.${project.id}`, { returnObjects: true });
  const labels = t('projects.caseLabels', { returnObjects: true });
  const study = text.case;

  return (
    <article className="case">
      <img className="case__image" src={project.image} alt="" width="1200" height="675" />

      <div className="case__content">
        <p className="project__kind">{text.kind}</p>

        <section className="case__section">
          <h3>{labels.context}</h3>
          <p>{study.context}</p>
        </section>

        <section className="case__section">
          <h3>{labels.role}</h3>
          <p>{study.role}</p>
        </section>

        <section className="case__section">
          <h3>{labels.built}</h3>
          <ul>
            {study.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="case__section">
          <h3>{labels.decisions}</h3>
          <ul>
            {study.decisions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="case__section case__outcome">
          <h3>{labels.outcome}</h3>
          <p>{study.outcome}</p>
        </section>

        <ul className="tags">
          {project.tech.map((tech) => (
            <li key={tech} className="tag">{tech}</li>
          ))}
        </ul>

        {children}
      </div>
    </article>
  );
};

export default CaseStudy;


import { fetchUserPortfolio } from '@/hooks/use-api';
import React from 'react';


export default async function PortfolioPage({ params }) {
  const username = (await params).slug
  const portfolio = await fetchUserPortfolio(username);

  if (!portfolio) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Portfolio Not Found</h1>
        <p>We couldn't find any data for the user "{username}".</p>
      </div>
    );
  }

  return (
    <div className=" wrapper p-6">
      <h1 className="text-3xl font-bold mb-4">{portfolio?.name || 'User Portfolio'}</h1>
      <p className=" font-bold mb-4">{portfolio?.email || 'User Portfolio'}</p>
      <p className=" font-bold mb-4">{portfolio?.username || 'User Portfolio'}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Links</h2>
        {portfolio.portfolio?.links.length > 0 ? (
          <ul>
            {portfolio.portfolio.links.map((link) => (
              <li key={link.id}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No links available</p>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Socials</h2>
        {portfolio.portfolio?.socials.length > 0 ? (
          <ul>
            {portfolio.portfolio.socials.map((social) => (
              <li key={social.id}>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.platform}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No socials available</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Resume</h2>
        {portfolio.portfolio?.resume ? (
          <div>
            <h3 className="text-lg font-semibold">Experiences</h3>
            <ul>
              {portfolio.portfolio.resume.experiences.map((exp) => (
                <li key={exp.id}>
                  {exp.role} at {exp.company} ({exp.startDate} - {exp.endDate || 'Present'})
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold">Education</h3>
            <ul>
              {portfolio.portfolio.resume.education.map((edu) => (
                <li key={edu.id}>
                  {edu.degree} at {edu.school} ({edu.startDate} - {edu.endDate || 'Present'})
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No resume available</p>
        )}
      </section>
    </div>
  );
}




import React from "react";
import {
  EducationSection,
  ExperienceSection,
  PortfolioLink,
  PortfolioProjectSections,
} from "../../sections/ProjectSection";

export default function Basic({ portfolio }) {
  return (
    <div className="bg-gray-900 text-white">
      {(portfolio?.links?.length > 0 || portfolio?.socials?.length > 0) && (
        <PortfolioLink
          profile={portfolio?.profile}
          links={portfolio?.links}
          socials={portfolio?.socials}
        />
      )}

      {portfolio.experiences?.length > 0 && (
        <ExperienceSection experiences={portfolio?.experiences} />
      )}

      {portfolio.education?.length > 0 && (
        <EducationSection education={portfolio?.education} />
      )}

      {portfolio.projects?.length > 0 && (
        <PortfolioProjectSections projects={portfolio?.projects} />
      )}

      <footer className="mt-8  text-center">
        <small className="text-gray-500 font-light flex items-center justify-center gap-1">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Makinde Olaitan
          </span>
          <span className="text-gray-400">•</span> All rights reserved
        </small>
      </footer>
    </div>
  );
}

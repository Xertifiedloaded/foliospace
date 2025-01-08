import React from 'react'
import { EducationSection, ExperienceSection, PortfolioLink, PortfolioProjectSections } from '../../sections/ProjectSection'
import { Button } from '@/components/ui/button';
import Hero from '../../sections/Hero';

export default function Basic({portfolio}) {
  return (
    <div className="bg-gray-900 text-white">

    {(portfolio?.links?.length > 0 ||
      portfolio?.socials?.length > 0) && (
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


  </div>
  )
}

'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ExternalLink, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { fetchUserPortfolio } from '@/hooks/use-api';

const SocialIcon = ({ type, url }) => {
  const icons = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
  };

  const Icon = icons[type?.toLowerCase()];

  return Icon ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-75 transition-opacity"
    >
      <Icon className="w-5 h-5 text-muted-foreground" />
    </a>
  ) : null;
};

const PortfolioProfileCard = ({ portfolio, username }) => {
  const { profile } = portfolio || {};
  const { name, email, socials, tagline, bio, hobbies, languages } = profile || {};

  return (
    <Card className="shadow-lg">
      <CardHeader className="relative pb-0">
        <div className="absolute top-4 right-4 flex space-x-2">
          {socials?.map((social, index) => (
            <SocialIcon key={index} type={social.platform} url={social.url} />
          ))}
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/images/user.jpg"
            alt={`${name || 'User'} profile`}
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold">{name || null}</h1>
            <p className="text-muted-foreground mt-1">{email || null}</p>
            <Badge variant="secondary" className="mt-2">
              @{username}
            </Badge>
            <p className="text-muted-foreground mt-1">{profile?.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="space-y-4">
          {tagline && (
            <div className="text-center italic text-muted-foreground">
              "{tagline}"
            </div>
          )}

          {bio && (
            <div>
              <h2 className="text-lg font-semibold mb-2">About Me</h2>
              <p className="text-sm">{bio}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {hobbies?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Hobbies</h2>
                <ul className="text-sm space-y-1">
                  {hobbies.map((hobby, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">•</span>{hobby}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {languages?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Languages</h2>
                <ul className="text-sm space-y-1">
                  {languages.map((language, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">•</span>{language}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default async function PortfolioPage({ params }) {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = (await params).slug;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPortfolio = await fetchUserPortfolio(username);
      setPortfolio(fetchedPortfolio);
      setLoading(false);
    };

    fetchData();
  }, [username]);

  if (loading) return <div>Loading...</div>;

  if (!portfolio) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[400px] text-center">
          <CardHeader>
            <CardTitle>Portfolio Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We couldn't find any data for the user "{username}".</p>
            <Button variant="outline" className="mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { profile, socials, links, experiences, education } = portfolio;
  const { picture, tagline, bio, hobbies, languages } = profile;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <PortfolioProfileCard portfolio={portfolio} username={username} />

      {/* Links and Socials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" /> Links & Socials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="links">
              <AccordionTrigger>Links</AccordionTrigger>
              <AccordionContent>
                {links?.length > 0 ? (
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.id}>
                        <Button variant="link" className="p-0" asChild>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.text}
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No links available</p>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="socials">
              <AccordionTrigger>Socials</AccordionTrigger>
              <AccordionContent>
                {socials?.length > 0 ? (
                  <ul className="space-y-2">
                    {socials.map((social) => (
                      <li key={social.id}>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href={social.url} target="_blank" rel="noopener noreferrer">
                            {social.name}
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No socials available</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Resume */}
      {experiences?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" /> Professional Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experiences.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell>{exp.position}</TableCell>
                    <TableCell>{exp.company}</TableCell>
                    <TableCell>
                      {new Date(exp.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      -{' '}
                      {exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Present'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {education?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" /> Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Degree</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {education.map((edu) => (
                  <TableRow key={edu.id}>
                    <TableCell>{edu.degree}</TableCell>
                    <TableCell>{edu.institution}</TableCell>
                    <TableCell>
                      {new Date(edu.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      -{' '}
                      {edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Present'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

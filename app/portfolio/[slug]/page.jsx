import { fetchUserPortfolio } from '@/hooks/use-api';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ExternalLink, 
  MapPin, 
  Briefcase, 
  GraduationCap 
} from "lucide-react";

export default async function PortfolioPage({ params }) {  
  const username = (await params).slug  
  const portfolio = await fetchUserPortfolio(username); 

  if (!portfolio) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[400px] text-center">
          <CardHeader>
            <CardTitle>Portfolio Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We couldn't find any data for the user "{username}".</p>
            <Button variant="outline" className="mt-4">Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-4">
          <div>
            <h1 className="text-3xl font-bold">{portfolio.name}</h1>
            <p className="text-muted-foreground">{portfolio.email}</p>
            <Badge variant="secondary" className="mt-2">@{portfolio.username}</Badge>
          </div>
        </CardHeader>
      </Card>

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
                {portfolio.portfolio?.links.length > 0 ? (
                  <ul className="space-y-2">
                    {portfolio.portfolio.links.map((link) => (
                      <li key={link.id}>
                        <Button 
                          variant="link" 
                          className="p-0"
                          asChild
                        >
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {link.url}
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
                {portfolio.portfolio?.socials.length > 0 ? (
                  <ul className="space-y-2">
                    {portfolio.portfolio.socials.map((social) => (
                      <li key={social.id}>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          asChild
                        >
                          <a 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {social.platform}
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
      {portfolio.portfolio?.resume && (
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
                {portfolio.portfolio.resume.experiences.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell>{exp.role}</TableCell>
                    <TableCell>{exp.company}</TableCell>
                    <TableCell>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {portfolio.portfolio?.resume && (
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
                {portfolio.portfolio.resume.education.map((edu) => (
                  <TableRow key={edu.id}>
                    <TableCell>{edu.degree}</TableCell>
                    <TableCell>{edu.school}</TableCell>
                    <TableCell>
                      {edu.startDate} - {edu.endDate || 'Present'}
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
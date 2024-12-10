import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { fetchUserPortfolio } from "@/hooks/use-api";
import { PortfolioProfileCard } from '../../../components/UserProfileCard';



export default async function PortfolioPage({ params }) {
  const username = (await params).slug;
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
            <Button variant="outline" className="mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                {portfolio?.links?.length > 0 ? (
                  <ul className="space-y-2">
                    {portfolio?.links.map((link) => (
                      <li key={link.id}>
                        <Button variant="link" className="p-0" asChild>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                {portfolio?.socials?.length > 0 ? (
                  <ul className="space-y-2">
                    {portfolio?.socials?.map((social) => (
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
      {portfolio?.experiences && (
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
                {portfolio?.experiences.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell>{exp.position}</TableCell>
                    <TableCell>{exp.company}</TableCell>
                    <TableCell>
                      {new Date(exp.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Present"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {portfolio?.education && (
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
                {portfolio?.education.map((edu) => (
                  <TableRow key={edu.id}>
                    <TableCell>{edu.degree}</TableCell>
                    <TableCell>{edu.institution}</TableCell>
                    <TableCell>
                      {new Date(edu.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Present"}
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

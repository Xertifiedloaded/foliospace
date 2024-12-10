import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, MapPin, Briefcase, GraduationCap } from "lucide-react";
export const PortfolioProfileCard = ({ portfolio, username }) => {
    const profile = portfolio?.profile || {};
  
    return (
      <Card className=" shadow-lg">
        <CardHeader className="relative pb-0">
          <div className="absolute top-4 right-4 flex space-x-2">
            {portfolio?.socials?.length > 0 ? (
              <ul className="space-y-2">
                {portfolio.socials.map((social) => (
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
          </div>
          <div className="flex flex-col items-center space-y-4">
            <img
              src={"/images/user.jpg"}
              alt={`${portfolio.name || "User"} profile`}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold">{portfolio.name || null}</h1>
              <p className="text-muted-foreground mt-1">
                {portfolio.email || null}
              </p>
              <Badge variant="secondary" className="mt-2">
                @{username}
              </Badge>
              <p className="text-muted-foreground mt-1">{profile.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="space-y-4">
            {profile.tagline && (
              <div className="text-center italic text-muted-foreground">
                "{profile.tagline}"
              </div>
            )}
  
            {profile.bio && (
              <div>
                <h2 className="text-lg font-semibold mb-2">About Me</h2>
                <p className="text-sm">{profile.bio}</p>
              </div>
            )}
  
            <div className="grid grid-cols-2 gap-4">
              {profile.hobbies?.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Hobbies</h2>
                  <ul className="text-sm space-y-1">
                    {profile.hobbies.map((hobby, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        {hobby}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
  
              {profile.languages?.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Languages</h2>
                  <ul className="text-sm space-y-1">
                    {profile.languages.map((language, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        {language}
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
  
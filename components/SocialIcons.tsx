import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from 'lucide-react';

export const SocialIcon = ({ type, url }) => {
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
    ) : (
      <span>Invalid Social Platform</span> // Fallback for invalid platform types
    );
  };
  
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PortfolioLinks({ username }) {
  const router = useRouter();

  const generateBaseUrl = () => {
    if (typeof window !== "undefined") {
      const { origin } = window.location;
      return origin;
    }
    return "";
  };

  const baseUrl = generateBaseUrl();

  return (
    <div className="flex text-xs space-x-4">
      <Link
        href={`${baseUrl}/resume/${username}`}
        className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant='ghost'> Resume</Button>
      </Link>
      <Link
        href={`${baseUrl}/portfolio/${username}`}
        className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        <Button variant='ghost'> Portfolio</Button>
      </Link>
    </div>
  );
}

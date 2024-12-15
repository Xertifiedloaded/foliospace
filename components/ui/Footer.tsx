import React from "react";
import {
  RiCheckboxCircleLine,
  RiTwitterLine,
  RiLinkedinLine,
  RiGithubLine,
  RiInstagramLine
} from "react-icons/ri";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerNavigation = {
    platform: [
      { name: "Features", href: "/" },
      { name: "Portfolio Builder", href: "/" },
      { name: "Career Insights", href: "/" },
    ],
    company: [
      { name: "About Us", href: "/" },
      { name: "Careers", href: "/" },
      { name: "Press", href: "/" },
      { name: "Contact", href: "/" }
    ],
    resources: [
      { name: "Blog", href: "/" },
      { name: "Help Center", href: "/" },
      { name: "Documentation", href: "/" },
      { name: "Community", href: "/" }
    ]
  };

  const socialLinks = [
    { icon: RiTwitterLine, href: "https://twitter.com/creatify" },
    { icon: RiLinkedinLine, href: "https://linkedin.com/company/creatify" },
    { icon: RiGithubLine, href: "https://github.com/creatify" },
    { icon: RiInstagramLine, href: "https://instagram.com/creatify" }
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <RiCheckboxCircleLine className="mr-2 text-2xl text-blue-500" />
              <span className="text-2xl font-bold">FolioSpace</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Elevate your professional journey with intelligent portfolio building and career insights.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerNavigation).map(([key, links]) => (
            <div key={key}>
              <h4 className="font-semibold mb-6 text-white capitalize">
                {key}
              </h4>
              <ul className="space-y-4">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © {currentYear} FolioSpace. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-neutral-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="/terms" className="text-neutral-400 hover:text-white text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

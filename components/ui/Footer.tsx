import React from "react";
import {
  RiCheckboxCircleLine,
  RiTwitterLine,
  RiLinkedinLine,
  RiGithubLine,
  RiInstagramLine,
} from "react-icons/ri";

const Footer: React.FC = () => {


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
      { name: "Contact", href: "/" },
    ],
    resources: [
      { name: "Blog", href: "/" },
      { name: "Help Center", href: "/" },
      { name: "Documentation", href: "/" },
      { name: "Community", href: "/" },
    ],
  };

  const socialLinks = [
    { icon: RiTwitterLine, href: "https://twitter.com/creatify" },
    { icon: RiLinkedinLine, href: "https://linkedin.com/company/creatify" },
    { icon: RiGithubLine, href: "https://github.com/creatify" },
    { icon: RiInstagramLine, href: "https://instagram.com/creatify" },
  ];

  return (
    <footer className="bg-white dark:bg-black transition-colors duration-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <RiCheckboxCircleLine className="mr-2 text-2xl text-blue-500 dark:text-blue-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">FolioSpace</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Elevate your professional journey with intelligent portfolio
              building and career insights.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerNavigation).map(([key, links]) => (
            <div key={key}>
              <h4 className="font-semibold mb-6 text-gray-900 dark:text-white capitalize">
                {key}
              </h4>
              <ul className="space-y-4">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 pb-2 text-center border-t border-gray-200 dark:border-gray-700">
        <small className="text-gray-500 dark:text-gray-400 font-light flex items-center justify-center gap-1">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Makinde Olaitan
          </span>
          <span className="text-gray-400 dark:text-gray-600">•</span> All rights reserved
        </small>
      </div>
    </footer>
  );
};

export default Footer;


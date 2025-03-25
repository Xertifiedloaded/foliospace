"use client";
import { FaXTwitter } from "react-icons/fa6";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Links = {
  title: string;
  url: string;
  icon?: React.ReactNode;
};

type ColumnLinks = {
  title: string;
  links: Links[];
};

type FooterLink = {
  title: string;
  url: string;
};

type Props = {
  logo: ImageProps;
  newsletterDescription: string;
  inputPlaceholder?: string;
  button: {
    title: string;
    variant: string;
    size: string;
  };
  termsAndConditions: string;
  columnLinks: ColumnLinks[];
  footerText: string;
  footerLinks: FooterLink[];
};

export type FooterProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Footer = (props: FooterProps) => {
  const { columnLinks, footerText, footerLinks } = {
    ...FooterDefaults,
    ...props,
  };



  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1  gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[0.75fr_1fr] lg:gap-y-4 lg:pb-20">
          <Link href="/" className="flex items-start space-x-2">
            <CheckCircle className="text-blue-600" />
            <span className="text-xl font-bold">FolioSpace</span>
          </Link>
          <div className="grid grid-cols-2 items-start gap-y-10 sm:grid-cols-2 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
            {columnLinks.map((column, index) => (
              <div
                key={index}
                className="flex flex-col items-start justify-start"
              >
                <h2 className="mb-3 font-semibold md:mb-4">{column.title}</h2>
                <ul>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="py-2 text-sm">
                      <a href={link.url} className="flex items-center gap-3">
                        {link.icon && <span>{link.icon}</span>}
                        <span>{link.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex flex-col-reverse items-start justify-between pb-4 pt-6 text-sm md:flex-row md:items-center md:pb-0 md:pt-8">
          <p className="mt-6 md:mt-0">{footerText}</p>
          <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            {footerLinks.map((link, index) => (
              <li key={index} className="underline">
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export const FooterDefaults: Props = {
  logo: {
    url: "#",
    src: "/images/logo.svg",
    alt: "Logo image",
  },
  newsletterDescription:
    "Join our newsletter to stay up to date on features and releases.",
  inputPlaceholder: "Enter your email",
  button: {
    title: "Subscribe",
    variant: "secondary",
    size: "sm",
  },
  termsAndConditions: `
  <p class='text-xs'>
  Get our emails on inspirations and tips to grow your creative business.
  </p>
  `,
  columnLinks: [
    {
      title: "ABOUT",
      links: [
        { title: "About", url: "/about-us" },
        { title: "Contact", url: "" },
        { title: "Buy Us Coffee", url: "/donate" },
        { title: "Developers", url: "/developers" },
        { title: "Terms of Use", url: "#" },
        { title: "Privacy Policy", url: "#" },
      ],
    },
    {
      title: "Follow us",
      links: [
        {
          title: "Facebook",
          url: "#",
          icon: <BiLogoFacebookCircle className="size-6" />,
        },
        {
          title: "Instagram",
          url: "#",
          icon: <BiLogoInstagram className="size-6" />,
        },
        { title: "X", url: "#", icon: <FaXTwitter className="size-6 p-0.5" /> },
        {
          title: "LinkedIn",
          url: "#",
          icon: <BiLogoLinkedinSquare className="size-6" />,
        },
        {
          title: "Youtube",
          url: "#",
          icon: <BiLogoYoutube className="size-6" />,
        },
      ],
    },
  ],
  footerText: `© ${new Date().getFullYear()} foliospace. All rights reserved.`,
  footerLinks: [
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
    { title: "Cookies Settings", url: "#" },
  ],
};
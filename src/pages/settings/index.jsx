import React, { useState } from "react";
import UserBackupButton from "../../../components/UserDownloadButton";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import TemplateSelector from "../../../components/Template";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("personalization");

  const tabs = [
    { id: "personalization", label: "Personalization" },
    { id: "social", label: "Social Media Integration" },
    { id: "ux", label: "User Experience" },
    { id: "showcase", label: "Showcase Features" },
    { id: "analytics", label: "Analytics & Insights" },
    { id: "collaboration", label: "Collaboration" },
    { id: "seo", label: "SEO & Marketing" },
    { id: "language", label: "Multi-Language Support" },
    { id: "monetization", label: "Monetization" },
    { id: "interactive", label: "Interactive Elements" },
    { id: "backup", label: "Backup & Export" },
    { id: "community", label: "Community & Networking" },
    { id: "accessibility", label: "Accessibility" },
    { id: "ai", label: "AI Tools" },
    { id: "integrations", label: "Integrations" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "personalization":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Personalization</h2>
            <TemplateSelector />
          </div>
        );
      case "social":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Social Media Integration</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dynamic Social Feed</li>
              <li>Social Proof Widgets</li>
              <li>Link Previews</li>
            </ul>
          </div>
        );
      case "ux":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">User Experience</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dark Mode</li>
              <li>Live Previews</li>
              <li>Mobile Optimization</li>
            </ul>
          </div>
        );
      case "showcase":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Showcase Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Project Carousel</li>
              <li>Case Study Section</li>
              <li>Testimonials</li>
              <li>Video Introductions</li>
            </ul>
          </div>
        );
      case "analytics":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Analytics & Insights</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Visitor Analytics</li>
              <li>Engagement Metrics</li>
              <li>Heatmaps</li>
            </ul>
          </div>
        );
      case "collaboration":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Collaboration</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Team Pages</li>
              <li>Client Portals</li>
              <li>Feedback Features</li>
            </ul>
          </div>
        );
      case "seo":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">SEO & Marketing</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>SEO Optimization</li>
              <li>Shareable Portfolio Links</li>
              <li>Newsletter Integration</li>
            </ul>
          </div>
        );
      case "language":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Multi-Language Support</h2>
            <LanguageSwitcher />
          </div>
        );
      case "monetization":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Monetization</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>E-Commerce Features</li>
              <li>Freelance Booking</li>
              <li>Donation Button</li>
            </ul>
          </div>
        );
      case "interactive":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Interactive Elements</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Interactive Resume</li>
              <li>Gamification</li>
              <li>3D Models</li>
            </ul>
          </div>
        );
      case "backup":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Backup & Export</h2>
            <UserBackupButton />
          </div>
        );
      case "community":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Community & Networking</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Portfolio Directory</li>
              <li>Skill Matchmaking</li>
              <li>Community Forum</li>
            </ul>
          </div>
        );
      case "accessibility":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Accessibility</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Keyboard Navigation</li>
              <li>Screen Reader Support</li>
              <li>High-Contrast Mode</li>
            </ul>
          </div>
        );
      case "ai":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">AI Tools</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Content Suggestions</li>
              <li>AI Resume Builder</li>
              <li>Image Enhancements</li>
            </ul>
          </div>
        );
      case "integrations":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Integrations</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Job Boards</li>
              <li>Cloud Storage</li>
              <li>Calendars</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-4 dark:bg-gray-800 dark:text-white">
      <aside className="md:w-1/4 border-r border-gray-200 dark:border-gray-700 p-4">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer p-2 rounded-lg ${
                activeTab === tab.id
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </aside>
      <main className="md:w-3/4 p-4">{renderContent()}</main>
    </div>
  );
};

export default SettingsPage;

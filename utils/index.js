export const settingsCategories = [
    {
      id: "account",
      label: "Account Settings",
      icon: "🔐",
      sections: [
        {
          title: "Profile",
          features: [
            { name: "Personal Information", path: "/settings/profile/personal-info" },
            { name: "Profile Visibility", path: "/settings/profile/visibility" },
            { name: "Password & Security", path: "/settings/profile/password" }
          ]
        },
        {
          title: "Backup & Data",
          features: [
            { name: "Export Data", path: "/settings/backup/export" },
            { name: "Privacy Settings", path: "/settings/backup/privacy" },
            { name: "Account Deletion", path: "/settings/backup/deletion" }
          ]
        }
      ]
    },
    {
      id: "customization",
      label: "Customization",
      icon: "🎨",
      sections: [
        {
          title: "Appearance",
          path: "/settings/templates",
          features: [
            { name: "Theme Settings", path: "/settings/customization/theme" },
            { name: "Dark Mode", path: "/settings/customization/dark-mode" },
            { name: "Layout Options", path: "/settings/customization/layout" }
          ]
        },
        {
          title: "Language",
          features: [
            { name: "Content Language", path: "/settings/language/content" },
            { name: "Interface Language", path: "/settings/language/interface" }
          ]
        },
        {
          title: "Templates",
          features: [
            { name: "Portfolio Template", path: "/settings/template" },
          ]
        }
      ]
    },
    {
      id: "portfolio",
      label: "Portfolio Settings",
      icon: "📁",
      sections: [
        {
          title: "Showcase",
          features: [
            { name: "Project Display", path: "/settings/portfolio/project-display" },
            { name: "Case Studies", path: "/settings/portfolio/case-studies" },
            { name: "Testimonials", path: "/settings/portfolio/testimonials" }
          ]
        },
        {
          title: "Professional",
          features: [
            { name: "Resume Settings", path: "/settings/portfolio/resume" },
            { name: "Skills Display", path: "/settings/portfolio/skills" },
            { name: "Certifications", path: "/settings/portfolio/certifications" }
          ]
        }
      ]
    }
  ];
  
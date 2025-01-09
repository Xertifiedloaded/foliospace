import {
  Users,
  UserCheck,
  Calendar,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  Activity,
} from "lucide-react";
export const settingsCategories = [
  {
    id: "account",
    label: "Account Settings",
    icon: "🔐",
    sections: [
      {
        title: "Profile",
        features: [
          {
            name: "Personal Information",
            path: "/settings/profile/personal-info",
          },
          { name: "Profile Visibility", path: "/settings/profile/visibility" },
          { name: "Password & Security", path: "/settings/profile/password" },
        ],
      },
      {
        title: "Backup & Data",
        features: [
          { name: "Export Data", path: "/settings/backup/export" },
          { name: "Privacy Settings", path: "/settings/backup/privacy" },
          { name: "Account Deletion", path: "/settings/backup/deletion" },
        ],
      },
    ],
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
          { name: "Toggle Theme", path: "/settings/customization/dark-mode" },
          { name: "Layout Options", path: "/settings/customization/layout" },
        ],
      },
      {
        title: "Language",
        features: [
          { name: "Content Language", path: "/settings/language/content" },
          { name: "Interface Language", path: "/settings/language/interface" },
        ],
      },
      {
        title: "Templates",
        features: [{ name: "Portfolio Template", path: "/settings/template" }],
      },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio Settings",
    icon: "📁",
    sections: [
      {
        title: "Showcase",
        features: [
          {
            name: "Project Display",
            path: "/settings/portfolio/project-display",
          },
          { name: "Case Studies", path: "/settings/portfolio/case-studies" },
          { name: "Testimonials", path: "/settings/portfolio/testimonials" },
        ],
      },
      {
        title: "Professional",
        features: [
          { name: "Resume Settings", path: "/settings/portfolio/resume" },
          { name: "Skills Display", path: "/settings/portfolio/skills" },
          {
            name: "Certifications",
            path: "/settings/portfolio/certifications",
          },
        ],
      },
    ],
  },
];

export const getCardData = (analyticsData) => {
  return [
    {
      id: 1,
      title: "Total Visits",
      icon: <Users className="h-5 w-5" />,
      value: analyticsData.totalVisits,
      description: "All time visitors",
      className: "bg-gradient-to-br from-purple-500 to-purple-600 text-white",
      subClass: "text-gray-800",
    },
    {
      id: 2,
      title: "Unique Visitors",
      icon: <UserCheck className="h-5 w-5" />,
      value: analyticsData.uniqueVisits,
      description: "Distinct users",
      className: "border-l-4 border-blue-500",
      subClass: "text-gray-500",
    },
    {
      id: 3,
      title: "Today's Visits",
      icon: <Clock className="h-5 w-5 text-green-500" />,
      value: analyticsData.todayVisits,
      description: "Last 24 hours",
      percentageChange: "+12%",
      changeClass: "text-green-500",
      arrowIcon: <ArrowUpRight className="h-4 w-4" />,
      className: "relative overflow-hidden",
      subClass: "text-gray-800",
    },
    {
      id: 4,
      title: "Yesterday",
      icon: <Activity className="h-5 w-5 text-red-500" />,
      value: analyticsData.yesterdayVisits,
      description: "Previous day",
      percentageChange: "-5%",
      changeClass: "text-red-500",
      arrowIcon: <ArrowDownRight className="h-4 w-4" />,
      className: "relative overflow-hidden",
      subClass: "text-gray-800",
    },
    {
      id: 5,
      title: "This Week",
      icon: <BarChart2 className="h-5 w-5" />,
      value: analyticsData.thisWeekVisits,
      description: "Current week stats",
      className: "bg-orange-50 border-orange-200",
      subClass: "text-gray-800",
    },
    {
      id: 6,
      title: "Last Week",
      icon: <Calendar className="h-5 w-5" />,
      value: analyticsData.lastWeekVisits,
      description: "Previous week",
      className: "bg-gradient-to-r from-teal-500 to-teal-600 text-white",
      subClass: "text-gray-800",
    },
    {
      id: 7,
      title: "This Month",
      icon: <TrendingUp className="h-5 w-5" />,
      value: analyticsData.thisMonthVisits,
      description: "Current month",
      className: "border-2 border-indigo-200 bg-indigo-50",
      subClass: "text-gray-800",
    },
    {
      id: 8,
      title: "Last Month",
      icon: <Calendar className="h-5 w-5" />,
      value: analyticsData.lastMonthVisits,
      description: "Previous month total",
      className: "bg-gradient-to-br from-pink-500 to-rose-500 text-white",
      subClass: "text-gray-800",
    },
  ];
};


import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



async function getUsersWithPortfolio() {
    const users = await prisma.user.findMany({
      include: {
        username: true, 
        projects: {
          select: {
            title: true,
            description: true,
            link: true,
            githubLink: true,
            image: true,
          },
        },
      },
    });
  
    return users;
  }

const generateSitemap = (users) => {
  const baseUrl = process.env.NEXTAUTH_URL;
  const urls = users.map(user => 
    `${baseUrl}/portfolio/${user.username}`
  );
  
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      `).join('')}
    </urlset>
  `;
};

export default async function handler(req, res) {
  const users = await getUsersWithPortfolio();
  
  const sitemap = generateSitemap(users);
  
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemap);
}

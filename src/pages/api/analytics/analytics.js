import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/AuthOptions';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user || !session.user.username) {
      return res.status(401).json({ error: 'Unauthorized. User not logged in.' });
    }

    const username = session.user.username;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const thisWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalVisits,
      uniqueVisits,
      todayVisits,
      yesterdayVisits,
      thisWeekVisits,
      lastWeekVisits,
      thisMonthVisits,
      lastMonthVisits,
      recentLogs,
    ] = await Promise.all([
      prisma.visitLog.count({ where: { portfolioOwner: username } }),
      prisma.visitLog
        .groupBy({
          by: ['ipAddress'],
          where: { portfolioOwner: username },
        })
        .then((result) => result.length),
      prisma.visitLog.count({
        where: { portfolioOwner: username, timestamp: { gte: todayStart } },
      }),
      prisma.visitLog.count({
        where: {
          portfolioOwner: username,
          timestamp: { gte: yesterdayStart, lt: todayStart },
        },
      }),
      prisma.visitLog.count({
        where: { portfolioOwner: username, timestamp: { gte: thisWeekStart } },
      }),
      prisma.visitLog.count({
        where: {
          portfolioOwner: username,
          timestamp: { gte: lastWeekStart, lt: thisWeekStart },
        },
      }),
      prisma.visitLog.count({
        where: { portfolioOwner: username, timestamp: { gte: thisMonthStart } },
      }),
      prisma.visitLog.count({
        where: {
          portfolioOwner: username,
          timestamp: { gte: lastMonthStart, lt: thisMonthStart },
        },
      }),
      prisma.visitLog.findMany({
        where: { portfolioOwner: username },
        orderBy: { timestamp: 'desc' },
        take: 10,
      }),
    ]);

    return res.status(200).json({
      totalVisits,
      uniqueVisits,
      todayVisits,
      yesterdayVisits,
      thisWeekVisits,
      lastWeekVisits,
      thisMonthVisits,
      lastMonthVisits,
      recentLogs,
    });
  } catch (error) {
    console.error('Error fetching visit logs:', error);
    return res.status(500).json({ error: 'Failed to fetch visit logs' });
  }
}

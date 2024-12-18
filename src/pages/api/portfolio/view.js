import { PrismaClient } from "@prisma/client";
import { 
  startOfDay, 
  endOfDay, 
  startOfYesterday, 
  endOfYesterday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subWeeks,
  subMonths
} from 'date-fns';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    try {
      // Increment page views
      await incrementPageViews(username);

      // Calculate views for different periods
      const pageViews = await calculatePageViews(username);

      return res.status(200).json({
        pageViews,
        totalViews: await getTotalViews(username)
      });
    } catch (error) {
      console.error('Error fetching page views:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function incrementPageViews(username) {
  const today = new Date();

  // Create or update today's page view
  await prisma.pageView.upsert({
    where: {
      username_period_date: {
        username,
        period: 'Today',
        date: today
      }
    },
    update: {
      views: { increment: 1 }
    },
    create: {
      username,
      period: 'Today',
      views: 1,
      date: today
    }
  });
}

async function calculatePageViews(username) {
  const now = new Date();

  // Define period calculations
  const periods = [
    {
      period: 'Today',
      start: startOfDay(now),
      end: endOfDay(now)
    },
    {
      period: 'Yesterday',
      start: startOfYesterday(now),
      end: endOfYesterday(now)
    },
    {
      period: 'This Week',
      start: startOfWeek(now),
      end: endOfWeek(now)
    },
    {
      period: 'Last Week',
      start: startOfWeek(subWeeks(now, 1)),
      end: endOfWeek(subWeeks(now, 1))
    },
    {
      period: 'Last Month',
      start: startOfMonth(subMonths(now, 1)),
      end: endOfMonth(subMonths(now, 1))
    }
  ];

  // Fetch views for each period
  const pageViews = await Promise.all(periods.map(async (periodData) => {
    const viewRecord = await prisma.pageView.findFirst({
      where: {
        username,
        date: {
          gte: periodData.start,
          lte: periodData.end
        }
      }
    });

    return {
      period: periodData.period,
      views: viewRecord ? viewRecord.views : 0
    };
  }));

  return pageViews;
}

async function getTotalViews(username) {
  const totalViews = await prisma.pageView.aggregate({
    where: { username },
    _sum: { views: true }
  });

  return totalViews._sum.views || 0;
}
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteUsersExcept() {
    try {
      const usersToKeep = ["6763ee91e9e2f13e73c4a45c", "675d7811787575cbf1056637"];

      await prisma.pageView.deleteMany({
        where: {
          username: { notIn: usersToKeep },
        },
      });

      await prisma.profile.deleteMany({
        where: { userId: { notIn: usersToKeep } },
      });
  
      await prisma.session.deleteMany({
        where: { userId: { notIn: usersToKeep } },
      });
  
      await prisma.project.deleteMany({
        where: { userId: { notIn: usersToKeep } },
      });
  
      await prisma.social.deleteMany({
        where: { userId: { notIn: usersToKeep } },
      });
  
      await prisma.link.deleteMany({
        where: { userId: { notIn: usersToKeep } },
      });
  
      await prisma.experience.deleteMany({
        where: { userId: { notIn: usersToKeep } },
      });
  
      await prisma.education.deleteMany({
        where: { userId: { notIn: usersToKeep } },
      });
  
      await prisma.skill.deleteMany({
        where: { userId: { notIn: usersToKeep } },
      });
  
      await prisma.user.deleteMany({
        where: {
          id: { notIn: usersToKeep },
        },
      });
  
      console.log("All users except the specified ones have been deleted.");
    } catch (error) {
      console.error("Error deleting users:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  deleteUsersExcept();
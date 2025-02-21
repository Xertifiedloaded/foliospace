const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function changeUsername(userId, newUsername) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: newUsername,
        updatedAt: new Date(), 
      },
    })

    console.log("Username updated successfully:", updatedUser.username)
    return updatedUser
  } catch (error) {
    if (error.code === "P2002") {
      console.error("Error: Username already exists")
    } else {
      console.error("Error updating username:", error)
    }
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Usage
const userId = "6763ee91e9e2f13e73c4a45c"
const newUsername = "oluwaseun" 

changeUsername(userId, newUsername)
  .then(() => console.log("Script completed"))
  .catch((error) => console.error("Script failed:", error))


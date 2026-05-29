import { existsSync, readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/hash";

if (!process.env.DATABASE_URL && existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z_]+)=["']?(.+?)["']?$/);
    if (match) {
      process.env[match[1]] = match[2];
    }
  }
}

const prisma = new PrismaClient();

async function main() {
  await prisma.savedCollege.deleteMany();
  await prisma.program.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hashPassword("password123");

  await prisma.user.create({
    data: {
      name: "Demo Student",
      email: "student@example.com",
      passwordHash
    }
  });

  await prisma.college.createMany({
    data: [
      {
        name: "Northbridge University",
        city: "Boston",
        state: "MA",
        type: "PRIVATE",
        tuition: 54200,
        acceptanceRate: 0.18,
        ranking: 21,
        imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585",
        website: "https://example.edu/northbridge",
        description: "Research-focused university with strong engineering, economics, and biomedical programs."
      },
      {
        name: "Lakeside State College",
        city: "Madison",
        state: "WI",
        type: "PUBLIC",
        tuition: 18400,
        acceptanceRate: 0.56,
        ranking: 74,
        imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        website: "https://example.edu/lakeside",
        description: "Large public college known for practical research, student life, and affordable in-state tuition."
      },
      {
        name: "Cedar Valley Community College",
        city: "Austin",
        state: "TX",
        type: "COMMUNITY",
        tuition: 6200,
        acceptanceRate: 0.92,
        ranking: null,
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
        website: "https://example.edu/cedar-valley",
        description: "Career-ready associate degrees, transfer pathways, and flexible evening programs."
      },
      {
        name: "Zeal College of Engineering and Research",
        city: "Pune",
        state: "Maharashtra",
        type: "PRIVATE",
        tuition: 125000,
        acceptanceRate: 0.7,
        ranking: null,
        imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a",
        website: "https://zcoer.in/",
        description: "Private engineering college in Narhe, Pune, offering undergraduate and postgraduate technical programs."
      },
      {
        name: "COEP Technological University",
        city: "Pune",
        state: "Maharashtra",
        type: "PUBLIC",
        tuition: 175000,
        acceptanceRate: 0.08,
        ranking: 8,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Coep_extc.jpg",
        website: "https://www.coeptech.ac.in/",
        description: "Historic public technological university in Shivajinagar, Pune, known for engineering education and research."
      }
    ]
  });

  const colleges = await prisma.college.findMany();

  for (const college of colleges) {
    await prisma.program.createMany({
      data: [
        { collegeId: college.id, name: "Computer Science", degree: "BS" },
        { collegeId: college.id, name: "Business Administration", degree: "BBA" },
        { collegeId: college.id, name: "Psychology", degree: "BA" }
      ]
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

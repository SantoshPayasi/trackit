import { PrismaClient } from '@prisma/client';

import fs from 'fs';

import path from 'path';

const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((filename) => {
    const modelName = path.basename(filename, path.extname(filename));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    await model.deleteMany({});
    console.log(`Deleted all data from ${modelName}`);
  }
}

async function main() {
  const directory = path.join(__dirname, 'seedData');

  const fileNames = [
    'team.json',
    'project.json',
    'projectTeam.json',
    'user.json',
    'task.json',
    'attachment.json',
    'comment.json',
    'taskAssignement.json',
  ];

  await deleteAllData(fileNames);

  for (const fileName of fileNames) {
    const filePath = path.join(directory, fileName);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];
    for (const item of data) {
      await model.create({ data: item });
    }

    console.log(`Data seeded for ${modelName} with data of ${fileName}`);
  }
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => prisma.$disconnect());

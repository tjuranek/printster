import bcrypt from "bcryptjs";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetDatabase() {
  const tableNames = Object.values(Prisma.ModelName).join('", "');
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "${tableNames}" RESTART IDENTITY CASCADE`
  );
}

async function createUserRoles() {
  await prisma.userRole.createMany({
    data: [
      {
        id: 1,
        name: "Admin",
      },
      {
        id: 2,
        name: "Employee",
      },
    ],
  });
}

async function createEmployeePositions() {
  await prisma.employeePosition.createMany({
    data: [
      {
        id: 1,
        name: "Operations Manager",
      },
      {
        id: 2,
        name: "Machine Operator",
      },
    ],
  });
}

async function createUsersAndEmployees() {
  const records = [
    {
      id: 1,
      username: "amyfinch",
      password: "admin",
      userRoleId: 1,
      name: "Amy Finch",
      streetAddressLineOne: "7394 Olive Street",
      streetAddressLineTwo: "Bay City, MI 48706",
      emailAddress: "amyfinch@printster.com",
      phoneNumber: "404-531-4723",
      employeePositionId: 1,
      dateCreated: new Date("01-08-2022"),
    },
    {
      id: 2,
      username: "ryanjohnson",
      password: "employee",
      userRoleId: 2,
      name: "Ryan Johnson",
      streetAddressLineOne: "409 Plumb Branch Drive",
      streetAddressLineTwo: "Valdosta, GA 32601",
      emailAddress: "ryanjohnson@printster.com",
      phoneNumber: "987-153-2859",
      employeePositionId: 2,
      dateCreated: new Date("01-12-2022"),
    },
    {
      id: 3,
      username: "gracepotter",
      password: "employee",
      userRoleId: 2,
      name: "Grace Potter",
      streetAddressLineOne: "15 Newport Street",
      streetAddressLineTwo: "Muskogee, OK 74403",
      emailAddress: "gracepotter@printster.com",
      phoneNumber: "238-236-9482",
      employeePositionId: 2,
      dateCreated: new Date("01-11-2022"),
    },
    {
      id: 4,
      username: "tonyboulder",
      password: "employee",
      userRoleId: 2,
      name: "Tony Boulder",
      streetAddressLineOne: "68 Addison Avenue",
      streetAddressLineTwo: "Plattsburgh, NY 12901",
      emailAddress: "tonyboulder@printster.com",
      phoneNumber: "834-103-7844",
      employeePositionId: 2,
      dateCreated: new Date("01-13-2022"),
    },
  ];

  records.forEach(async (record) => {
    await prisma.employee.create({
      data: {
        id: record.id,
        name: record.name,
        streetAddressLineOne: record.streetAddressLineOne,
        streetAddressLineTwo: record.streetAddressLineTwo,
        emailAddress: record.emailAddress,
        phoneNumber: record.phoneNumber,
        employeePositionId: record.employeePositionId,
        dateCreated: record.dateCreated,
      },
    });

    await prisma.user.create({
      data: {
        username: record.username,
        password: await bcrypt.hash(record.password, 10),
        userRoleId: record.userRoleId,
        employeeId: record.id,
      },
    });
  });
}

async function createMachineTypes() {
  await prisma.machineType.createMany({
    data: [
      {
        id: 1,
        name: "Printer",
      },
      {
        id: 2,
        name: "Binder",
      },
      {
        id: 3,
        name: "Coverer",
      },
    ],
  });
}

async function createMachines() {
  await prisma.machine.createMany({
    data: [
      {
        id: 1,
        nickname: "Digiy",
        model: "DigiBook 200",
        manufacturer: "Morgana",
        machineTypeId: 1,
      },
      {
        id: 2,
        nickname: "Docy",
        model: "Docucolor 8080",
        manufacturer: "Xerox",
        machineTypeId: 1,
      },
      {
        id: 3,
        nickname: "Atlast",
        model: "Atlas C150",
        manufacturer: "Formax",
        machineTypeId: 2,
      },
      {
        id: 4,
        nickname: "Perf",
        model: "Perfecta",
        manufacturer: "Automatic",
        machineTypeId: 2,
      },
      {
        id: 5,
        nickname: "Curby",
        model: "CRB-160",
        manufacturer: "Standard Horizon",
        machineTypeId: 3,
      },
      {
        id: 6,
        nickname: "Fab",
        model: "FD 7202",
        manufacturer: "Formax",
        machineTypeId: 3,
      },
    ],
  });
}

async function createJobSteps() {
  await prisma.jobStep.createMany({
    data: [
      {
        id: 1,
        name: "Print",
        machineTypeId: 1,
      },
      {
        id: 2,
        name: "Bind",
        machineTypeId: 2,
      },
      {
        id: 3,
        name: "Cover",
        machineTypeId: 3,
      },
    ],
  });
}

async function createJobs() {
  await prisma.job.createMany({
    data: [
      {
        id: 1,
        name: "To Kill a Mocking Bird",
        author: "Harper Lee",
        publisher: "J. B. Lippincott & Co",
        startDate: new Date("01-01-2022"),
        completionDate: new Date("01-31-2022"),
      },
      {
        id: 2,
        name: "1984",
        author: "George Orwell",
        publisher: "Secker & Warburg",
        startDate: new Date("02-01-2022"),
        completionDate: new Date("02-30-2022"),
      },
      {
        id: 3,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publisher: "Charles Scribners Sons",
        startDate: new Date("03-01-2022"),
        completionDate: new Date("03-28-2022"),
      },
      {
        id: 4,
        name: "Harry Potter and the Sorcers Stone",
        author: "J.K. Rowling",
        publisher: "Bloomsbury",
        startDate: new Date("04-01-2022"),
        completionDate: new Date("04-30-2022"),
      },
      {
        id: 5,
        name: "Animal Farm",
        author: "George Orwell",
        publisher: "Secker & Warburg",
        startDate: new Date("05-01-2022"),
        completionDate: new Date("05-31-2022"),
      },
      {
        id: 6,
        name: "The Hobbit",
        author: "J.R.R. Tolkien",
        publisher: "George Allen & Unwin",
        startDate: new Date("06-01-2022"),
        completionDate: new Date("06-30-2022"),
      },
      {
        id: 7,
        name: "The Little Prince",
        author: "Antoine de Saint - Exupery",
        publisher: "Reynal & Hitchcock",
        startDate: new Date("07-01-2022"),
        completionDate: new Date("07-30-2022"),
      },
      {
        id: 8,
        name: "Fahrenheit 451",
        author: "Ray Bradbury",
        publisher: "Simon & Schuster",
        startDate: new Date("08-01-2022"),
        completionDate: new Date("08-31-2022"),
      },
      {
        id: 9,
        name: "The Catcher in the Rye",
        author: "J.D. Salinger",
        publisher: "Little, Brown",
        startDate: new Date("9-01-2022"),
        completionDate: new Date("9-30-2022"),
      },
      {
        id: 10,
        name: "The Lion, the Witch, and the Wardrobe",
        author: "C.S. Lewis",
        publisher: "Geoffrey Bles",
        startDate: new Date("10-01-2022"),
        completionDate: new Date("10-31-2022"),
      },
      {
        id: 11,
        name: "12 Rules for Life",
        author: "Jordan Peterson",
        publisher: "Random House Canada Penguin Allen",
        startDate: new Date("11-01-2022"),
      },
      {
        id: 12,
        name: "Atomic Habits",
        author: "James Clear",
        publisher: "Penguin Random House",
        startDate: new Date("11-03-2022"),
      },
      {
        id: 13,
        name: "The Phoenix Project",
        author: "Gene Kim",
        publisher: "IT Revolution Press",
        startDate: new Date("11-05-2022"),
      },
    ],
  });
}

async function createJobTaskStatuses() {
  await prisma.jobTaskStatus.createMany({
    data: [
      {
        id: 1,
        name: "Pending",
      },
      {
        id: 2,
        name: "In Progress",
      },
      {
        id: 3,
        name: "Complete",
      },
    ],
  });
}

async function createJobTasks() {
  await prisma.jobTask.createMany({
    data: [
      {
        jobId: 1,
        jobStepId: 1,
        employeeId: 2,
        machineId: 1,
        jobTaskStatusId: 3,
      },
      {
        jobId: 1,
        jobStepId: 2,
        employeeId: 3,
        machineId: 3,
        jobTaskStatusId: 3,
      },
      {
        jobId: 1,
        jobStepId: 3,
        employeeId: 4,
        machineId: 5,
        jobTaskStatusId: 3,
      },
      {
        jobId: 2,
        jobStepId: 1,
        employeeId: 2,
        machineId: 2,
        jobTaskStatusId: 3,
      },
      {
        jobId: 2,
        jobStepId: 2,
        employeeId: 3,
        machineId: 4,
        jobTaskStatusId: 3,
      },
      {
        jobId: 2,
        jobStepId: 3,
        employeeId: 4,
        machineId: 6,
        jobTaskStatusId: 3,
      },
      {
        jobId: 3,
        jobStepId: 1,
        employeeId: 2,
        machineId: 1,
        jobTaskStatusId: 3,
      },
      {
        jobId: 3,
        jobStepId: 2,
        employeeId: 3,
        machineId: 3,
        jobTaskStatusId: 3,
      },
      {
        jobId: 3,
        jobStepId: 3,
        employeeId: 4,
        machineId: 5,
        jobTaskStatusId: 3,
      },
      {
        jobId: 4,
        jobStepId: 1,
        employeeId: 2,
        machineId: 2,
        jobTaskStatusId: 3,
      },
      {
        jobId: 4,
        jobStepId: 2,
        employeeId: 3,
        machineId: 4,
        jobTaskStatusId: 3,
      },
      {
        jobId: 4,
        jobStepId: 3,
        employeeId: 4,
        machineId: 6,
        jobTaskStatusId: 3,
      },
      {
        jobId: 5,
        jobStepId: 1,
        employeeId: 2,
        machineId: 1,
        jobTaskStatusId: 3,
      },
      {
        jobId: 5,
        jobStepId: 2,
        employeeId: 3,
        machineId: 3,
        jobTaskStatusId: 3,
      },
      {
        jobId: 5,
        jobStepId: 3,
        employeeId: 4,
        machineId: 5,
        jobTaskStatusId: 3,
      },
      {
        jobId: 6,
        jobStepId: 1,
        employeeId: 2,
        machineId: 2,
        jobTaskStatusId: 3,
      },
      {
        jobId: 6,
        jobStepId: 2,
        employeeId: 3,
        machineId: 4,
        jobTaskStatusId: 3,
      },
      {
        jobId: 6,
        jobStepId: 3,
        employeeId: 4,
        machineId: 6,
        jobTaskStatusId: 3,
      },
      {
        jobId: 7,
        jobStepId: 1,
        employeeId: 2,
        machineId: 1,
        jobTaskStatusId: 3,
      },
      {
        jobId: 7,
        jobStepId: 2,
        employeeId: 3,
        machineId: 3,
        jobTaskStatusId: 3,
      },
      {
        jobId: 7,
        jobStepId: 3,
        employeeId: 4,
        machineId: 5,
        jobTaskStatusId: 3,
      },
      {
        jobId: 8,
        jobStepId: 1,
        employeeId: 2,
        machineId: 2,
        jobTaskStatusId: 3,
      },
      {
        jobId: 8,
        jobStepId: 2,
        employeeId: 3,
        machineId: 4,
        jobTaskStatusId: 3,
      },
      {
        jobId: 8,
        jobStepId: 3,
        employeeId: 4,
        machineId: 6,
        jobTaskStatusId: 3,
      },
      {
        jobId: 9,
        jobStepId: 1,
        employeeId: 2,
        machineId: 1,
        jobTaskStatusId: 3,
      },
      {
        jobId: 9,
        jobStepId: 2,
        employeeId: 3,
        machineId: 3,
        jobTaskStatusId: 3,
      },
      {
        jobId: 9,
        jobStepId: 3,
        employeeId: 4,
        machineId: 5,
        jobTaskStatusId: 3,
      },
      {
        jobId: 10,
        jobStepId: 1,
        employeeId: 2,
        machineId: 2,
        jobTaskStatusId: 3,
      },
      {
        jobId: 10,
        jobStepId: 2,
        employeeId: 3,
        machineId: 4,
        jobTaskStatusId: 3,
      },
      {
        jobId: 10,
        jobStepId: 3,
        employeeId: 4,
        machineId: 6,
        jobTaskStatusId: 3,
      },
      {
        jobId: 11,
        jobStepId: 1,
        employeeId: 2,
        machineId: 1,
        jobTaskStatusId: 3,
      },
      {
        jobId: 11,
        jobStepId: 2,
        employeeId: 3,
        machineId: 3,
        jobTaskStatusId: 2,
      },
      {
        jobId: 11,
        jobStepId: 3,
        employeeId: 4,
        machineId: 5,
        jobTaskStatusId: 1,
      },
      {
        jobId: 12,
        jobStepId: 1,
        employeeId: 2,
        machineId: 2,
        jobTaskStatusId: 1,
      },
      {
        jobId: 12,
        jobStepId: 2,
        employeeId: 3,
        machineId: 4,
        jobTaskStatusId: 1,
      },
      {
        jobId: 12,
        jobStepId: 3,
        employeeId: 4,
        machineId: 6,
        jobTaskStatusId: 1,
      },
      {
        jobId: 13,
        jobStepId: 1,
        employeeId: 2,
        machineId: 1,
        jobTaskStatusId: 1,
      },
      {
        jobId: 13,
        jobStepId: 2,
        employeeId: 3,
        machineId: 3,
        jobTaskStatusId: 1,
      },
      {
        jobId: 13,
        jobStepId: 3,
        employeeId: 4,
        machineId: 5,
        jobTaskStatusId: 1,
      },
    ],
  });
}

export async function main() {
  await resetDatabase();

  await createUserRoles();
  await createEmployeePositions();
  await createUsersAndEmployees();

  await createMachineTypes();
  await createMachines();

  await createJobSteps();
  await createJobs();
  await createJobTaskStatuses();
  await createJobTasks();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

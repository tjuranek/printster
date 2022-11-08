-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userRoleId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "streetAddressLineOne" TEXT NOT NULL,
    "streetAddressLineTwo" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDeactivated" TIMESTAMP(3),
    "employeePositionId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeePosition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EmployeePosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "machineTypeId" INTEGER NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MachineType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MachineType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completionDate" TIMESTAMP(3),

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobStep" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "machineTypeId" INTEGER NOT NULL,

    CONSTRAINT "JobStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobTaskStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JobTaskStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobTask" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "jobStepId" INTEGER NOT NULL,
    "jobTaskStatusId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "machineId" INTEGER NOT NULL,

    CONSTRAINT "JobTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_employeeId_key" ON "User"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_key" ON "UserRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_emailAddress_key" ON "Employee"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phoneNumber_key" ON "Employee"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_name_streetAddressLineOne_streetAddressLineTwo_key" ON "Employee"("name", "streetAddressLineOne", "streetAddressLineTwo");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeePosition_name_key" ON "EmployeePosition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Machine_nickname_key" ON "Machine"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "MachineType_name_key" ON "MachineType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Job_name_key" ON "Job"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JobStep_name_key" ON "JobStep"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JobStep_machineTypeId_key" ON "JobStep"("machineTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "JobTaskStatus_name_key" ON "JobTaskStatus"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employeePositionId_fkey" FOREIGN KEY ("employeePositionId") REFERENCES "EmployeePosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_machineTypeId_fkey" FOREIGN KEY ("machineTypeId") REFERENCES "MachineType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobStep" ADD CONSTRAINT "JobStep_machineTypeId_fkey" FOREIGN KEY ("machineTypeId") REFERENCES "MachineType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTask" ADD CONSTRAINT "JobTask_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTask" ADD CONSTRAINT "JobTask_jobStepId_fkey" FOREIGN KEY ("jobStepId") REFERENCES "JobStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTask" ADD CONSTRAINT "JobTask_jobTaskStatusId_fkey" FOREIGN KEY ("jobTaskStatusId") REFERENCES "JobTaskStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTask" ADD CONSTRAINT "JobTask_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTask" ADD CONSTRAINT "JobTask_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

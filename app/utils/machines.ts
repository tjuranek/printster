import type { Machine } from "@prisma/client";
import { MachineType } from "~/enums/machineType";

export function isPrinter(machine: Machine) {
  return machine.machineTypeId === MachineType.Printer;
}

export function isBinder(machine: Machine) {
  return machine.machineTypeId === MachineType.Binder;
}

export function isCoverer(machine: Machine) {
  return machine.machineTypeId === MachineType.Coverer;
}

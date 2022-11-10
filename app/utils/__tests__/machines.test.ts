import type { Machine } from '@prisma/client';
import { MachineType } from '~/enums/machineType';
import { isBinder, isCoverer, isPrinter } from '../';

const baseMachine: Partial<Machine> = {
  id: 1,
  nickname: 'nickname',
  model: 'model',
  manufacturer: 'manufacturer'
};

describe('isPrinter()', () => {
  test('returns true if machine is a printer.', () => {
    const machine = {
      ...baseMachine,
      machineTypeId: MachineType.Printer
    } as Machine;

    expect(isPrinter(machine)).toBe(true);
  });

  test('returns false if machine is not a printer.', () => {
    const machine = {
      ...baseMachine,
      machineTypeId: MachineType.Binder
    } as Machine;

    expect(isPrinter(machine)).toBe(false);
  });
});

describe('isBinder()', () => {
  test('returns true if machine is a binder.', () => {
    const machine = {
      ...baseMachine,
      machineTypeId: MachineType.Binder
    } as Machine;

    expect(isBinder(machine)).toBe(true);
  });

  test('returns false if machine is not a binder.', () => {
    const machine = {
      ...baseMachine,
      machineTypeId: MachineType.Printer
    } as Machine;

    expect(isBinder(machine)).toBe(false);
  });
});

describe('isCoverer()', () => {
  test('returns true if machine is a coverer.', () => {
    const machine = {
      ...baseMachine,
      machineTypeId: MachineType.Coverer
    } as Machine;

    expect(isCoverer(machine)).toBe(true);
  });

  test('returns false if machine is not a coverer.', () => {
    const machine = {
      ...baseMachine,
      machineTypeId: MachineType.Printer
    } as Machine;

    expect(isCoverer(machine)).toBe(false);
  });
});

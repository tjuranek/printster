import { request } from '@playwright/test';

/**
 * Logs in an admin users and saves the storage state.
 */
async function loginAdmin() {
  const requestContext = await request.newContext();
  await requestContext.post(
    'http://localhost:3000/?index=&_data=routes%2Findex',
    {
      form: {
        username: 'amyfinch',
        password: 'admin'
      }
    }
  );

  await requestContext.storageState({
    path: 'playwright/storage/adminStorageState.json'
  });
  await requestContext.dispose();
}

/**
 * Logs in an employee and saves the storage state.
 */
async function loginEmployee() {
  const requestContext = await request.newContext();
  await requestContext.post(
    'http://localhost:3000/?index=&_data=routes%2Findex',
    {
      form: {
        username: 'ryanjohnson',
        password: 'employee'
      }
    }
  );

  await requestContext.storageState({
    path: 'playwright/storage/employeeStorageState.json'
  });
  await requestContext.dispose();
}

/**
 * Logs in an admin and employee before tests run.
 */
export default async function globalSetup() {
  await loginAdmin();
  await loginEmployee();
}

import { execSync } from 'child_process';

/**
 * Synchronously resets the database through an npm script.
 */
export function resetDatabase() {
  execSync('npm run db:seed');
}

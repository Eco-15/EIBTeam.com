import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from '../src/lib/neon';

async function main() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations completed!');
}

main().catch(console.error);
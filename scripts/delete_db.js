const { Client } = require('pg');

const connectionString = 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable';

async function main() {
  const client = new Client({ connectionString });
  await client.connect();

  console.log('Connected to DB');

  try {
    const res = await client.query(`SELECT id FROM "Competitor" WHERE name ILIKE '%PR Exports%'`);
    if (res.rows.length > 0) {
      for (let row of res.rows) {
        console.log('Deleting from Competitor with ID:', row.id);
        
        // Delete related entities first
        await client.query(`DELETE FROM "Website" WHERE "competitorId" = $1`, [row.id]);
        await client.query(`DELETE FROM "SocialAccount" WHERE "competitorId" = $1`, [row.id]);
        await client.query(`DELETE FROM "Product" WHERE "competitorId" = $1`, [row.id]);
        
        await client.query(`DELETE FROM "Competitor" WHERE id = $1`, [row.id]);
        console.log('Deleted successfully.');
      }
    } else {
      console.log('No PR Exports competitor found.');
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}

main();

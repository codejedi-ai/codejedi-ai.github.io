// const { Client } = require('@notionhq/client');
import { Client } from '@notionhq/client';
export const notion_client = new Client({ auth: "secret_8zGtazmQsLQXewj4QHkqOcwFoATEXDzpswRe1nty8Ca" });
export const WORK_EXPERIANE = 'ce4d8010744e4fc790d5f1ca4e481955'
async function getDatabase() {
  const databaseId = WORK_EXPERIANE;
  const response = await notion_client.databases.retrieve({ database_id: databaseId });
  console.log(response);
}
await getDatabase();
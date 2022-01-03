import { Client } from "@notionhq/client"

/**
 * Shared Notion client utility to avoid self-fetching within the same server.
 */
export function getNotionClient(version: string = "2022-06-28") {
  const apiKey = process.env.NOTION_INTEGRATION_SECRET || process.env.NOTION_API_KEY
  
  if (!apiKey) {
    throw new Error("NOTION_API_KEY/NOTION_INTEGRATION_SECRET is not configured")
  }

  // We return a standard Notion Client that calls api.notion.com directly
  // Internal routes will use this to avoid the overhead/potential failure of self-fetching via the proxy.
  return new Client({ 
    auth: apiKey,
    // Note: The version is set via headers in the Client, 
    // but the SDK doesn't easily let us change the default version per-instance without using headers.
    // However, the 'notion-version' header is what matters.
  })
}

/**
 * Common headers for Notion API calls
 */
export function getNotionHeaders(version: string = "2022-06-28") {
  const apiKey = process.env.NOTION_INTEGRATION_SECRET || process.env.NOTION_API_KEY
  return {
    "Authorization": `Bearer ${apiKey}`,
    "Notion-Version": version,
    "Content-Type": "application/json",
  }
}

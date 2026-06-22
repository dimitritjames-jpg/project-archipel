import { algoliasearch, type Algoliasearch } from "algoliasearch";
import { ALGOLIA_BUSINESSES_INDEX } from "@/lib/search/types";
import type { AlgoliaBusinessObject } from "@/lib/search/types";

let adminClient: Algoliasearch | null = null;

function getAlgoliaCredentials(): { appId: string; adminKey: string } {
  const appId =
    process.env.ALGOLIA_APP_ID ?? process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
  const adminKey = process.env.ALGOLIA_ADMIN_KEY;

  if (!appId || !adminKey) {
    throw new Error("Algolia admin credentials are not configured.");
  }

  return { appId, adminKey };
}

export function getAlgoliaAdminClient(): Algoliasearch {
  if (!adminClient) {
    const { appId, adminKey } = getAlgoliaCredentials();
    adminClient = algoliasearch(appId, adminKey);
  }

  return adminClient;
}

export async function upsertAlgoliaBusiness(
  object: AlgoliaBusinessObject,
): Promise<void> {
  const client = getAlgoliaAdminClient();

  await client.saveObject({
    indexName: ALGOLIA_BUSINESSES_INDEX,
    body: object,
  });
}

export async function deleteAlgoliaBusiness(objectId: string): Promise<void> {
  const client = getAlgoliaAdminClient();

  await client.deleteObject({
    indexName: ALGOLIA_BUSINESSES_INDEX,
    objectID: objectId,
  });
}

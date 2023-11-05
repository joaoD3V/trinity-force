export interface UseSingleDataRequestProps {
  /**
   * @title integration url
   */
  url: string;
  /**
   * @title authentication (including type)
   */
  authentication?: string;
  /**
   * @title path to needed data
   */
  dataPath: string;
}

export async function useSingleDataRequest<T>({
  dataPath,
  url,
  authentication
}: UseSingleDataRequestProps): Promise<{ data: T | null }> {
  if (!url) return { data: null };

  const headers = new Headers();

  if (authentication) {
    headers.append('Authorization', authentication);
  }

  const result = (await fetch(url, { headers }).then((r) => r.json()));
  console.log('result', result)
  return { data: result[dataPath] ?? null };
}

export interface Props {
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

export async function singleDataRequestLoader<T>(
  {
    dataPath,
    url,
    authentication
  }: UseSingleDataRequestProps,
  _req: Request
): Promise<{ data: T | null }> {
  if (!url) return { data: null };

  const headers = new Headers();

  if (authentication) {
    headers.append('Authorization', authentication);
  }

  const result = (await fetch(url, { headers }).then((r) => r.json()));
  console.log('result', result);
  console.log('dataPathResult', result?[dataPath]);
  return { data: result[dataPath] ?? null };
}

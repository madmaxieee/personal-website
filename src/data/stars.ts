// Star counts come from the GitHub API at build time, so they are as current as the last deploy.
// A failed fetch leaves the count out rather than showing a stale or invented number.

const cache = new Map<string, Promise<number | undefined>>();

function repoOf(href: string): string | undefined {
  const m = href.match(/^https:\/\/github\.com\/([^/]+\/[^/#?]+)\/?$/);
  return m?.[1];
}

async function fetchStars(repo: string): Promise<number | undefined> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  const token = import.meta.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { stargazers_count?: number };
    return data.stargazers_count;
  } catch {
    return undefined;
  }
}

export function stars(href: string | undefined): Promise<number | undefined> {
  const repo = href && repoOf(href);
  if (!repo) return Promise.resolve(undefined);
  if (!cache.has(repo)) cache.set(repo, fetchStars(repo));
  return cache.get(repo)!;
}

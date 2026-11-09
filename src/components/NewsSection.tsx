import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  sourceName: string;
  sourceUrl: string;
  language: 'pl';
  status: 'published';
  facebookUrl?: string;
};
type Feed = { schemaVersion: 1; generatedAt: string | null; items: NewsItem[] };
const isHttpUrl = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  try { return ['https:', 'http:'].includes(new URL(value).protocol); }
  catch { return false; }
};
function isNewsItem(value: unknown): value is NewsItem {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === 'string' && !!v.id &&
    typeof v.title === 'string' && !!v.title.trim() &&
    typeof v.summary === 'string' &&
    typeof v.sourceName === 'string' && !!v.sourceName.trim() &&
    isHttpUrl(v.sourceUrl) &&
    typeof v.publishedAt === 'string' && Number.isFinite(Date.parse(v.publishedAt)) &&
    v.language === 'pl' && v.status === 'published' &&
    (v.facebookUrl === undefined || isHttpUrl(v.facebookUrl));
}
export default function NewsSection() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'empty' | 'error'>('loading');
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch('/news.json', { signal: controller.signal, cache: 'no-store' });
        if (!response.ok) throw new Error('Feed unavailable');
        const data: unknown = await response.json();
        if (!data || typeof data !== 'object') throw new Error('Invalid feed');
        const feed = data as Partial<Feed>;
        if (feed.schemaVersion !== 1 || !Array.isArray(feed.items)) throw new Error('Invalid schema');
        const approved = feed.items.filter(isNewsItem)
          .filter(item => Date.parse(item.publishedAt) <= Date.now())
          .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
          .slice(0, 6);
        if (!controller.signal.aborted) {
          setItems(approved);
          setState(approved.length ? 'ready' : 'empty');
        }
      } catch {
        if (!controller.signal.aborted) setState('error');
      }
    };
    void load();
    return () => controller.abort();
  }, []);
  return <section className="section wrap news-section" id="aktualnosci" aria-labelledby="news-title">
    <div className="eyebrow muted">DOFINANSOWANIA.NL · AKTUALNOŚCI</div>
    <h2 id="news-title">Najnowsze informacje</h2>
    {state === 'loading' && <p role="status">Ładowanie aktualności…</p>}
    {state === 'empty' && <p role="status">Nie ma jeszcze zatwierdzonych publikacji. Sprawdź ponownie później.</p>}
    {state === 'error' && <p role="status">Aktualności są chwilowo niedostępne. Poradniki i odnośniki do urzędów pozostają dostępne powyżej.</p>}
    {state === 'ready' && <div className="news-grid">{items.map(item => <article className="news-card" key={item.id}>
      <time dateTime={item.publishedAt}>{new Intl.DateTimeFormat('pl-PL', { dateStyle: 'long', timeZone: 'Europe/Amsterdam' }).format(new Date(item.publishedAt))}</time>
      <h3>{item.title}</h3><p>{item.summary}</p>
      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Źródło: {item.sourceName} <ArrowUpRight size={15}/></a>
      {item.facebookUrl && <a href={item.facebookUrl} target="_blank" rel="noopener noreferrer">Zobacz wpis na Facebooku <ArrowUpRight size={15}/></a>}
    </article>)}</div>}
  </section>;
}

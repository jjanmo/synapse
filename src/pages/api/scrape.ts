import type { WebApiItem } from '@/types/scrape';
import axios from 'axios';
import * as cheerio from 'cheerio';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  const webApiList: WebApiItem[] = [];

  try {
    if (!url) return res.status(400).json({ error: 'url 쿼리가 필요합니다.' });
    if (typeof url !== 'string') return res.status(400).json({ error: 'url 쿼리는 문자열이어야 합니다.' });

    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'MyScraperBot/1.0' },
      timeout: 10000,
    });
    const $ = cheerio.load(data);

    $('section[aria-labelledby="명세"] ul').each((i, el) => {
      $(el)
        .children('li')
        .each((_, li) => {
          const aText = $(li).children('a').text().trim();
          const aLink = $(li).children('a').attr('href')?.trim();
          if (aText && aLink) {
            const id = aLink.split('/').pop() ?? '';
            webApiList.push({ id, title: aText, url: aLink });
          }
        });
    });

    return res.status(200).json({
      webApiList,
    });
  } catch {
    return res.status(500).json({ error: '페이지 스크래핑 중 오류가 발생했습니다.' });
  }
}

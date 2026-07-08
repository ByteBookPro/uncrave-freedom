// Hero video for each day of the 10-day program.
// Sourced from user-provided Grok/Sora clips, uploaded to the Lovable CDN.
import d1 from '@/assets/day-videos/day01.mp4.asset.json';
import d2 from '@/assets/day-videos/day02.mp4.asset.json';
import d3 from '@/assets/day-videos/day03.mp4.asset.json';
import d4 from '@/assets/day-videos/day04.mp4.asset.json';
import d5 from '@/assets/day-videos/day05.mp4.asset.json';
import d6 from '@/assets/day-videos/day06.mp4.asset.json';
import d7 from '@/assets/day-videos/day07.mp4.asset.json';
import d8 from '@/assets/day-videos/day08.mp4.asset.json';
import d9 from '@/assets/day-videos/day09.mp4.asset.json';
import d10 from '@/assets/day-videos/day10.mp4.asset.json';

const map: Record<number, string> = {
  1: d1.url, 2: d2.url, 3: d3.url, 4: d4.url, 5: d5.url,
  6: d6.url, 7: d7.url, 8: d8.url, 9: d9.url, 10: d10.url,
};

export function getDayVideoUrl(day: number): string | undefined {
  return map[day];
}

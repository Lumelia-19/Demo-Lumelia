// Turns raw media from media-src/ into web-ready files in public/media/.
//
//   npm run media            process every job in media.config.json
//   npm run media -- hero    process only the jobs whose id contains "hero"
//
// Videos become a seamless loop (the tail is cross-faded into the head), muted,
// encoded twice (H.264 MP4 for Safari, VP9 WebM for the rest) with a poster.
// Images are resized and re-encoded as WebP. Requires ffmpeg on the PATH.

import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(join(root, 'media.config.json'), 'utf8'));
const filter = process.argv[2];
const outDir = join(root, 'public', 'media');
mkdirSync(outDir, { recursive: true });

function ffmpeg(args) {
  const run = spawnSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
  if (run.status !== 0) throw new Error(`ffmpeg failed: ${args.join(' ')}`);
}

function kb(file) {
  return `${Math.round(statSync(file).size / 1024)} KB`;
}

function video(job) {
  const src = join(root, job.src);
  const { start = 0, duration, crossfade = 1, width = 1280, fps = 30, crf = 26 } = job;
  const body = duration - crossfade;
  // head = first `crossfade` seconds, tail = last `crossfade` seconds of the segment.
  // Output = xfade(tail → head) followed by the middle: the last frame of the
  // output is the frame just before the tail, which is where the next loop starts.
  const graph = [
    `[0:v]trim=start=${start}:duration=${duration},setpts=PTS-STARTPTS,fps=${fps},scale=${width}:-2:flags=lanczos,format=yuv420p,split=3[s1][s2][s3]`,
    `[s1]trim=start=${body}:duration=${crossfade},setpts=PTS-STARTPTS[tail]`,
    `[s2]trim=start=0:duration=${crossfade},setpts=PTS-STARTPTS[head]`,
    `[s3]trim=start=${crossfade}:duration=${body - crossfade},setpts=PTS-STARTPTS[middle]`,
    `[tail][head]xfade=transition=fade:duration=${crossfade}:offset=0[blend]`,
    `[blend][middle]concat=n=2:v=1:a=0,format=yuv420p[out]`,
  ].join(';');
  const mp4 = join(outDir, `${job.id}.mp4`);
  const webm = join(outDir, `${job.id}.webm`);
  const poster = join(outDir, `${job.id}.webp`);
  ffmpeg(['-i', src, '-filter_complex', graph, '-map', '[out]', '-an', '-c:v', 'libx264', '-preset', 'slow',
    '-crf', String(crf), '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart', mp4]);
  ffmpeg(['-i', mp4, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', String(crf + 10), '-row-mt', '1',
    '-deadline', 'good', '-cpu-used', '2', webm]);
  ffmpeg(['-i', mp4, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '78', poster]);
  console.log(`${job.id}: mp4 ${kb(mp4)}, webm ${kb(webm)}, poster ${kb(poster)}`);
}

function image(job) {
  const src = join(root, job.src);
  const out = join(outDir, `${job.id}.webp`);
  const scale = job.width ? ['-vf', `scale=${job.width}:-2:flags=lanczos`] : [];
  ffmpeg(['-i', src, ...scale, '-c:v', 'libwebp', '-quality', String(job.quality ?? 80), out]);
  console.log(`${job.id}: ${kb(out)}`);
}

for (const job of config.jobs) {
  if (filter && !job.id.includes(filter)) continue;
  (job.type === 'video' ? video : image)(job);
}

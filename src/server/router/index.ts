import { Router , Request, Response, request } from 'express';
import path from 'path';
import fs from 'fs';
const router = Router()
router.get("/resolution", (req, res) => {
    console.log(req.query)
  res.send("resolution")
})


router.get('/video', (req, res) => {
  const videoPath = path.join(__dirname, '..','..', 'videos', 'video.mp4');
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range && range.startsWith('bytes=')) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1;
    const chunksize = (end - start) + 1;
    console.log(`Start: ${start}, End: ${end} Chunksize: ${chunksize}`);
    const file = fs.createReadStream(videoPath, { start, end, signal: AbortSignal.timeout(1000) });
    const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
} else {
    const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
}
});

router.get('/fetch', async (req, res) => {
  res.send(`
    <div style="width: 640px; height: 360px">
      <video controls width="100%" height="100%" muted onDoubleClick={() => { alert('Você não pode tocar esse video'); }}>
        <source src="http://192.168.1.3:3334/video" type="video/mp4" />
      </video>
    </div>
  `);
});


// router.get('/video', (req, res) => {
//   const videoPath = path.join(__dirname, '..','..', 'videos', 'video.mp4');
//   const stat = fs.statSync(videoPath);
//   const fileSize = stat.size;
//   const range = req.headers.range;

//   res.setHeader('Content-Type', 'video/mp4');
//   res.setHeader('Content-Length', fileSize);
//   res.setHeader('Accept-Ranges', 'bytes');
//   res.setHeader('Content-Range', `bytes 0-${fileSize - 1}/${fileSize}`);
//   res.setHeader('Connection', 'keep-alive');
//   res.setHeader('Cache-Control', 'max-age=10000');
//   fs.createReadStream(videoPath).pipe(res);
// })

export { router }
import { Router , Request, Response, request } from 'express';
import path from 'path';
import fs from 'fs';
const router = Router()
router.get("/resolution", (req, res) => {
    console.log(req.query)
  res.send("resolution")
})


router.get('/fetch', async (req, res) => {
  res.send(`
    <div style="width: 640px; height: 360px">
      <video controls width="100%" height="100%" muted onDoubleClick={() => { alert('Você não pode tocar esse video'); }}>
        <source src="http://localahost:3334/video" type="video/mp4" />
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

import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

export const compressVideo = (inputPath: string, outputPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions('-vcodec libx264', '-crf 28')
      .save(outputPath)
      .on('end', () => resolve())
      .on('error', (err) => reject(err));
  });
};

const cache = {};
let fileCount = 0;
let loadedFileCount = 0;


function extractFilenameFromPath(src) {
  const fileNameWithExtension = src.split('/').pop();
  const fileNameParts = fileNameWithExtension.split('.');

  return fileNameParts[0];
}


class AudioManager {

  static loadFiles(files) {
    files.forEach((src) => {
      const key = extractFilenameFromPath(src);

      if (!cache[key]) {
        fileCount++;

        this.load(src);
      }
    });
  }

  static load(src) {
    const key = extractFilenameFromPath(src);

    const audio = new Audio();
    audio.src = src;
    audio.addEventListener('loadeddata', () => {
      loadedFileCount++;
      cache[key] = audio;
    });
  }

  static play(key) {
    cache[key].currentTime = 0;
    cache[key].play();
  }

  static pause(key) {
    cache[key].pause();
  }

  static pauseAll() {
    Object.keys(cache).forEach((key) => this.pause(key));
  }

  static getLoadingProgress() {
    if (loadedFileCount === 0) {
      return 0;
    }

    return Math.ceil(loadedFileCount / fileCount) * 100;
  }

}

export default AudioManager;

const cache = {};
let fileCount = 0;
let loadedFileCount = 0;

function extractFilenameFromPath(src) {
  const fileNameWithExtension = src.split('/').pop();
  const fileNameParts = fileNameWithExtension.split('.');

  return fileNameParts[0];
}


function loadAudio(src) {
  const filename = extractFilenameFromPath(src);
  const audio = new Audio();
  audio.src = src;
  audio.addEventListener('loadeddata', () => {
    loadedFileCount++;
    cache[filename] = audio;
  });
}

export function loadAudioFiles(files) {
  files.forEach((src) => {
    const filename = extractFilenameFromPath(src);

    if (!cache[filename]) {
      fileCount++;
      loadAudio(src);
    }
  });
}

export function getLoadingProgress() {
  if (loadedFileCount === 0) {
    return 0;
  }

  return Math.ceil(loadedFileCount / fileCount) * 100;
}


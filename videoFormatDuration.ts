function getVideoDuration(videoPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoPath;
    
    video.addEventListener('loadedmetadata', () => {
      const videoDuration = video.duration;
      const formattedDuration = formatDuration(videoDuration);
      resolve(formattedDuration);
    });

    video.addEventListener('error', (error) => {
      reject(error);
    });
  });
}

function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  return `${hours}:${minutes}:${seconds}`;
}


const videoPath = 'chemin_vers_la_video.mp4';

getVideoDuration(videoPath)
  .then((duration) => {
    console.log('Durée de la vidéo :', duration);
  })
  .catch((error) => {
    console.error('Erreur lors de la récupération de la durée de la vidéo :', error);
  });


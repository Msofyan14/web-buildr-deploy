import { AnimatedWrapper } from "@/components/AnimatedWrapper";

const ViewVideo = ({ section }) => {
  const { contents, animation } = section;

  const getYoutubeUrl = (url) => {
    try {
      if (!url) return ""; // Jika url kosong, kembalikan string kosong
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      return videoId || ""; // Jika tidak ada 'v', tetap kembalikan string kosong
    } catch (error) {
      console.error(error);
      return ""; // Jika parsing gagal, kembalikan string kosong
    }
  };

  return (
    <div className="relative">
      {contents.map((content) => (
        <AnimatedWrapper key={content.id} animationData={animation}>
          <div
            className={` max-w-full `}
            style={{
              transform: `rotate(${content.rotation}deg)`,
              zIndex: 999,
              overflow: "hidden",
              margin: "auto",
              aspectRatio: content.ratio,
              width: `${content.width}px`,

              height: `${content.width * content.ratio}`,
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${getYoutubeUrl(
                content.url
              )}?autoplay=${content.isAutoPlay ? 1 : 0}&mute=${
                content.isMuted ? 1 : 0
              }&playlist=${getYoutubeUrl(content.url)}&loop=${
                content.isLoop ? 1 : 0
              }&controls=${content.isControls ? 0 : 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video"
            />
          </div>
        </AnimatedWrapper>
      ))}
    </div>
  );
};

export default ViewVideo;

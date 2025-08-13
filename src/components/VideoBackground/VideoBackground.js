import { useSelector } from "react-redux";
import useTrailerVideoKey from "../../hooks/useTrailerVideoKey";
import { useState } from "react";

const VideoBackground = ({ movieId }) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  useTrailerVideoKey(movieId);
  const trailerKey = useSelector(
    (state) => state.movies?.trailerVideoKey[movieId]
  );

  if (!trailerKey) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {!isIframeLoaded && (
        <img
          src={`https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`}
          className="w-full h-full object-cover absolute top-0 left-0"
          alt="Trailer Preview"
        />
      )}
      <iframe
        loading="lazy"
        className={`absolute w-full h-full top-0 left-0 object-cover transition-opacity duration-500 ${
          isIframeLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&rel=0&modestbranding=1`}
        title="YouTube trailer"
        allow="autoplay; fullscreen; encrypted-media"
        frameBorder="0"
        allowFullScreen
        onLoad={() => {
          setTimeout(() => setIsIframeLoaded(true), 1500);
        }}
      ></iframe>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
    </div>
  );
};

export default VideoBackground;

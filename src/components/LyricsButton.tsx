import playerStyles from "../styles/PlayerStyles";

type LyricsButtonProps = {
  isMobile: boolean;
  isLyricsOpen: boolean;
  onClick: () => void;
};

const LyricsButton = ({ isMobile, isLyricsOpen, onClick }: LyricsButtonProps) => {
  let label = "Open Lyrics";
  if (isMobile && isLyricsOpen) {
    label = "Close";
  } else if (isMobile) {
    label = "Lyrics";
  } else if (isLyricsOpen) {
    label = "Close Lyrics";
  }

  return (
    <button
      onClick={onClick}
      style={
        isMobile
          ? { ...playerStyles.lyricsButton, width: "auto" }
          : playerStyles.lyricsButton
      }
    >
      {label}
    </button>
  );
};

export default LyricsButton;
// @flow
import { useRef, useEffect } from "react";
import { css, StyleSheet } from "aphrodite";
import Icon from "@mdi/react";
import { mdiVideoOff, mdiVolumeVariantOff } from "@mdi/js";

function VideoContainer({ peer }) {
  const videoElem = useRef(null);
  const { stream, mutedAudio, videoEnabled } = peer;

  useEffect(() => {
    if (stream != null && videoElem.current != null) {
      videoElem.current.onloadedmetadata = () => {
        videoElem.current?.play();
      };
      videoElem.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={css(styles.root)}>
      <video
        className={css(styles.video)}
        ref={videoElem}
        autoPlay
        playsInline
      />
      <div className={css(styles.indicators)}>
        {mutedAudio && (
          <Icon
            className={css(styles.icon)}
            path={mdiVolumeVariantOff}
            color="#FFF"
          />
        )}
        {videoEnabled && (
          <Icon className={css(styles.icon)} path={mdiVideoOff} color="#FFF" />
        )}
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "400px",
    height: "300px",
    backgroundColor: "#e6e2d6",
    borderRadius: "10px",
    justifySelf: "center",
    display: "inline-flex",
    position: "relative",
  },
  icon: {
    margin: "2px 0",
  },
  indicators: {
    position: "absolute",
    width: 24,
    top: 10,
    left: 10,
  },
  video: {
    transform: "scale(-1, 1)",
    flexGrow: "1",
    width: "100%",
    borderRadius: "10px",
  },
});

export default VideoContainer;

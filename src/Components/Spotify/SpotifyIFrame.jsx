import { React, useEffect } from "react";

const SpotifyIFrame = (uri) => {

  useEffect(() => {
    if (uri !== "") {
      const timer = setTimeout(() => {
        async function setupIframe() {
          const script = document.createElement("script");
          script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
          script.async = true;
          document.body.appendChild(script);

          window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
              uri: uri
            };

            const callback = (EmbedController) => {};
            IFrameAPI.createController(element, options, callback);
          };
        }
      setupIframe()

    }, 2000)
    return () => clearTimeout(timer)
  }
  }, [])

  return(
    <>
      <div id="spotify__iframe">
        <iframe
          title="spotify__iframe"
          src={`https://open.spotify.com/embed/track/${uri}?utm_source=generator`}
          width="600px"
          height="800px"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          >
        </iframe>
      </div>
    </>
  )

}

export default SpotifyIFrame


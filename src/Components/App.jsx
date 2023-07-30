import logo from '../logo.svg';
import './App.css';

import AudioPlayer from './AudioPlayer/AudioPlayer';
import DisplayTrack from './AudioPlayer/DisplayStation';
import Controls from './AudioPlayer/Controls';
import Tuner from './Tuner/Tuner';

function App() {
  return (
    <>
      <Tuner>
      </Tuner>
      <AudioPlayer>
      </AudioPlayer>
    </>
  );
}

export default App;

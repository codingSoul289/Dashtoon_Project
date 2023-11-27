import './App.css';
import ComicStrip from './components/ComicStrip';
// import PanelStripComponent from './components/PanelStripComponent'
function App() {
  // const apiUrl = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
  // const data = {
  //   "inputs":"Astronaut riding a horse"
  // };
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Comic Strip
        </p>
        <ComicStrip></ComicStrip>
      </header>
    </div>
  );
}

export default App;

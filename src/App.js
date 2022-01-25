import "./App.css";

function App() {
  return (
    <div className="App">
      <navbar className="navbar">
        <h1 className="logo">PathFinder</h1>
        <ul className="rightRow">
          <li>Vizualize</li>
        </ul>
      </navbar>
      <div className="main">
        <div className="grid"></div>
      </div>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;

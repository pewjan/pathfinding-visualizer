import "./App.css";

function App() {
  const gridArr = [];
  const displayGrid = () => {
    for (let row = 0; row < 10; row++) {
      gridArr.push([]);
      for (let col = 0; col < 20; col++) {
        gridArr[row].push(<div className={`column`}>&nbsp;</div>);
      }
    }
  };
  displayGrid();
  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="logo">PathFinder</h1>
        <ul className="rightRow">
          <li className="vizualizebtn">Vizualize</li>
        </ul>
      </nav>
      <div className="main">
        <h1>Click on two points to find the path</h1>
        <div className="grid">
          {gridArr.map((grid, index) => {
            return (
              <div className={`row${index}`}>
                {grid.map((item) => {
                  return item;
                })}
              </div>
            );
          })}
        </div>
      </div>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;

import "./App.css";
import { useState } from "react";

function App() {
  const [openedAlgo, setOpenedAlgo] = useState(false);
  const handleMenu = (e) => {
    if (e.target.innerHTML === "Algorithms ▼") {
      setOpenedAlgo(!openedAlgo);
    }
  };
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
          <li
            onClick={(e) => {
              handleMenu(e);
            }}
          >
            Algorithms ▼
          </li>
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
      <footer className="footer">
        <div className="items">
          <h1>© Hidden, 2022</h1>

          <h1>Source Code</h1>
        </div>
      </footer>
    </div>
  );
}

export default App;

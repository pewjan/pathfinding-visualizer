import "./App.css";
import { useState } from "react";

function App() {
  const [openedAlgo, setOpenedAlgo] = useState(false);
  const handleMenu = (e) => {
    if (e.target.innerHTML === "Algorithms ▼") {
      setOpenedAlgo(!openedAlgo);
      console.log(e.target.innerHTML);
    }
  };
  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="logo">PathFinder</h1>
        <ul className="rightRow">
          <li className="algorithm">
            <p
              onClick={(e) => {
                handleMenu(e);
              }}
              className={`algorithms ${openedAlgo && "clicked"} `}
            >
              Algorithms ▼
            </p>
            {openedAlgo && (
              <div className="algo">
                <p>A* Search</p>
                <p>Dijkstra's Algorithm</p>
                <p>Breadth-first Search</p>
              </div>
            )}
          </li>
          <li className="vizualizebtn">Vizualize</li>
        </ul>
      </nav>
      <div className="main">
        <h1>Click on two points to find the path</h1>
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

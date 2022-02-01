import "../App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const [openedAlgo, setOpenedAlgo] = useState(false);
  const [algorithm, setAlgorithm] = useState("");
  const algorithmRef = useRef();
  const handleMenu = (e) => {
    if (e.target.innerHTML === "Algorithms ▼") {
      setOpenedAlgo(!openedAlgo);
    }
  };
  const handleAlgorithmName = () => {
    if (algorithm === "linear") {
      return "Linear Algorithm";
    } else if (algorithm === "astar") {
      return "A* Algorithm";
    } else {
      return "Dijkstra Algorithm";
    }
  };
  const handleClickOutside = (e) => {
    if (openedAlgo == true) {
      if (e.target.parentElement.className !== "algo") {
        setOpenedAlgo(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutsideFunc = (e) => {
      handleClickOutside(e);
    };
    document.addEventListener("click", handleClickOutsideFunc);
    return () => document.removeEventListener("click", handleClickOutsideFunc);
  }, [openedAlgo]);

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
              <div className="algo" ref={algorithmRef}>
                <p
                  onClick={() => {
                    setAlgorithm("linear");
                  }}
                >
                  Linear Search
                </p>
                <p
                  onClick={() => {
                    setAlgorithm("astar");
                  }}
                >
                  A* Search
                </p>
                <p
                  onClick={() => {
                    setAlgorithm("dijkstra");
                  }}
                >
                  Dijkstra's Algorithm
                </p>
              </div>
            )}
          </li>
          <li className="vizualizebtn">Vizualize</li>
        </ul>
      </nav>
      <div className="main">
        <h1>
          {algorithm === ""
            ? "Select an Algorithm and click on two points to find the path"
            : `${handleAlgorithmName()} is selected`}
        </h1>
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

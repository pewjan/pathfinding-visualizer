import "../App.css";
import { useEffect, useState, useRef } from "react";
const Queue = require("@supercharge/queue-datastructure");

function App() {
  const [openedAlgo, setOpenedAlgo] = useState(false);
  const [algorithm, setAlgorithm] = useState("");

  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [counter, setCounter] = useState(0);
  const [globalPathCounter, setglobalPathCounter] = useState(0);

  const [prevS, setPrevS] = useState(null);
  const [prevE, setPrevE] = useState(null);
  const [finished, setFinished] = useState(false);

  const directions = [
    [-1, 0], //up
    [0, 1], //right
    [1, 0], //down
    [0, -1], //left
    [-1, -1], //up left
    [1, -1], //down left
    [-1, 1], //up right
    [1, 1], // down right
  ];

  const [graph, setGraph] = useState([]);
  const graphRef = useRef();
  const algorithmRef = useRef();

  const handleMenu = (e) => {
    if (e.target.innerHTML === "Algorithms ▼") {
      setOpenedAlgo(!openedAlgo);
    }
  };
  const handleAlgorithmName = () => {
    if (algorithm === "linear") {
      return "Linear Algorithm";
    } else if (algorithm === "bfs") {
      return "Breadth First Search";
    } else if (algorithm === "dfs") {
      return "Depth First Search";
    } else if (algorithm === "bfsd") {
      return "Breadth First Search w/ diagonal";
    }
  };
  const handleGraphCreation = () => {
    let copyGraph = [];
    for (let i = 0; i < 8; i++) {
      let insideGraph = [];
      for (let j = 0; j < 20; j++) {
        insideGraph.push({ used: false, searched: false });
      }
      copyGraph.push(insideGraph);
    }
    setGraph(copyGraph);
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

  const handleGraphClick = (indexR, indexJ) => {
    //start and end
    let copyGraph = [...graph];
    if (counter === 0) {
      copyGraph[indexR][indexJ] = "S";
      setPrevS([indexR, indexJ]);
      setStart(true);
    } else if (counter === 1) {
      copyGraph[indexR][indexJ] = "E";
      setPrevE([indexR, indexJ]);
      setEnd(true);
    } else if (counter > 1 && counter % 2 === 0) {
      copyGraph[prevS[0]][prevS[1]] = "";
      copyGraph[indexR][indexJ] = "S";
      setPrevS([indexR, indexJ]);
    } else if (counter > 1 && counter % 2 !== 0) {
      copyGraph[prevE[0]][prevE[1]] = "";
      copyGraph[indexR][indexJ] = "E";
      setPrevE([indexR, indexJ]);
    }
    setGraph(copyGraph);
  };
  const setGraphClassName = (indexR, indexJ) => {
    if (graph[indexR][indexJ] === "S") {
      return "startCol";
    } else if (graph[indexR][indexJ] === "E") {
      return "endCol";
    } else if (graph[indexR][indexJ].used === true) {
      return "passed";
    } else if (graph[indexR][indexJ].searched === true) {
      return "searched";
    } else {
      return "";
    }
  };
  const graphVisualization = graph.map((item, indexR) => {
    return (
      <div className="Row" key={indexR}>
        {item.map((box, indexJ) => {
          return (
            <div
              onClick={() => {
                handleGraphClick(indexR, indexJ);
                setCounter(counter + 1);
              }}
              className={`Col ${setGraphClassName(indexR, indexJ)} `}
              key={indexJ}
            >
              {graph[indexR][indexJ] === "S" || graph[indexR][indexJ] === "E"
                ? graph[indexR][indexJ]
                : ""}
            </div>
          );
        })}
      </div>
    );
  });
  const handleAlgoVisualize = () => {
    if (algorithm === "linear") {
      handleLinearSearch();
    } else if (algorithm === "bfs") {
      handleBsearch();
    } else if (algorithm === "dfs") {
      handleDsearch();
    } else if (algorithm === "bfsd") {
      handleBdsearch();
    }
  };

  const handleClearBtn = () => {
    setCounter(0);
    handleGraphCreation();
    setFinished(false);
    setglobalPathCounter(0);
  };

  const handleAlgoComplete = (pathCounter) => {
    setglobalPathCounter(pathCounter);
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  const handleLinearSearch = async () => {
    let startNodeRow = prevS[0];
    let startNodeCol = prevS[1];
    let endNodeRow = prevE[0];
    let endNodeCol = prevE[1];
    let pathCounter = 0;
    let copyGraph = [...graph];
    if (startNodeRow <= endNodeRow) {
      for (let i = startNodeRow; i <= endNodeRow; i++) {
        if (i === startNodeRow && i !== endNodeRow) {
          for (let j = startNodeCol + 1; j <= graph[i].length - 1; j++) {
            copyGraph[i][j].used = true;
            setGraphClassName(i, j);
            pathCounter++;
            const nextCopyGraph = [...copyGraph];
            setGraph(nextCopyGraph);
            await sleep(500);
          }
        } else if (i !== startNodeRow && i !== endNodeRow) {
          for (let j = 0; j <= graph[i].length - 1; j++) {
            copyGraph[i][j].used = true;
            setGraphClassName(i, j);
            pathCounter++;
            const nextCopyGraph = [...copyGraph];
            setGraph(nextCopyGraph);
            await sleep(500);
          }
        } else if (startNodeRow === endNodeRow && startNodeCol > endNodeCol) {
          for (let j = startNodeCol - 1; j >= endNodeCol + 1; j--) {
            copyGraph[i][j].used = true;
            setGraphClassName(i, j);
            pathCounter++;
            const nextCopyGraph = [...copyGraph];
            setGraph(nextCopyGraph);
            await sleep(500);
          }
        } else {
          if (startNodeRow !== endNodeRow) {
            for (let j = 0; j <= endNodeCol - 1; j++) {
              copyGraph[i][j].used = true;
              setGraphClassName(i, j);
              pathCounter++;
              const nextCopyGraph = [...copyGraph];
              setGraph(nextCopyGraph);
              await sleep(500);
            }
          } else {
            for (let j = startNodeCol + 1; j <= endNodeCol - 1; j++) {
              copyGraph[i][j].used = true;
              setGraphClassName(i, j);
              pathCounter++;
              const nextCopyGraph = [...copyGraph];
              setGraph(nextCopyGraph);
              await sleep(500);
            }
          }
        }
      }
    } else {
      for (let i = startNodeRow; i >= endNodeRow; i--) {
        if (i === startNodeRow && i !== endNodeRow) {
          for (let j = startNodeCol - 1; j >= 0; j--) {
            copyGraph[i][j].used = true;
            setGraphClassName(i, j);
            pathCounter++;
            const nextCopyGraph = [...copyGraph];
            setGraph(nextCopyGraph);
            await sleep(500);
          }
        } else if (i !== startNodeRow && i !== endNodeRow) {
          for (let j = graph[i].length - 1; j >= 0; j--) {
            copyGraph[i][j].used = true;
            setGraphClassName(i, j);
            pathCounter++;
            const nextCopyGraph = [...copyGraph];
            setGraph(nextCopyGraph);
            await sleep(500);
          }
        } else if (i === endNodeRow) {
          for (let j = graph[i].length - 1; j >= endNodeCol; j--) {
            copyGraph[i][j].used = true;
            setGraphClassName(i, j);
            pathCounter++;
            const nextCopyGraph = [...copyGraph];
            setGraph(nextCopyGraph);
            await sleep(500);
          }
        }
      }
    }
    setFinished(true);
    handleAlgoComplete(pathCounter);
  };
  const handleBsearch = async () => {
    let startNodeRow = prevS[0];
    let startNodeCol = prevS[1];
    let endNodeRow = prevE[0];
    let endNodeCol = prevE[1];
    let pathCounter = 0;
    let copyGraph = [...graph];
    let prev = [];
    const seen = new Array(copyGraph.length)
      .fill(0)
      .map(() => new Array(copyGraph[0].length).fill(false));

    let found = false;
    const q = [];
    q.push([startNodeRow, startNodeCol]);
    const values = [];
    while (q.length !== 0) {
      const currentPos = q.shift();
      const row = currentPos[0];
      const col = currentPos[1];
      if (
        row < 0 ||
        row >= copyGraph.length ||
        col < 0 ||
        col >= copyGraph[0].length ||
        seen[row][col]
      ) {
        continue;
      }
      seen[row][col] = true;
      values.push(copyGraph[row][col]);
      //console.log(values);
      if (row === endNodeRow && endNodeCol === col) {
        break;
      }
      if (copyGraph[row][col] !== "S") {
        copyGraph[row][col].searched = true;
        setGraphClassName(row, col);
        pathCounter++;
        const nextCopyGraph = [...copyGraph];
        setGraph(nextCopyGraph);
        await sleep(100);
      }

      for (let i = 0; i < 4; i++) {
        const currentDir = directions[i];
        q.push([row + currentDir[0], col + currentDir[1]]);
        prev.push([
          currentPos[0],
          currentPos[1],
          row + currentDir[0],
          col + currentDir[1],
        ]);
      }
    }
    let path = handleBackWards(prev, pathCounter);
    path = path.reverse();
    handlefsAfterVisualization(path);
    setglobalPathCounter(path.length);
    setFinished(true);
  };

  const handlefsAfterVisualization = async (path) => {
    await sleep(300);
    let copyGraph = [...graph];
    for (let i = 0; i < path.length; i++) {
      copyGraph[path[i][0]][path[i][1]].used = true;
      setGraphClassName(path[i][0], path[i][1]);
      const nextCopyGraph = [...copyGraph];
      setGraph(nextCopyGraph);
      await sleep(200);
    }
  };
  const handleBackWards = (prev, pathCounter) => {
    let startNodeRow = prevS[0];
    let startNodeCol = prevS[1];
    let endNodeRow = prevE[0];
    let endNodeCol = prevE[1];
    let path = [];
    let found = false;
    let nodeToFind = prevE;
    let nodeToFindRow = endNodeRow;
    let nodeToFindCol = endNodeCol;
    while (!found) {
      [nodeToFindRow, nodeToFindCol] = findPrevNode(
        nodeToFindRow,
        nodeToFindCol,
        prev
      );

      if (nodeToFindRow == startNodeRow && nodeToFindCol == startNodeCol) {
        found = true;
        break;
      }
      path.push([nodeToFindRow, nodeToFindCol]);
    }
    return path;
  };
  const findPrevNode = (nodeToFindRow, nodeToFindCol, prev) => {
    for (let i = 0; i < prev.length; i++) {
      if (prev[i][2] === nodeToFindRow && prev[i][3] === nodeToFindCol) {
        nodeToFindRow = prev[i][0];
        nodeToFindCol = prev[i][1];
        return [nodeToFindRow, nodeToFindCol];
      }
    }
  };
  const handleDsearch = async () => {
    let startNodeRow = prevS[0];
    let startNodeCol = prevS[1];
    let endNodeRow = prevE[0];
    let endNodeCol = prevE[1];
    let pathCounter = 0;
    let copyGraph = [...graph];
    let prev = [];
    const seen = new Array(copyGraph.length)
      .fill(0)
      .map(() => new Array(copyGraph[0].length).fill(false));

    let found = false;
    const q = [];
    q.push([startNodeRow, startNodeCol]);
    const values = [];
    while (q.length !== 0) {
      const currentPos = q.pop();
      const row = currentPos[0];
      const col = currentPos[1];
      if (
        row < 0 ||
        row >= copyGraph.length ||
        col < 0 ||
        col >= copyGraph[0].length ||
        seen[row][col]
      ) {
        continue;
      }
      seen[row][col] = true;
      values.push(copyGraph[row][col]);
      //console.log(values);
      if (row === endNodeRow && endNodeCol === col) {
        break;
      }
      if (copyGraph[row][col] !== "S") {
        copyGraph[row][col].searched = true;
        setGraphClassName(row, col);
        pathCounter++;
        const nextCopyGraph = [...copyGraph];
        setGraph(nextCopyGraph);
        await sleep(100);
      }

      for (let i = 0; i < 4; i++) {
        const currentDir = directions[i];
        q.push([row + currentDir[0], col + currentDir[1]]);
        prev.push([
          currentPos[0],
          currentPos[1],
          row + currentDir[0],
          col + currentDir[1],
        ]);
      }
    }
    let path = handleBackWards(prev, pathCounter);
    path = path.reverse();
    handlefsAfterVisualization(path);
    setglobalPathCounter(path.length);
    setFinished(true);
  };
  const handleBdsearch = async () => {
    let startNodeRow = prevS[0];
    let startNodeCol = prevS[1];
    let endNodeRow = prevE[0];
    let endNodeCol = prevE[1];
    let pathCounter = 0;
    let copyGraph = [...graph];
    let prev = [];
    const seen = new Array(copyGraph.length)
      .fill(0)
      .map(() => new Array(copyGraph[0].length).fill(false));

    let found = false;
    const q = [];
    q.push([startNodeRow, startNodeCol]);
    const values = [];
    while (q.length !== 0) {
      const currentPos = q.shift();
      const row = currentPos[0];
      const col = currentPos[1];
      if (
        row < 0 ||
        row >= copyGraph.length ||
        col < 0 ||
        col >= copyGraph[0].length ||
        seen[row][col]
      ) {
        continue;
      }
      seen[row][col] = true;
      values.push(copyGraph[row][col]);
      //console.log(values);
      if (row === endNodeRow && endNodeCol === col) {
        break;
      }
      if (copyGraph[row][col] !== "S") {
        copyGraph[row][col].searched = true;
        setGraphClassName(row, col);
        pathCounter++;
        const nextCopyGraph = [...copyGraph];
        setGraph(nextCopyGraph);
        await sleep(100);
      }

      for (let i = 0; i < directions.length; i++) {
        const currentDir = directions[i];
        q.push([row + currentDir[0], col + currentDir[1]]);
        prev.push([
          currentPos[0],
          currentPos[1],
          row + currentDir[0],
          col + currentDir[1],
        ]);
      }
    }
    let path = handleBackWards(prev, pathCounter);
    path = path.reverse();
    handlefsAfterVisualization(path);
    setglobalPathCounter(path.length);
    setFinished(true);
  };
  useEffect(() => {
    handleGraphCreation();
    setCounter(0);
  }, [algorithm]);
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
                    setAlgorithm("bfs");
                  }}
                >
                  B.F.S
                </p>
                <p
                  onClick={() => {
                    setAlgorithm("dfs");
                  }}
                >
                  D.F.S
                </p>
                <p
                  onClick={() => {
                    setAlgorithm("bfsd");
                  }}
                >
                  B.F.S w/ Diagonal
                </p>
              </div>
            )}
          </li>
          <li onClick={handleAlgoVisualize} className="vizualizebtn">
            Vizualize
          </li>
          <li onClick={handleClearBtn} className="clearbtn">
            Clear
          </li>
        </ul>
      </nav>
      <div className="main">
        <h1>
          {algorithm === ""
            ? "Select an Algorithm and click on two points to find the path"
            : `${handleAlgorithmName()} is selected`}
        </h1>
        <p>{finished && `The path length was ${globalPathCounter}`}</p>

        <div className="graph">
          <div ref={graphRef} className="graphInner">
            {algorithm && graphVisualization}
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="items">
          <h1>Source Code</h1>
        </div>
      </footer>
    </div>
  );
}

export default App;

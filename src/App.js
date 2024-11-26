import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [nodes, setNodes] = useState([
    { id: 1, parentId: null, side: null, x: 0, y: 50, level: 0 }, // Root node
  ]);
  const containerRef = useRef(null);

  useEffect(() => {
  
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes];
      updatedNodes[0].x = containerWidth / 2; 
      return updatedNodes;
    });
  }, []);

  useEffect(() => {
    
    const container = containerRef.current;
    const maxNodeX = Math.max(...nodes.map((node) => node.x)) + 200;
    const minNodeX = Math.min(...nodes.map((node) => node.x)) - 200;

    const newWidth = Math.max(container.offsetWidth, maxNodeX - minNodeX);
    container.style.width = `${newWidth}px`;
  }, [nodes]);

  const addNode = (parentId, side) => {
    setNodes((prevNodes) => {
      const parentNode = prevNodes.find((node) => node.id === parentId);

     
      const siblingNodes = prevNodes.filter(
        (node) => node.parentId === parentId && node.side === side
      );

      
      const newY =
        siblingNodes.length > 0
          ? siblingNodes[siblingNodes.length - 1].y + 100 
          : parentNode.y + 150; 

      
      const newX = parentNode.x + (side === "left" ? -200 : 200);

      const newNode = {
        id: prevNodes.length + 1,
        parentId,
        side,
        x: newX,
        y: newY,
        level: parentNode.level + 1,
      };

      return [...prevNodes, newNode];
    });
  };

  return (
    <div className="outer-container">
      <div ref={containerRef} className="tree-container">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="node"
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              transform: "translateX(-50%)", 
            }}
          >
            <div className={`box ${node.side}`}>
             +
            </div>
            <div className="button-container">
              <button onClick={() => addNode(node.id, "left")}>Left</button>
              <button onClick={() => addNode(node.id, "right")}>Right</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;



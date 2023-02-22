import { useEffect, useState } from "react";
import "./server";

function App() {
  const handleSubmit = () => {
    fetch("/api/hello")
      .then((data) => {
        data.json().then((dt) => console.log(dt));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <button onClick={handleSubmit}>click</button>
    </div>
  );
}

export default App;

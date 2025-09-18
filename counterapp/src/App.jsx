import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";  //bootstrap css

function App() {    // state to hold the count value - like array 
  const [count, setCount] = useState(0);
  const increment = () => setCount(count+1);
  const decrement  = () => setCount(count-1);
  const reset = () => setCount(0);
// bootstrap classes for styling
  return (  
    <div className = "container text-center mt-5">
      <h1 className="mb-4"> Counter App</h1>
      <h2 className="display-3 mb-4">{count}</h2>
      <div className="d-flex justify-content-center gap-3">
      <button className="btn btn-primary mx-2" onClick={increment}>Increment</button>
      <button className="btn btn-danger mx-2" onClick={decrement}>Decrement</button>
      <button className="btn btn-secondary mx-2" onClick={reset}>Reset</button>
    </div> </div>
  );
}
export default App;

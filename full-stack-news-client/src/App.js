import './App.css';
import AllPosts from './components/allPosts';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <AllPosts />
    </div>
  );
}

export default App;

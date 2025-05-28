import Users from "./components/Users";
import './App.css';
import WriteUser from "./components/WriteUser";

function App() {
  return (
    <>
      <h1>Users handling</h1>
      <div>
        <WriteUser/>
      </div>
      <div>
        <Users/>
      </div>
    </>
  );
}

export default App;

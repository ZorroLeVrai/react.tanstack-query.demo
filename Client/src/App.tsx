import Users from "./components/Users";
import './App.css';
import OptionTab from "./components/OptionTab";

function App() {
  return (
    <>
      <h1 className="text-center">Users handling</h1>
      <div>
        <OptionTab/>
      </div>
      <div>
        <Users/>
      </div>
    </>
  );
}

export default App;

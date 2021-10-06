import logo from './logo.svg';
import './App.css';
import { calculateEquivalents } from './calculator';

function App() {
  const usage = 100;
  const data = calculateEquivalents(usage);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {data.equivalents.map(stat => {
          <div key={stat.name} >
            <p>
            {stat.name}
            {stat.desc}
            {stat.value}
            </p>
          </div>
        })}
    </div>
  );
}

export default App;





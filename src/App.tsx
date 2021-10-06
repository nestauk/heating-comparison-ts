import logo from './logo.svg';
import './App.css';
import { calculateEquivalents } from './calculator';

function App() {
  const usage = 100;
  const data = calculateEquivalents(usage);
  console.log(`Data ${data}`);
  return (
    <div className="App">
      {data.equivalents.map(stat => {
        return (
          <div key={stat.name} >
            <p>
            {stat.name}
            {stat.desc}
            {stat.value}
            </p>
          </div>);
        })}
    </div>
  );
}

export default App;





import './App.css';
import AddTransaction from './components/AddTransaction';
import AppState from './context/AppState';

function App(props) {
  return (
    <AppState>
      <AddTransaction />
    </AppState>

  );
};

export default App;

import ToggleColorMode from './components/ToggleColorMode';
import Views from './components/Views';
import UserContext from './components/AccountContext';

function App() { 
  return (
    <div>
      <UserContext>
        <Views />
        <ToggleColorMode />
      </UserContext>
    </div>
  );
}

export default App;

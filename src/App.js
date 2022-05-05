import './App.css';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { Menu } from './components/Menu';
import { List } from './components/List';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <div>
      <Header>
        <Search/>      
      </Header>
      </div>
     
<Menu/>
<List/>
      <Footer/>
    </div>
  );
}

export default App;

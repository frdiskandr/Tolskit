import './App.css';
import axios from 'axios';
import Nav from './components/navbar/navbar.jsx';

function App() {
 
  const DatasApi = async () => {
    try{
      let response = await axios.get('https://catfact.ninja/fact')
      console.log(response.data);
    }catch(error){console.log(error)}
  };

  DatasApi()

  return (
    <>
    <main>
     <div className='title'><h3>Azure Tools</h3></div>
    </main>
    <div className="navbar">
   <Nav/>
    </div>
    </>
  )
}

export default App

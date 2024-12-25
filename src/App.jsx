import './App.css';
import axios from 'axios';
import NavBar from './components/navbar/navbar.jsx';

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
   <NavBar></NavBar>
   <div className='coba'>hello world!</div>
    </>
  )
}

export default App

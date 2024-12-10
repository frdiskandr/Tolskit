import './App.css'
import axios from 'axios'

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
    <nav className='navbar'>
     <ul className='element-nav'>
      <li><a href="#home">Home</a></li>
      <li>Tools</li>
      <li>About</li>
     </ul>
      </nav>
    </>
  )
}

export default App

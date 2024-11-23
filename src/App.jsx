import './App.css'
import File from './components/File'
import { useSelector } from 'react-redux'



function App() {

  const data=useSelector((store)=>store.directory.value.directoryStructure);

  return (
    <>
      <File file={data}></File>
    </>
  )
}

export default App

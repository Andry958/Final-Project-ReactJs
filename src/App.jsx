import './App.css'
import Layout from './Componens/Layout'
import NewsList from './Componens/newsList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Componens/Home'
import NoPage from './Componens/NoPage'
import { useContext } from 'react'
import { AllNewsContext } from './Componens/context/AllContext'
import { useEffect } from 'react'
import AddProduct from './Componens/AddProduct'
import EditNews from './Componens/EditNews'

const apiNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f596c55597b748049467bb00fd96ecae"

function App() {
  const { value, setValue } = useContext(AllNewsContext);

  useEffect(() => {
      fetchNews()
  }, []);

  
  async function fetchNews() {
      const res = await fetch(apiNews);
      const data = await res.json();
      console.log(data);
      setValue(data.articles)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='newslist' element={<NewsList></NewsList>}/>
          <Route index element={<Home />} />
          <Route path='create' element={<AddProduct/>}/>
          <Route path='edit' element = {<EditNews/>}></Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
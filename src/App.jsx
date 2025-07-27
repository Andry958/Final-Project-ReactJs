import './App.css';
import Layout from './Componens/Main/Layout';
import NewsList from './Componens/Items/newsList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Componens/Main/Home';
import NoPage from './Componens/Main/NoPage';
import { useContext, useEffect } from 'react';
import { AllNewsContext } from './Componens/context/AllContext';
import AddProduct from './Componens/Main/AddProduct';
import EditNews from './Componens/Main/EditNews';
import { SourcesContext } from './Componens/context/SourcesContext';
import NewsByAuthor from './Componens/Items/NewsByAthor';
import Register from './Componens/First/Register';
import Login from './Componens/First/Login';
import Profile from './Componens/Main/Profile';



const apiNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f596c55597b748049467bb00fd96ecae"
const api = "https://localhost:5173/api/"
function App() {
  const { value, setValue } = useContext(AllNewsContext);
  const { setSources } = useContext(SourcesContext);
  useEffect(() => {
      fetchNews()
      
  }, []);

  
  async function fetchNews() {
    


      const res = await fetch(apiNews);
      const data = await res.json();
      console.log(data);
      setValue(data.articles)
      //--
      const uniqueSources = [];
      data.articles.forEach(news => {
        if (news.source?.name && !uniqueSources.includes(news.source.name)) {
          uniqueSources.push(news.source.name);
        }
      });
      setSources(uniqueSources);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='newslist' element={<NewsList></NewsList>}/>
          <Route path='home' element={<Home />} />
          <Route path='create' element={<AddProduct/>}/>
          <Route path='edit' element = {<EditNews/>}></Route>
          <Route path='newsbyauthor' element={<NewsByAuthor />} />
          <Route index element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="pr" element={<Profile/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
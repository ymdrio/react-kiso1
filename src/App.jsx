import { useState , useEffect } from 'react'
import './App.css'
import { Link, Route, Routes } from "react-router-dom";
import NewCreate from './components/NewCreate';
import NotFound from "./components/NotFound";


function App() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);


  //スレッドの一覧を取得する関数
  const fetchThreads = () => {
      fetch('https://railway.bulletinboard.techtrain.dev/threads?offset=0')
        .then(response => response.json())
        .then(data => {
          setThreads(data); // APIから取得したデータをセット（スレッド一覧）
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error", error);
          setLoading(false);
        });
    }

   useEffect (() => {
    fetchThreads();
   }, []);

   if (loading) {
    return <p>Loading...</p>;
   }

  return (
    <>
    <nav>
      <Link to="/">Home</Link> |  
      <Link to="/threads/new"> 新規作成</Link>
    </nav>

    <Routes>
        <Route path="/" element={
          <div>
            <p className='title'>掲示板</p>
            <ul>
              {threads.map((thread) => (
                <li key={thread.title}>{thread.title}</li>
              ))}
            </ul>
          </div>
        } />
        <Route path="/threads/new" element={<NewCreate fetchThreads={fetchThreads} />} />
        <Route path="/*" element={<NotFound />} />
    </Routes>
    </>
  );
};
export default App;
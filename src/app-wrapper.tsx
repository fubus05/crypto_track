import { memo } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard.page';
// import News from './pages/news/news.page';
// import WatchlistPage from './pages/watchlist/watchlist.page';
import DrawerComponent from './drawer/drawer.component';

export const AppWrapper = memo(() => {
  return(
    <Router>
      <DrawerComponent/>
      <Routes>
          <Route path='/' element={<Dashboard/>}/>
          {/* <Route path='/news' element={<News/>}/> */}
          {/* <Route path='/watchlist' element={<WatchlistPage/>}/> */}
      </Routes>
    </Router>
  )
})
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProjectHomePage from './components/ProjectHomePage.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import HomePage from './components/HomePage.jsx'
import Contact from './components/Contact.jsx'
import Cartoons from './components/Cartoons.jsx'
import ExploreCollections from './components/ExploreCollections.jsx'
import Sculpture from './components/Sculpture.jsx'
import Photography from './components/Photography.jsx'
import BuyingPage from './components/BuyingPage.jsx'
import PurchaseSuccess from './components/Sucess.jsx'
import SellingPage from './components/SellingPage.jsx'
import ListForSale from './components/ListForSale.jsx'
import AbstractPieces from './components/AbstractPieces.jsx'
import ClassNTrad from './components/ClassNTrad.jsx'
import ContrastDiversity from './components/ContrastDiversity.jsx'








createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/ecommerce">
    <Routes>
      <Route path='/'element={<ProjectHomePage/>}></Route>
      <Route path='/homepage' element={<HomePage />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/cartoons' element={<Cartoons />}></Route>
      <Route path='/ex' element={<ExploreCollections />}></Route>
      <Route path='/sc' element={<Sculpture />}></Route>
      <Route path='/pg' element={<Photography />}></Route>
      <Route path='/bp' element={<BuyingPage />}></Route>
      <Route path='/s' element={<PurchaseSuccess />}></Route>
      <Route path='/sel' element={<SellingPage />}></Route>
      <Route path='/lfs' element={<ListForSale />}></Route>
      <Route path='/ap' element={<AbstractPieces />}></Route>
      <Route path='/cn' element={<ClassNTrad />}></Route>
      <Route path='/cd' element={<ContrastDiversity />}></Route>
      
      
      
      
      
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)

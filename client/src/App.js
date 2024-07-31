// client/src/App.js 

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import Create from "./pages/Create"
import View from "./pages/View"
import Landing from './pages/Landing'
import { useContext } from "react"; 
import { AuthContext } from "./authContext"; 
import Update from './pages/Update'
function App() { 

const { user } = useContext(AuthContext); 

const ProtectedRoute = ({ children }) => { 
	if (!user) { 
	return <Landing/>; 
	} else { 
	return children; 
	} 
}; 

return ( 
	<BrowserRouter> 
	<Routes> 
		<Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> 
		<Route path="/login" element={<Login/>} /> 
		<Route path="/register" element={<Register/>} /> 
		<Route path="/create" element={<ProtectedRoute><Create/></ProtectedRoute>} /> 
		<Route path="/view/:id" element={<ProtectedRoute><View/></ProtectedRoute>} /> 
		<Route path="/update/:id" element={<ProtectedRoute><Update/></ProtectedRoute>} /> 
	</Routes> 
	</BrowserRouter> 
); 
} 

export default App; 

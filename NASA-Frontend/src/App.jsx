import Landing from './pages/Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import RocketGame from './pages/RocketGame'
import QuizBot from './pages/QuizBot'
import PrivateRoute from './components/other/PrivateRoute'

function App() {
    return (
        <Router>
            
            <Routes>
                <Route path="/" exact element={<Landing />} />
                <Route element={<PrivateRoute />}>   
                    <Route path="/game" exact element={<RocketGame/>} />
                    <Route path="/quiz" exact element={<QuizBot />} />
                </Route>
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    )
}

export default App;
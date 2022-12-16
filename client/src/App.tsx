import CssBaseLine from '@mui/material/CssBaseline'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import AppLayout from './components/layout/AppLayout'
import AuthLayout from './components/layout/AuthLayout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Board from './pages/Board'

function App() {
    const theme = createTheme({
        palette: {mode: 'dark'}
    })
    return (
        <ThemeProvider theme={theme}>
            <CssBaseLine/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<AuthLayout/>}>
                        <Route path='login' element={<Login/>}/>
                        <Route path='signup' element={<Signup/>}/>
                    </Route>
                    <Route path='/' element={<AppLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path='boards' element={<Home/>}/>
                        <Route path='boards/:boardId' element={<Board/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App

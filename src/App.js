import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './home/home';
import Login from './home/login/login';
import Register from "./home/register/register";
import Dashboard from "./dashboard/dashboard";
import { useEffect, useState } from 'react';
import {AuthProvider, useAuth} from './home/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';


function App() {

    return (
    <div className="App">
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Navigate replace to="/home"/>}/>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />}/>
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </div>
    );
}

export default App;
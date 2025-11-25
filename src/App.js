import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import Home from './home/home';
import Login from './home/login/login';
import Register from "./home/register/register";
import Dashboard from "./dashboard/dashboard";
import React, { useEffect, useState } from 'react';
import {AuthProvider, useAuth} from './home/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useNavigate } from "react-router-dom";
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import DrugsTab from "./dashboard/drugs_tab/DrugsTab";
import PatientsTab from "./dashboard/patients_tab/PatientsTab";
import SelectedPatientTab from "./dashboard/drugs_tab/selected_patient_tab/SelectedPatientTab";




function App() {
   const [selectedPatient, setSelectedPatient] = useState(null);

    return (
    <div className="App">
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Navigate replace to="/home"/>}/>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />}/>


                    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
                        <Route index element={<Dashboard />}/>
                        <Route path="drugs" element={<DrugsTab setSelectedPatient={setSelectedPatient} selectedPatient={selectedPatient}/>}/>
                        <Route path="drugs/patient/:id" element={<SelectedPatientTab selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} />}/>
                        <Route path="patients" element={<PatientsTab/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </div>
    );
}

function DashboardLayout() {
  return (
    <div className="main-container">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
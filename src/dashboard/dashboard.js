import React from "react";
import { useNavigate } from "react-router-dom";
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handlePatientsNavigation = () => {
        navigate("/dashboard/patients");
    };

    const handleDrugsNavigation = () => {
        navigate("/dashboard/drugs");
    };

    const handleFloorNavigation = (floorNumber) => {
        navigate(`/dashboard/patients?floor=${floorNumber}`);
    };

    return (
        <div className="dashboard-content-background">
            <div className="dashboard-cards-container">
                {/* Danışan Yönetimi Card */}
                <div className="dashboard-card">
                    <h2 className="dashboard-card-title">Danışan Yönetimi</h2>
                    <div className="dashboard-card-actions">
                        <button 
                            className="dashboard-card-primary-button"
                            onClick={handlePatientsNavigation}
                        >
                            DANIŞAN YÖNETİMİ
                        </button>
                    </div>
                    <div className="dashboard-card-floors">
                        <button 
                            className="dashboard-floor-button"
                            onClick={() => handleFloorNavigation(1)}
                        >
                            Kat 1
                        </button>
                        <button 
                            className="dashboard-floor-button"
                            onClick={() => handleFloorNavigation(2)}
                        >
                            Kat 2
                        </button>
                        <button 
                            className="dashboard-floor-button"
                            onClick={() => handleFloorNavigation(3)}
                        >
                            Kat 3
                        </button>
                        <button 
                            className="dashboard-floor-button"
                            onClick={() => handleFloorNavigation(4)}
                        >
                            Kat 4
                        </button>
                    </div>
                </div>

                {/* Sağlık Yönetimi Card */}
                <div className="dashboard-card">
                    <h2 className="dashboard-card-title">Sağlık Yönetimi</h2>
                    <div className="dashboard-card-actions">
                        <button 
                            className="dashboard-card-primary-button"
                            onClick={handleDrugsNavigation}
                        >
                            İLAÇ YÖNETİMİ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
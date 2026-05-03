import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import Welcome from './pages/Welcome';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

type Page = 'welcome' | 'signin' | 'signup' | 'dashboard';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('welcome');

    // Check if admin is already logged in
    const isAdminLoggedIn = localStorage.getItem('adminToken') === 'admin_authenticated';

    const handleGetStarted = () => {
        setCurrentPage('signin');
    };

    const handleBack = () => {
        setCurrentPage('welcome');
    };

    const handleSignIn = () => {
        setCurrentPage('signin');
    };

    const handleCreateAccount = () => {
        setCurrentPage('signup');
    };

    const handleForgotPassword = () => {
        const email = prompt('Enter your email address to reset password:');
        if (email) {
            setTimeout(() => {
                alert(`✅ Password reset link has been sent to ${email}. Please check your inbox.`);
            }, 500);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('userRole');
        setCurrentPage('welcome');
    };

    // If admin is already logged in, show dashboard
    if (isAdminLoggedIn && currentPage !== 'welcome') {
        return (
            <div className="dashboard-page">
                <div className="dashboard-container">
                    <Coffee size={48} className="dashboard-icon" />
                    <h1 className="dashboard-title">Welcome to Admin Dashboard</h1>
                    <p className="dashboard-text">You are successfully logged in as administrator.</p>
                    <div className="dashboard-info">
                        <div className="dashboard-card">
                            <h3>📊 Orders</h3>
                            <p>Manage customer orders</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>☕ Menu</h3>
                            <p>Update coffee menu</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>📈 Analytics</h3>
                            <p>View sales reports</p>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    // Page Routing
    switch (currentPage) {
        case 'welcome':
            return <Welcome onGetStarted={handleGetStarted} />;

        case 'signin':
            return (
                <SignIn
                    onBack={handleBack}
                    onForgotPassword={handleForgotPassword}
                    onCreateAccount={handleCreateAccount}
                />
            );

        case 'signup':
            return (
                <SignUp
                    onBack={handleBack}
                    onSignIn={handleSignIn}
                />
            );

        default:
            return <Welcome onGetStarted={handleGetStarted} />;
    }
};

export default App;
import React, { useState, type FormEvent } from 'react';
import { Coffee, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

interface SignUpProps {
    onBack: () => void;
    onSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onBack, onSignIn }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (successMessage) setSuccessMessage('');
    };

    const validateForm = (): boolean => {
        const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        setTimeout(() => {
            // Since admin registration is restricted, show message and redirect to sign in
            setSuccessMessage('Admin accounts are restricted. Please contact system administrator.');
            setIsLoading(false);

            // Auto redirect to sign in after 2 seconds
            setTimeout(() => {
                onSignIn();
            }, 2000);
        }, 1000);
    };

    return (
        <div className="login-container">
            {/* LEFT SIDE - IMAGE */}
            <div className="login-left">
                <img src="https://images.deliveryhero.io/image/fd-ph/LH/f4mt-listing.jpg" alt="Smart Cafe" className="login-left-image" />
                <div className="login-left-overlay">
                    <Coffee size={32} className="login-left-icon" />
                    <h2 className="login-left-brand">Smart Cafe</h2>
                </div>
            </div>

            {/* RIGHT SIDE - SIGN UP FORM */}
            <div className="login-right">
                <div className="login-form-wrapper">
                    {/* Back Button */}
                    <button className="back-button" onClick={onBack}>
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>

                    {/* Header */}
                    <div className="login-header">
                        <div className="login-header-icon">
                            <Coffee size={28} />
                        </div>
                        <h2 className="login-title">Create Account</h2>
                        <p className="login-subtitle">Sign up for an admin account.</p>
                    </div>

                    {/* Admin Notice */}
                    <div className="admin-restricted-notice">
                        <AlertCircle size={18} />
                        <span>Admin registration is restricted. Only system administrators can create accounts.</span>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="success-alert">
                            <AlertCircle size={18} />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="login-form">
                        {/* Email */}
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.email && (
                                <p className="field-error"><AlertCircle size={13} /> {errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="toggle-password"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="field-error"><AlertCircle size={13} /> {errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="toggle-password"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="field-error"><AlertCircle size={13} /> {errors.confirmPassword}</p>
                            )}
                        </div>
                        {/* Submit Button */}
                        <button type="submit" disabled={isLoading} className="submit-btn">
                            {isLoading ? (
                                <span className="loading-text">
                                    <svg className="spinner" viewBox="0 0 24 24">
                                        <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating account...
                                </span>
                            ) : (
                                <span className="btn-content">Sign Up</span>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="form-divider">
                        <span className="divider-line"></span>
                        <span className="divider-text">or</span>
                        <span className="divider-line"></span>
                    </div>

                    {/* Sign In Link */}
                    <div className="switch-page-box">
                        <span className="switch-page-text">Already have an account?</span>
                        <button className="switch-page-btn" onClick={onSignIn}>
                            Sign In
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="login-footer">© 2024 Smart Cafe. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
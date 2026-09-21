import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/css/components_css/InfoPages.css";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import Seo from "../components/Seo";

export default function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (password.length < 4) {
            setError("Password must be at least 4 characters.");
            return;
        }

        setLoading(true);
        const result = await signup({ name, email, password });
        setLoading(false);

        if (!result.success) {
            setError(result.message);
            return;
        }

        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
    }

    return (
        <div className="info-page">
            <Seo
                title="Sign Up | printStore"
                description="Create a free printStore account to track your orders and check out faster."
                canonicalPath="/signup"
            />
            <div className="page-hero">
                <div className="container">
                    <h1>Sign Up</h1>
                    <p>Create a free account to track orders and check out faster.</p>
                </div>
            </div>

            <div className="container">
                <div className="auth-card">
                    <div className="auth-icon"><FaUserCircle /></div>
                    <h3>Create Your Account</h3>

                    {error && <div className="auth-error">{error}</div>}

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="auth-switch-text">
                        Already have an account? <Link to="/login">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/css/components_css/InfoPages.css";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import Seo from "../components/Seo";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await login({ email, password });
        setLoading(false);

        if (!result.success) {
            setError(result.message);
            return;
        }

        // send the user back to where they came from (e.g. Cart) or Home
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
    }

    return (
        <div className="info-page">
            <Seo
                title="Log In | printStore"
                description="Log in to your printStore account to check orders and manage your details."
                canonicalPath="/login"
            />
            <div className="page-hero">
                <div className="container">
                    <h1>Log In</h1>
                    <p>Good to see you again — log in to your account below.</p>
                </div>
            </div>

            <div className="container">
                <div className="auth-card">
                    <div className="auth-icon"><FaUserCircle /></div>
                    <h3>Log In</h3>

                    {error && <div className="auth-error">{error}</div>}

                    <form className="contact-form" onSubmit={handleSubmit}>
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
                            {loading ? "Logging in..." : "Log In"}
                        </button>
                    </form>

                    <p className="auth-switch-text">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

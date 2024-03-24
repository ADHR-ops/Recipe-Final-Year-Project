import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    'https://oqjtlersgczldlzrnljt.supabase.co',
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xanRsZXJzZ2N6bGRsenJubGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyODQ5NDEsImV4cCI6MjAxNTg2MDk0MX0.00gHU49iZDnKdi8f0cJx9MDaKIbDe6NzPFDZ0mirzc8"
);

export default function ResetPasswordPage() {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // Get the access token and refresh token from the URL
        if (typeof window !== "undefined") {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            setAccessToken(hashParams.get("access_token") || "");
            setRefreshToken(hashParams.get("refresh_token") || "");
        }
    }, []);

    useEffect(() => {
        // Authenticate the user using the access token and refresh token
        const getSessionWithTokens = async () => {
            if (accessToken && refreshToken) {
                const { data, error } = await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                });

                if (error) {
                    alert(`Error signing in: ${error.message}`);
                }
            }
        };

        // Call this function only when accessToken and refreshToken are available.
        if (accessToken && refreshToken) {
            getSessionWithTokens();
        }
    }, [accessToken, refreshToken]);

    const handlePasswordUpdate = async (newPassword) => {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) {
                throw error;
            }

            if (data) {
                alert("Password has been updated successfully!");
            }
        } catch (error) {
            alert(`Error updating password: ${error.message}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePasswordUpdate(password);
    };

    return (
        <>
            <input value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>update</button>
        </>
    );
}
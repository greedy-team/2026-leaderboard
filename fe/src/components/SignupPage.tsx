import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "./api/api";

type UserResponse = {
    userId: string;
    nickname: string;
    phone: string;
};

export const SignupPage: React.FC = () => {
    const [phone, setPhone] = useState("");
    const [nickname, setNickname] = useState("");
    const [isNewUser, setIsNewUser] = useState(false);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");

    const saveUserToLocalStorage = (user: UserResponse) => {
        localStorage.setItem("userId", user.userId);
        localStorage.setItem("nickname", user.nickname);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
        setPhone(onlyNumbers);
    };

    const handleCheckPhone = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!/^\d{8}$/.test(phone)) {
            setMessage("전화번호는 숫자 8자리로 입력해주세요.");
            return;
        }

        try {
            const response = await axios.get<UserResponse>(
                `${apiURL}/users/phone?phone=${phone}`
            );

            saveUserToLocalStorage(response.data);
            setUserId(response.data.userId);
            setMessage("기존 유저입니다.");
        } catch (error) {
            setIsNewUser(true);
            setMessage("신규 유저입니다. 닉네임을 입력해주세요.");
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nickname.trim()) {
            setMessage("닉네임을 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post<UserResponse>(`${apiURL}/users`, {
                nickname: nickname.trim(),
                phone,
            });

            saveUserToLocalStorage(response.data);
            setUserId(response.data.userId);
            setMessage("회원가입이 완료되었습니다.");
        } catch (error: any) {
            const data = error.response?.data;
            const msg = data?.message ?? "오류가 발생했습니다.";
            setMessage(msg);
        }
    };

    const pageStyle: React.CSSProperties = {
        minHeight: "100vh",
        backgroundColor: "#030308",
        color: "#ffffff",
        padding: "32px 28px",
        fontFamily: "sans-serif",
    };

    const containerStyle: React.CSSProperties = {
        maxWidth: 420,
    };

    const titleStyle: React.CSSProperties = {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 14,
        color: "#ffffff",
    };

    const labelStyle: React.CSSProperties = {
        display: "block",
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 8,
        color: "#ffffff",
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        height: 48,
        padding: "0 12px",
        boxSizing: "border-box",
        border: "1px solid #ffffff",
        borderRadius: 4,
        backgroundColor: "#ffffff",
        color: "#111111",
        fontSize: 18,
        fontWeight: 600,
        outline: "none",
    };

    const disabledInputStyle: React.CSSProperties = {
        ...inputStyle,
        backgroundColor: "#555555",
        color: "#ffffff",
        border: "1px solid #555555",
    };

    const buttonStyle: React.CSSProperties = {
        width: "100%",
        padding: "14px 0",
        marginTop: 24,
        border: "none",
        backgroundColor: "transparent",
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 700,
        cursor: "pointer",
    };

    const messageStyle: React.CSSProperties = {
        marginTop: 28,
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    };

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <h1 style={titleStyle}>운영진 회원가입</h1>

                {!isNewUser ? (
                    <form onSubmit={handleCheckPhone}>
                        <div>
                            <label style={labelStyle}>전화번호 뒷 8자리</label>
                            <input
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="12345678"
                                maxLength={8}
                                style={inputStyle}
                                required
                            />
                        </div>

                        <button type="submit" style={buttonStyle}>
                            확인
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleCreateUser}>
                        <div style={{ marginBottom: 18 }}>
                            <label style={labelStyle}>전화번호 뒷 8자리</label>
                            <input value={phone} disabled style={disabledInputStyle} />
                        </div>

                        <div>
                            <label style={labelStyle}>닉네임</label>
                            <input
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="닉네임"
                                style={inputStyle}
                                required
                            />
                        </div>

                        <button type="submit" style={buttonStyle}>
                            회원가입
                        </button>
                    </form>
                )}

                {message && <p style={messageStyle}>{message}</p>}

                {userId && (
                    <div style={{ marginTop: 24 }}>
                        <p style={{ ...labelStyle, marginBottom: 8 }}>아이디</p>
                        <p style={{
                            fontSize: 32,
                            fontWeight: 700,
                            color: "#ffffff",
                            letterSpacing: 4,
                        }}>{userId}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

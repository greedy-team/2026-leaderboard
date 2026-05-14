import React, { useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import { apiURL } from "./api/api";

type UserResponse = {
    userId: string;
    nickname: string;
    phone: string;
};

type ErrorResponse = {
    message?: string;
};

const toAxiosError = (error: unknown) => error as AxiosError<ErrorResponse>;

export const SignupPage: React.FC = () => {
    const [phone, setPhone] = useState("");
    const [nickname, setNickname] = useState("");
    const [isNewUser, setIsNewUser] = useState(false);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [displayNickname, setDisplayNickname] = useState("");

    const resetSignupForm = () => {
        setPhone("");
        setNickname("");
        setIsNewUser(false);
        setMessage("");
    };

    const saveUserToLocalStorage = (user: UserResponse) => {
        localStorage.setItem("userId", user.userId);
        localStorage.setItem("nickname", user.nickname);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
        setPhone(onlyNumbers);
        setUserId("");
        setDisplayNickname("");
        setMessage("");
        setIsNewUser(false);
    };

    const handleCheckPhone = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!/^\d{8}$/.test(phone)) {
            setMessage("전화번호는 숫자 8자리로 입력해주세요.");
            return;
        }

        try {
            const response = await axios.get<UserResponse>(
                `${apiURL}/users/phone?phone=${encodeURIComponent(phone)}`
            );

            saveUserToLocalStorage(response.data);
            setUserId(response.data.userId);
            setDisplayNickname(response.data.nickname);
            setMessage("기존 유저입니다.");

            setTimeout(() => {
                resetSignupForm();
            }, 1000);
        } catch (error: unknown) {
            const axiosError = toAxiosError(error);
            const status = axiosError.response?.status;
            const data = axiosError.response?.data;
            const msg = data?.message ?? "";

            if (
                status === 404 ||
                msg.includes("등록된 유저가 없습니다") ||
                msg.includes("해당 전화번호")
            ) {
                setIsNewUser(true);
                setMessage("신규 유저입니다. 닉네임을 입력해주세요.");
                return;
            }

            if (!axiosError.response) {
                setMessage(
                    "백엔드 서버에서 응답이 없습니다. API 주소 또는 CORS 설정을 확인해주세요."
                );
                return;
            }

            setMessage(msg || "전화번호 확인 중 오류가 발생했습니다.");
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
            setDisplayNickname(response.data.nickname);
            setMessage("회원가입이 완료되었습니다.");

            setTimeout(() => {
                resetSignupForm();
            }, 1000);
        } catch (error: unknown) {
            const axiosError = toAxiosError(error);

            if (!axiosError.response) {
                setMessage(
                    "회원가입에 실패했습니다. 백엔드 서버에서 응답이 없습니다. API 주소 또는 CORS 설정을 확인해주세요."
                );
                return;
            }

            const data = axiosError.response?.data;
            const msg = data?.message ?? "오류가 발생했습니다.";
            setMessage(msg);
        }
    };

    return (
        <div className="signup-screen">
            <div className="signup-panel">
                <h1 className="signup-title">회원가입</h1>
                <p className="signup-description">전화번호 뒷자리로 참가자를 확인합니다.</p>

                {!isNewUser ? (
                    <form className="signup-form" onSubmit={handleCheckPhone}>
                        <div className="signup-field">
                            <label className="signup-label">전화번호 뒷 8자리</label>
                            <input
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="12345678"
                                maxLength={8}
                                className="signup-input"
                                required
                            />
                        </div>

                        <button type="submit" className="signup-button">
                            확인
                        </button>
                    </form>
                ) : (
                    <form className="signup-form" onSubmit={handleCreateUser}>
                        <div className="signup-field">
                            <label className="signup-label">전화번호 뒷 8자리</label>
                            <input
                                value={phone}
                                disabled
                                className="signup-input signup-input-disabled"
                            />
                        </div>

                        <div className="signup-field">
                            <label className="signup-label">닉네임</label>
                            <input
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="닉네임"
                                className="signup-input"
                                required
                            />
                        </div>

                        <button type="submit" className="signup-button">
                            회원가입
                        </button>
                    </form>
                )}

                {message && <p className="signup-message">{message}</p>}

                {userId && (
                    <div className="signup-result">
                        <div className="signup-result-group">
                            <p className="signup-label">닉네임</p>
                            <p className="signup-result-name">{displayNickname}</p>
                        </div>

                        <div>
                            <p className="signup-label">아이디</p>
                            <p className="signup-result-id">{userId}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

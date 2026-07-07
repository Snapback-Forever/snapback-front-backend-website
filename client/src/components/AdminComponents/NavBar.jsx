import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authreducer';

const NavBar = ({ setChangeContent, menuOpen, setMenuOpen }) => {

    const dispatch = useDispatch();

    const menuItems = [
        { label: "📨 Messages", page: "msg" },
        { label: "📨 Admin To Admin", page: "msgAdmin" },
        { label: "👤 Admin Accounts", page: "accounts" },
        { label: "📋 Audit Reports", page: "audit" },
        { label: "❓ Questions / Answers", page: "QA" },
        { label: "🌐 Add Website", page: "newWebsite" },
        { label: "➕ Add A User", page: "newUser" },
        { label: "✉️ Send Msg To Admin", page: "newAdminMsg" },
        { label: "😂 Create Meme", page: "newMeme" },
        { label: "🖼️ All Memes", page: "allMeme" }
    ];

    return (
        <div className="navbar">

            <div className="navbar-header">

                <div
                    style={{
                        marginLeft: "1rem",
                        fontSize: "2rem",
                        fontVariant: "all-petite-caps",
                        fontWeight: "bold"
                    }}
                >
                    Admin Panel
                </div>

                <button
                    className="menu-toggle rounded"
                    onClick={() => setMenuOpen(prev => !prev)}
                >

                    {menuOpen ?

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
                            />
                        </svg>

                        :

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"
                            />
                        </svg>

                    }

                </button>

            </div>

            <div className={`buttons-container ${menuOpen ? "open" : ""}`}>

                {menuItems.map((item) => (

                    <button
                        key={item.page}
                        className="navbar-button rounded"
                        onClick={() => {
                            setChangeContent(item.page);
                            setMenuOpen(false);
                        }}
                    >
                        {item.label}
                    </button>

                ))}

                <button
                    className="navbar-button rounded logout-button"
                    onClick={() => dispatch(logout())}
                >
                    🚪 Logout
                </button>

            </div>

        </div>
    );
};

export default NavBar;
import { logout } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <h1 className="navbar-title">
          Kanban <span className="highlight">App</span>
        </h1>
        <button onClick={handleLogout} className="logout-btn" aria-label="Logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="logout-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </nav>

      <style>{`
        .navbar {
          background: linear-gradient(90deg, #4f46e5, #9333ea, #ec4899);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          user-select: none;
        }

        .navbar-title {
          color: white;
          font-weight: 800;
          font-size: 1.75rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          letter-spacing: 1.2px;
        }

        .highlight {
          color: #facc15; /* bright yellow */
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.15);
          border: none;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px; /* pill shape */
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(255,255,255,0.35);
          box-shadow: 0 6px 16px rgba(255, 255, 255, 0.4);
        }

        .logout-icon {
          width: 20px;
          height: 20px;
          stroke: white;
          stroke-width: 2.5;
        }

        .logout-btn:focus {
          outline: 2px solid #facc15;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}

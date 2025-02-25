import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

function Navigation() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <div>
          <div>
            <Link to={isAuth ? "/dashboard" : "/"}>
              <span>Your Company</span>
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt=""
              />
            </Link>
            {!isAuth && (
              <div>
                {navigation.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {isAuth ? (
            <div>
              <Link
                to="/notes/new"
              >
                New
              </Link>
              <Link
                to="/profile"
              >
                Profile
              </Link>
              <Link
                to="#"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
              >
                Sign in
              </Link>
              <Link
                to="/register"
              >
                Register
              </Link>
            </div>
          )}
        </div>
        <div>
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
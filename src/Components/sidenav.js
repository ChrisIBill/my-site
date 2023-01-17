import { navData } from "../lib/pagesData";
import "./sidenav.css";

export default function Sidenav() {
    return (
        <div>
            <button className="menuButton"></button>
            {navData.map((item) => {
                return (
                    <div key={item.id} className="sideitem">
                        {/* {item.icon} */}
                        <span className="linkText">{item.text}</span>
                    </div>
                );
            })}
        </div>
    );
}

function UsersIndexPage({ users }) {
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={user.id}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
    8008;
}

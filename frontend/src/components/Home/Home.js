import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/welcomepage');
    }

    return (
        <section>
            <button onClick={logout}>Wyloguj sie</button>
        </section>
    )
}

export default Home
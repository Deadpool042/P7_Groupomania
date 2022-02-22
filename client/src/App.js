import Routes from "./components/Routes/index";
import { useState, useEffect } from "react";
import { UidContext } from "./components/AppContext";
//Le hook useContext va stoker des variables qui pourra
//etre appelé dans n'importe quel component comme le userId afin de garder la connexion
//sans passer par le serveur pour vérifier la connexion
//Cette variable est uid
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

//useEffect va controler le token d'utilisateur

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <div className="App">
        <Routes />
      </div>
    </UidContext.Provider>
  );
}

export default App;

import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const AccountContext = createContext(); //

// Function to keep track of whether logged in or not
const UserContext = ({children}) => {
    const [user, setUser] = useState({ loggedIn: null }); // loggedIn is null by default
    const navigate = useNavigate();

    // Function below runs when component mounts which will be when the page is refreshed
    useEffect(() => {
        fetch("http://localhost:4000/auth/login", { // fetch the login route
            credentials: "include", // include cookies
            }).catch(err => {
                setUser({ loggedIn: false }); // if error, set loggedIn to false
                return;
            }).then(res => {
                if (!res || !res.ok || res.status >= 400) {
                    setUser({ loggedIn: false }); 
                    return;
                }
                return res.json(); // if non of the above, return the response as JSON
            }).then(data => { // data is the response from the server
                if (!data) { // if there is no data, set loggedIn to false
                    setUser({ loggedIn: false });
                    return;
                }
                // if there is data returned by auth/login, setUser to data and navigate to home
                navigate('/home'); 
                setUser({...data});
                })
    }, []);

    return <AccountContext.Provider value={{user, setUser}}>
        {children}
    </AccountContext.Provider>
}

export default UserContext;


import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";



const userContext = createContext();


const authContext = ({ children }) => {
  const [user, setUser] = useState(null);
 const [loading,setLoading]= useState(true)

useEffect(()=>{


        const verifyUser=async () =>{
            const token=localStorage.getItem('token')
            try{
                if(token){
                const response= await axios.get('http://localhost:5000/api/auth/verify',{
                    headers:{
                        "Authorization":`Bearer${login}`
                    }
                })
                if(response.data.success){
                    setUser(response.data.user)
                }
            }else{
                setUser(null)
            }

            }catch(error){

                if(error.response && error.response.data.error){
                    setUser(null)

                }

            }finally{
                setLoading(false)
            }
        }
      verifyUser()


},[])









  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout ,loading}}>
      {children}
    </userContext.Provider>
  );
};

// ✅ Hook to use context
export const useAuth = () => useContext(userContext);

// ✅ Export your provider component
export default authContext;

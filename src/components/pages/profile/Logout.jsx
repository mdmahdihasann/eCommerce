import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

const Logout = ({activeTab}) => {
  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const logOut = () =>{
    setAuth({})
    navigate('/')
  }
  return (
    <>
        {activeTab === "logout" && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Logout
              </h2>
              <p className="text-gray-600 mb-4">
                Click the button below to logout from your account.
              </p>
              <button onClick={logOut} className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                Logout
              </button>
            </div>
          )}
    </>
  )
}

export default Logout
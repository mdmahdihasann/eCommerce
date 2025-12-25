import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const Users = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const featchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/auth/all-user`,
          {
            headers: {
              Authorization: `Bearer ${auth.authToken}`,
            },
          }
        );
        setUser(response.data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    featchUser();
  }, []);
  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <aside className="w-[100%] flex justify-between items-center px-6 min-h-[73px] bg-white border-l border-b">
        <h2 className="text-2xl font-semibold text-gray-800">All User</h2>
      </aside>
      <div className="m-6 rounded-lg bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600">ID</th>
              <th className="px-6 py-3 text-center text-gray-600">Name </th>
              <th className="px-6 py-3 text-center text-gray-600">Email </th>
              <th className="px-6 py-3 text-center text-gray-600">Role </th>
              <th className="px-6 py-3 text-center text-gray-600">Joined</th>
              <th className="px-6 py-3 text-center text-gray-600">Status</th>
              <th className="px-6 py-3 text-center text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {user?.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
            {user?.map((u, index) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">{index}</td>
                <td className="px-6 py-3 text-center">
                  {u.firstName} {u.lastName}
                </td>
                <td className="px-6 py-3 text-center">{u.email}</td>
                <td className="px-6 py-3 text-center">{u.role}</td>
                <td className="px-6 py-3 text-center">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-3 text-center">Active</td>
                <td className="px-6 py-3 text-center">View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

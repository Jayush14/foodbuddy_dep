const fetchProtectedData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getUserDetails", {
        method: "GET",
        credentials: "include", 
      });
  
      const data = await response.json(); 
      console.log("Data: ", data);
  
      if (response.ok && data.success) {
        return data;
      } else {
        console.error("Failed to fetch user details:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
};
export default async function getUserData() {
    return await  fetchProtectedData(); 
}
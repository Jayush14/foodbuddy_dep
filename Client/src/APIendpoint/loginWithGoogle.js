import getUserData from './getUserData';

const withGoogle = async (res) => {
    try {
      const response = await fetch("http://localhost:5000/api/continueWithGoogle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ 
          token: res.credential,
        }),
      });
      const data = await response.json();
      if (data.success) {
         return await getUserData();
      }
      return null;
    } catch (err) {
      return err
    }
}
export default async function loginWithGoogle(res) {
    return await  withGoogle(res); 
}
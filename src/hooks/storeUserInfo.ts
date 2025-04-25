export const storeUserData = async () => {
    try {
      const idToken = sessionStorage.getItem("firebaseIdToken");
      if (!idToken) {
        console.warn("No ID token found in sessionStorage.");
        return;
      }
  
      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch GitHub data");
      }
  
      const data = await response.json();
      const user = data.user;
  
      // Store full user data in localStorage
      localStorage.setItem("userData", JSON.stringify(user));
    } catch (err) {
      console.error("GitHub info error:", err);
    }
  };
  
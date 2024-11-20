import API_URL from "@/config";

export const fetchPosts = async (userId, accessToken, handleLogout) => {
  try {
    const response = await fetch(`${API_URL}post/all/friendsPosts/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    if (err.message.includes("401")) {
      console.log("fetching post logging u out");
      handleLogout();
      return;
    }
    console.log("Error fetching post info:", err);
    return [];
  }
}
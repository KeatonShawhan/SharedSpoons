import API_URL from "@/config";

export const fetchPosts = async (userId, accessToken) => {
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
    return json;
  } catch (err) {
    console.log("Error fetching post info:", err);
    return [];
  }
}
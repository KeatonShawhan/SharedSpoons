import API_URL from "@/config";

export const addRepost = async (userId, postId, accessToken) => {
  try {
    const url = new URL(`${API_URL}post/add/repost?userId=${userId}&postId=${postId}`);

    const response = await fetch(url.toString(), {
      method: 'POST',
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
  } catch {
    return [];
  }
}

export const getRepost = async (postId, accessToken) => {
  try {
    const url = new URL(`${API_URL}post/get/repost?postId=${postId}`);

    const response = await fetch(url.toString(), {
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
  } catch {
    return [];
  }
}
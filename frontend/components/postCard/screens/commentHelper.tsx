import API_URL from "@/config";

export const postComment = async (postId, text, accessToken) => {
  try {
    const response = await fetch(`${API_URL}comment/create?post=${postId}&text=${text}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error(`Error following user: ${response.status}`);
    return true;
  } catch (err) {
    console.error("Error making comment", err);
    return false;
  }
};

export const getComment = async (postId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}comment/getComments?postId=${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error(`Error following user: ${response.status}`);
    const json = await response.json();
    return json;

  } catch (err) {
    console.error("Error getting comment", err);
    return 0;
  }
};

export const getCommentCount = async (postId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}comment/getCommentCount?postId=${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error(`Error following user: ${response.status}`);
    const json = await response.json();
    return json;

  } catch (err) {
    console.error("Error getting comment count", err);
    return 0;
  }
};



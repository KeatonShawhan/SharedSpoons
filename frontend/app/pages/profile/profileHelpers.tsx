import API_URL from '@/config';

export const fetchFollowersInfo = async (userId, accessToken) => {
  try {
    console.log(userId);
    console.log(accessToken);
    const response = await fetch(`${API_URL}follow/getFollowers?user=${userId}`, {
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
    console.log("Error fetching followers info:", err);
    return [];
  }
};

export const fetchFollowingInfo = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}follow/getFollowing?user=${userId}`, {
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
    console.log("Error fetching following info:", err);
    return [];
  }
};

export const fetchAllPosts = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}post/all/${userId}`, {
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
    console.log("Error fetching following info:", err);
    return [];
  }
}; 
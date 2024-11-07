import API_URL from '@/config';

// Fetch followers info
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

// Fetch following info
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

// Fetch all posts for a user
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
    console.log("Error fetching posts:", err);
    return [];
  }
};

// Fetch user profile information (first name, last name, bio, etc.)
export const fetchUserInfo = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}auth/userInfo?id=${userId}`, {
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
    console.log("Error fetching user info:", err);
    return null;
  }
};

export const sendFollowRequest = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}follow/send?receiver=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error(`Error following user: ${response.status}`);
    return true;
  } catch (err) {
    console.error("Error sending follow request:", err);
    return false;
  }
};

export const removeFollowRequest = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}follow/remove?receiver=${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error(`Error unfollowing user: ${response.status}`);
    return true;
  } catch (err) {
    console.error("Error removing follow request:", err);
    return false;
  }
};

export const fetchFollowerCount = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}follow/getFollowersCount?user=${userId}`, {
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
    console.log("Error fetching follower count:", err);
    return [];
  }
};

export const fetchFollowingCount = async (userId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}follow/getFollowingCount?user=${userId}`, {
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
    console.log("Error fetching following count:", err);
    return [];
  }
};
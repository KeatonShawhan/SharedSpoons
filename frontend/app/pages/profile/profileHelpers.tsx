// profileHelpers.tsx
import API_URL from '@/config';

export const checkIfFollowing = async (currentUserId, profileUserId, accessToken, handleLogout) => {
  try {
    // Fetch the current user's following list
    const followingList = await fetchFollowingInfo(currentUserId, accessToken, handleLogout);

    // Check if the profile user's ID is in the following list
    const isFollowing = followingList.some(user => user.id === profileUserId);
    return isFollowing;
  } catch (err) {
    if (err.message.includes("401")) {
      handleLogout();
      return;
    }
    console.error("Error checking following status:", err);
    return false;
  }
};

// Fetch followers info
export const fetchFollowersInfo = async (userId, accessToken, handleLogout) => {
  try {
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
    if (err.message.includes("401")) {
      handleLogout();
      return;
    }
    console.log("Error fetching followers info:", err);
    return [];
  }
};

// Fetch following info
export const fetchFollowingInfo = async (userId, accessToken, handleLogout) => {
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
    if (err.message.includes("401")) {
      handleLogout();
      return;
    }
    console.log("Error fetching following info:", err);
    return [];
  }
};

// Fetch all posts for a user
export const fetchAllPosts = async (userId, accessToken, handleLogout) => {
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
    if (err.message.includes("401")) {
      handleLogout();
      return;
    }
    return [];
  }
};

// Fetch user profile information (first name, last name, bio, etc.)
export const fetchUserInfo = async (userId, accessToken, handleLogout) => {
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
    if (err.message.includes("401")) {
      handleLogout();
      return;
    }
    console.log("Error fetching user info:", err);
    return null;
  }
};

export const sendFollowRequest = async (userId, accessToken, handleLogout) => {
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
    if (err.message.includes("401")) {
      console.log("Unauthorized, logging out...");
      handleLogout();
      return;
    }
    console.error("Error sending follow request:", err);
    return false;
  }
};

export const removeFollowRequest = async (userId, accessToken, handleLogout) => {
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
    if (err.message.includes("401")) {
      console.log("Unauthorized, logging out...");
      handleLogout();
      return;
    }
    console.error("Error removing follow request:", err);
    return false;
  }
};

export const fetchFollowerCount = async (userId, accessToken, handleLogout) => {
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
    if (err.message.includes("401")) {
      handleLogout();
      return;
    }
    console.log("Error fetching follower count:", err);
    return [];
  }
};

export const fetchFollowingCount = async (userId, accessToken, handleLogout) => {
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
    if (err.message.includes("401")) {
      handleLogout();
      return;
    }
    console.log("Error fetching following count:", err);
    return [];
  }
};
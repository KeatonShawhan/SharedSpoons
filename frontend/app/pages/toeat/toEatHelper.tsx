// toEathelper.tsx
import API_URL from "@/config";
import { PostCardProps } from "@/components/postCard/postCard";

export const fetchToEat = async (accessToken) => {
  try {
    const response = await fetch(`${API_URL}toEat/getList`, {
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
    console.log("Error fetching to Eat:", err);
    return [];
  }
};

export const addToEat = async (postId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}toEat/post?postId=${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.ok;
    return json;
  } catch (err) {
    console.log("Error adding To Eat:", err);
    return [];
  }
};

export const deleteToEat = async (postId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}toEat/delete?postId=${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Check if response body exists before parsing
    const text = await response.text();
    if (text) {
      return JSON.parse(text); // Parse only if response body is non-empty
    }
    return null; // No response body
  } catch (err) {
    console.log("Error deleting To Eat:", err);
    return [];
  }
};


export const fetchPostData = async (postId, accessToken) => {
  try {
      const response = await fetch(`${API_URL}post/postID/${postId}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      });

      if (!response.ok) {
          throw new Error('Failed to fetch post');
      }


      const apiData = await response.json();  
            // Transform API data to match PostCard props
            const transformedData: PostCardProps = {
                isSaved: apiData.data.is_saved,
                isLiked:apiData.data.is_liked,
                id: apiData.id,
                user_id: apiData.user,
                username: apiData.data.username,
                caption: apiData.data.caption,
                dish: apiData.data.dish,
                rating: apiData.data.rating,
                place: apiData.data.restaurant,
                image: apiData.data.image,
                pfp: apiData.data.pfp,

                parentTab: 'ToEatTab' 
            };
            //console.log("apiData: ", apiData);
            return transformedData;

  } catch (err) {
      console.error('Error fetching post:', err);
  }
};

export const likePost = async (postId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}likes/add?post=${postId}`, {
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
  } catch (err) {
    console.log("Error liking post:", err);
    return [];
  }
};

export const unlikePost = async (postId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}likes/remove?post=${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.ok;
    return json;
  } catch (err) {
    console.log("Error unliking", err);
    return [];
  }
};

export const likeCount = async (postId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}likes/getLikeCount?post=${postId}`, {
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
    console.log("Error getting like count", err);
    return [];
  }
};
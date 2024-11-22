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

    const json = await response.json();
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

    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error deleting To Eat:", err);
    return [];
  }
};

export const fetchPostData = async (postId, accessToken) => {
  console.log('postid: ' + postId)
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
                isSaved: apiData.is_saved,
                id: apiData.id,
                user_id: apiData.user,
                username: apiData.data.username, // You might want to fetch this separately or get from context
                caption: apiData.data.caption,
                dish: apiData.data.dish,
                rating: apiData.data.rating,
                place: apiData.data.restaurant,
                image: apiData.data.image,
                pfp: apiData.data.pfp,

                parentTab: 'ProfileTab' 
            };
            return transformedData;

  } catch (err) {
      console.error('Error fetching post:', err);
  }
};
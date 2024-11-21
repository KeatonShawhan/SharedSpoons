// app/pages/explore/exploreHelpers.tsx

import API_URL from '@/config';

export const fetchExplorePosts = async (
  accessToken: string,
  handleLogout: () => void
): Promise<any[]> => {
  try {
    const response = await fetch(`${API_URL}explore/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        handleLogout();
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const posts = await response.json();
    return posts; // Should be an array of posts
  } catch (err: any) {
    console.error("Error fetching explore posts:", err);
    return [];
  }
};

export const fetchPostById = async (
  postId: string,
  accessToken: string,
  handleLogout: () => void
): Promise<any | null> => {
  try {
    const response = await fetch(`${API_URL}post/postID/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        handleLogout();
      }
      throw new Error(`Failed to fetch post. Status: ${response.status}`);
    }

    const post = await response.json();
    return post;
  } catch (err: any) {
    console.error("Error fetching post by ID:", err);
    return null;
  }
};

import React, { createContext, useState, useEffect, useContext } from "react";
import LoginContext from "./loginContext";
import API_URL from '@/config';
import { UUID } from '../..//backend/src/types';

// Types
interface Post {
  id: UUID;
  data: {
    image: string;
    rating: number;
    restaurant: string;
    dish: string;
    time: string;
    caption: string;
  };
}

interface Account {
  id: UUID;
  firstname: string;
  lastname: string;
  username: string;
}

interface ProfileContextProps {
  // Basic Profile Data
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  bio: string;
  
  // Social Data
  followers: Account[];
  following: Account[];
  followerCount: number;
  followingCount: number;
  
  // Posts Data
  posts: Post[];
  isLoadingPosts: boolean;
  postError: string | null;
  
  // Loading States
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  fetchFollowers: (userId: UUID) => Promise<void>;
  fetchFollowing: (userId: UUID) => Promise<void>;
  followUser: (userId: UUID) => Promise<boolean>;
  unfollowUser: (userId: UUID) => Promise<boolean>;
  fetchUserPosts: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextProps>({} as ProfileContextProps);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Profile States
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  
  // Social States
  const [followers, setFollowers] = useState<Account[]>([]);
  const [following, setFollowing] = useState<Account[]>([]);
  
  // Posts States
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);
  
  // General States
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loginContext = useContext(LoginContext);

  // Compute full name when first or last name changes
  const name = `${firstName} ${lastName}`.trim();

  const fetchUserProfile = async () => {
    if (!loginContext?.accessToken) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}auth/userInfo?accessToken=${loginContext.accessToken}`);
      
      if (!response.ok) throw new Error('Failed to fetch profile');
      
      const userData = await response.json();
      setId(userData.id);
      setFirstName(userData.firstname);
      setLastName(userData.lastname);
      // Other profile data can be set here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFollowers = async (userId: UUID) => {
    if (!loginContext?.accessToken) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}follow/getFollowers?user=${userId}`, {
        headers: {
          'Authorization': `Bearer ${loginContext.accessToken}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch followers');
      
      const followerData = await response.json();
      setFollowers(followerData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch followers');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFollowing = async (userId: UUID) => {
    if (!loginContext?.accessToken) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}follow/getFollowing?user=${userId}`, {
        headers: {
          'Authorization': `Bearer ${loginContext.accessToken}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch following');
      
      const followingData = await response.json();
      setFollowing(followingData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch following');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    if (!loginContext?.accessToken || !loginContext?.userId) return;

    try {
      setIsLoadingPosts(true);
      setPostError(null);

      const response = await fetch(`${API_URL}post/all/${loginContext.userId}`, {
        headers: {
          'Authorization': `Bearer ${loginContext.accessToken}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      
      const postsData = await response.json();
      setPosts(postsData);

    } catch (err) {
      setPostError(err instanceof Error ? err.message : 'Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const followUser = async (receiverId: UUID): Promise<boolean> => {
    if (!loginContext?.accessToken) return false;

    try {
      const response = await fetch(`${API_URL}follow/send?receiver=${receiverId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${loginContext.accessToken}`
        }
      });

      if (!response.ok) throw new Error('Failed to follow user');
      
      // Optimistically update following count
      setFollowing(prev => [...prev]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to follow user');
      return false;
    }
  };

  const unfollowUser = async (receiverId: UUID): Promise<boolean> => {
    if (!loginContext?.accessToken) return false;

    try {
      const response = await fetch(`${API_URL}follow/remove?receiver=${receiverId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${loginContext.accessToken}`
        }
      });

      if (!response.ok) throw new Error('Failed to unfollow user');
      
      // Optimistically update following count
      setFollowing(prev => prev.filter(user => user.id !== receiverId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unfollow user');
      return false;
    }
  };

  const refreshProfile = async () => {
    if (!loginContext?.accessToken || !loginContext.userId) return;
    
    await Promise.all([
      fetchUserProfile(),
      fetchFollowers(loginContext.userId),
      fetchFollowing(loginContext.userId),
      fetchUserPosts()
    ]);
  };

  // Initial load of profile data when access token changes
  useEffect(() => {
    if (loginContext?.accessToken) {
      refreshProfile();
    }
  }, [loginContext?.accessToken]);

  return (
    <ProfileContext.Provider
      value={{
        // Profile Data
        id,
        firstName,
        lastName,
        name,
        bio,
        // Social Data
        followers,
        following,
        followerCount: followers.length,
        followingCount: following.length,
        // Posts Data
        posts,
        isLoadingPosts,
        postError,
        // Loading States
        isLoading,
        error,
        // Actions
        setFirstName,
        setLastName,
        fetchFollowers,
        fetchFollowing,
        followUser,
        unfollowUser,
        fetchUserPosts,
        refreshProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileContext;
import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import ProfilePostHeader from '@/components/profilePost/ProfilePostHeader';
import { PostCard, PostCardProps } from '@/components/postCard/postCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ProfileStackParamList } from '../profile/profileNavigation';
import LoginContext from '@/contexts/loginContext';
import API_URL from '@/config';

type PostPageRouteProp = RouteProp<ProfileStackParamList, 'PostPage'>;

// Match the API response type to your backend
interface PostApiResponse {
  id: string;
  user: string;
  data: {
    image: string;
    rating: number;
    restaurant: string;
    dish: string;
    time: string;
    caption: string;
    pfp: string;
    username: string;
    is_saved:boolean;
  };
}

export default function PostPage() {
    const navigation = useNavigation();
    const route = useRoute<PostPageRouteProp>();
    const colorScheme = useColorScheme();
    const loginContext = useContext(LoginContext);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [postData, setPostData] = useState<PostCardProps | null>(null);

    useEffect(() => {
        fetchPostData();
    }, [route.params.postId]);

    const fetchPostData = async () => {
        if (!loginContext?.accessToken) return;

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`${API_URL}post/postID/${route.params.postId}`, {
                headers: {
                    'Authorization': `Bearer ${loginContext.accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }

            const apiData: PostApiResponse = await response.json();
            // console.log("apiData: ", apiData.data.is_saved);
            
            // Transform API data to match PostCard props
            const transformedData: PostCardProps = {
                isSaved: apiData.data.is_saved,
                id: apiData.id,
                user_id: apiData.user,
                username: apiData.data.username,
                caption: apiData.data.caption,
                dish: apiData.data.dish,
                rating: apiData.data.rating,
                place: apiData.data.restaurant,
                image: apiData.data.image,
                parentTab: 'ProfileTab',
                pfp: apiData.data.pfp
            };
            
            setPostData(transformedData);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch post');
            console.error('Error fetching post:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Apply color scheme dynamically to the styles
    const styles = getStyles(Colors[colorScheme]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ProfilePostHeader onBackPress={() => navigation.goBack()} />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
                </View>
            </View>
        );
    }

    if (error || !postData) {
        return (
            <View style={styles.container}>
                <ProfilePostHeader onBackPress={() => navigation.goBack()} />
                <View style={styles.content}>
                    <Text style={[styles.errorText, { color: Colors[colorScheme].text }]}>
                        {error || 'Failed to load post'}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ProfilePostHeader onBackPress={() => navigation.goBack()} />
            <View style={styles.content}>
                <View style={styles.postCardContainer}>
                    <PostCard {...postData} />
                </View>
            </View>
        </View>
    );
}

const getStyles = (colors: { [key: string]: string }) => StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 15,
    },
    postCardContainer: {
        width: '90%',
        alignSelf: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});
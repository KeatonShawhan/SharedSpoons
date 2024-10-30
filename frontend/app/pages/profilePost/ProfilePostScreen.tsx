import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfilePostHeader from '@/components/profilePost/ProfilePostHeader';
import { postCard as PostCard } from '@/components/postCard/postCard';  // Aliasing the import

export default function PostPage() {
    const navigation = useNavigation();

    // Dummy data for the postCard
    const postData = {
        id: '1',
        username: 'User123',
        caption: 'Great dish!',
        dish: 'Spaghetti Carbonara',
        rating: 5,
        place: 'The Italian Corner',
        image: 'https://example.com/image.jpg',
        categories: ['Italian', 'Pasta'],
        notes: 'Very creamy and rich pasta dish.',
        likes: 200,
        commentsCount: 10
    };

    return (
        <View style={styles.container}>
            <ProfilePostHeader onBackPress={() => navigation.goBack()} />
            <View style={styles.content}>
                {/* Render postCard with an alias as a workaround */}
                <PostCard {...postData} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

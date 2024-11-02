import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfilePostHeader from '@/components/profilePost/ProfilePostHeader';
import { PostCard } from '@/components/postCard/postCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function PostPage() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    // Dummy data for the postCard
    const postData = {
        id: '1',
        username: 'User123',
        caption: 'Great dish!',
        dish: 'Spaghetti Carbonara',
        rating: 5,
        place: 'The Italian Corner',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGJ2-FbJk717ZkaM5gjIUHT3kCQhDWNdIyvsR-XLbpsRdFVMpWRlSZx6jo9JAa1joLRU&usqp=CAU",
        categories: ['Italian', 'Pasta'],
        notes: 'Very creamy and rich pasta dish.',
        likes: 200,
        commentsCount: 10
    };

    // Apply color scheme dynamically to the styles
    const styles = getStyles(Colors[colorScheme]);

    return (
        <View style={styles.container}>
            <ProfilePostHeader onBackPress={() => navigation.goBack()} />
            <View style={styles.content}>
                <View style={styles.postCardContainer}>
                    <PostCard 
                      {...postData}
                      parentTab="ProfileTab" // Specify ProfileTab as the parent for navigation
                    />
                </View>
            </View>
        </View>
    );
}

const getStyles = (colors) => StyleSheet.create({
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
});

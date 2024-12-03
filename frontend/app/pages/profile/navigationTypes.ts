// navigationTypes.ts
import { UUID } from '../../../../backend/src/types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ProfileStackParamList = {
  Main: { 
    userId?: UUID;
    isFromProfileTab?: boolean;
    isFromHomeTab?: boolean; 
    isFromExploreTab?: boolean; 
    isFromComments?: boolean;
  };
  Friends: { initialTab: 'followers' | 'following'; userId?: UUID };
  PostPage: { postId: UUID, isOwnProfile: boolean };
  PostStack: NavigatorScreenParams<PostStackParamList>;
};
  
export type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

type ProfileRootParams = {
    screen: 'Main';
    params: {
      userId: UUID;
      isFromComments?: boolean;
    };
  };
  
export type PostStackParamList = {
    Comments: { 
      postId: UUID;
      parentTab: 'HomeTab' | 'ProfileTab' | 'ToEatTab' | 'ExploreTab';
    };
    ProfileRoot: ProfileRootParams;
  };
  
  
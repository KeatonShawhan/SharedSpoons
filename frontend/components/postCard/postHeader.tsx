import { PropsWithChildren} from 'react';
import { Text, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Avatar } from 'react-native-paper';


export function postHeader({ children, username, place }: PropsWithChildren & { username: string, place:string }) {
  return (
    <ThemedView>
      <View style={{flexDirection:'row', display:'flex', alignItems:'center'}}>
        <Avatar.Icon size={42} icon="heart" />
        <View>
          <Text style={{paddingLeft:10, paddingTop:0, fontSize: 16}}>
            {username}
          </Text>
          <Text style={{paddingLeft:10, paddingTop:0, fontSize: 14, color:'grey'}}>
            {place}
          </Text>
        </View>
      </View>
    </ThemedView>
  );
}

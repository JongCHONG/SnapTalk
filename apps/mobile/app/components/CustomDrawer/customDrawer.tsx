import { View } from "react-native";
import { Drawer } from "react-native-paper";
import customDrawerStyles from "./customDrawerStyles";

type CustomDrawerProps = {
  usersOnline: string[];
  user?: { username: string };
};

const CustomDrawer = ({ usersOnline, user }: CustomDrawerProps) => {
  return (
    <View style={customDrawerStyles.drawerOverlay}>
      <Drawer.Section title="Connectés">
        {usersOnline.map((username: string, idx: number) => (
          <Drawer.Item
            key={idx}
            label={username}
            active={user?.username === username}
            icon="account"
          />
        ))}
      </Drawer.Section>
    </View>
  );
};

export default CustomDrawer;

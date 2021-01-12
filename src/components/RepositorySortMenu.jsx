import * as React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import theme from '../theme'

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    scrollContentContainer: {
        paddingTop: 40,
        paddingBottom: 10,
    },
    inputIOS: {
      fontSize: theme.fontSizes.body,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: theme.fontSizes.body,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

const RepositorySortMenu = () => {
    return (
        <RNPickerSelect
            style={style}
            onValueChange={(value) => console.log(value)}
            placeholder={{ label: 'Order by', value: 'orderby' }}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        />
    );
};

// const RepositorySortMenu = () => {
//   const [visible, setVisible] = React.useState(false);

//   const openMenu = () => setVisible(true);
//   const closeMenu = () => setVisible(false);

//   return (
//     <Provider>
//       <View style={styles.main}>
//         <Menu
//           visible={visible}
//           onDismiss={closeMenu}
//           anchor={<Button onPress={openMenu}>Show menu</Button>}>
//           <Menu.Item onPress={() => console.log('item1')} title="Item 1" />
//           <Menu.Item onPress={() => console.log('item2')} title="Item 2" />
//           <Divider />
//           <Menu.Item onPress={() => console.log('item3')} title="Item 3" />
//         </Menu>
//       </View>
//     </Provider>
//   );
// };

export default RepositorySortMenu;
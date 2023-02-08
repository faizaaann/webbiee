import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Button from '../components/UI Components/CustomButton';

export default function DashBoard() {
  const { category } = useSelector((state: RootState) => state.category);
  const { items } = useSelector((state: RootState) => state.items);

  return (
    <View style={styles.container}>
      <Button title='Add New Category' onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

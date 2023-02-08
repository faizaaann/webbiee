import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { v4 as uuidv4 } from 'uuid';
import { addCategory, deleteCategory } from '../store/features/categorySlice';
import { ManageCategoryNavigationProps } from '../Types/Navigation';
import { useNavigation } from '@react-navigation/native';
import { ICategory } from '../Interface/ManageCategory';
import Category from '../components/Card/Category';
import Button from '../components/UI Components/CustomButton';
import EmptyList from '../components/UI Components/EmptyList';

export default function ManageCategory() {
  const { category } = useSelector((state: RootState) => state.category);

  const dispatch = useDispatch();

  const addNewCategory = () => {
    const data: ICategory = {
      id: uuidv4(),
      name: 'New Category',
      inputFields: [{ type: 'Text', value: '', id: uuidv4() }],
      titleSelected: 0,
    };
    dispatch(addCategory(data));
  };

  const onRemoveCategory = (id: string) => {
    dispatch(deleteCategory(id));
  };

  const RenderCategoryItem: ListRenderItem<ICategory> = ({ item, index }) => {
    return (
      <Category
        index={index}
        data={item}
        removeCategory={() => onRemoveCategory(item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={category}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        horizontal={false}
        keyExtractor={(item: ICategory) => item.id}
        renderItem={RenderCategoryItem}
        ListEmptyComponent={<EmptyList title='Category' />}
      />
      <Button title='Add New Category' onPress={addNewCategory} />
    </View>
  );
}
{
}
const styles = StyleSheet.create({
  container: {
    flex: 0.98,
    margin: 10,
  },
  contentContainer: {
    flexDirection: 'column',
  },
});

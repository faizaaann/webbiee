import { ListRenderItem, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import Button from '../components/UI Components/CustomButton';
import { addItem } from '../store/features/itemsSlice';
import { v4 as uuidv4 } from 'uuid';
import { ICategory, IInputField } from '../Interface/ManageCategory';
import { IItem } from '../Interface/Items';
import { addCategory } from '../store/features/categorySlice';

const Items = () => {
  const { category } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch<AppDispatch>();

  const selectedCategory: ICategory = useMemo(
    (id: string) => category.find((item: ICategory) => item.id === id),
    [category]
  );

  const handleAddItem = useCallback(() => {
    const temp: any = {};
    selectedCategory.inputFields.forEach((el: IInputField) => {
      temp[el.value] = el.type == 'Checkbox' ? false : '';
    });
    const data: IItem = {
      id: uuidv4(),
      parentCategoryId: selectedCategory.id,
      parentCategoryName: selectedCategory.name,
      ...temp,
    };
    dispatch(addItem({ category: selectedCategory.id, data }));
  }, [dispatch, selectedCategory]);

  const addNewCategory = () => {
    const data: ICategory = {
      id: uuidv4(),
      name: 'New Category',
      inputFields: [{ type: 'Text', value: '', id: uuidv4() }],
      titleSelected: 0,
    };
    dispatch(addCategory(data));
  };

  return (
    <View style={styles.container}>
      {category.length ? (
        category.map((cat: ICategory, index: number) => (
          <View key={index}>
            <View style={styles.headerView}>
              <View style={styles.headerTextView}>
                <Text style={styles.title}>{cat.name}</Text>
              </View>
              <Button title='Add New Item' onPress={handleAddItem} />
            </View>
          </View>
        ))
      ) : (
        <View style={styles.container}>
          <Button title='Add New Category' onPress={addNewCategory} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  noDataText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  headerView: { flexDirection: 'row' },
  headerTextView: { flex: 1 },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default Items;

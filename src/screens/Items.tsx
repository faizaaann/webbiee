import { ListRenderItem, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../components/UI Components/CustomButton';
import { addItem, deleteItem, updateItem } from '../store/features/itemsSlice';
import { v4 as uuidv4 } from 'uuid';
import Item from '../components/Card/Item';
import { ItemsScreenProps } from '../Types/Navigation';
import { ICategory, IInputField } from '../Interface/ManageCategory';
import { IItem } from '../Interface/Items';
import { FlatList } from 'react-native-gesture-handler';
import EmptyList from '../components/UI Components/EmptyList';
import moment from 'moment';

const Items = () => {
  const navigation = useNavigation();

  const { category } = useSelector((state: RootState) => state.category);
  const { items } = useSelector((state: RootState) => state.items);
  const { params } = useRoute<ItemsScreenProps>();
  const dispatch = useDispatch<AppDispatch>();

  const selectedCategory: ICategory = useMemo(
    () => category.find((item: ICategory) => item.id === params.id),
    [category, params.id]
  );

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: params.name });
  }, [navigation, params.name]);

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

  const onRemoveItem = useCallback(
    (id: string) => {
      dispatch(deleteItem({ category: selectedCategory.id, id }));
    },
    [dispatch, selectedCategory]
  );

  const onUpdateItem = useCallback(
    (index: number, field: string, data: string | boolean) => {
      const updatedData = [...items[selectedCategory.id]];
      updatedData[index] = { ...updatedData[index], [field]: data };

      console.table(updatedData);
      dispatch(
        updateItem({ category: selectedCategory.id, data: updatedData })
      );
    },
    [dispatch, items, selectedCategory]
  );

  const _renderTitle = useCallback(
    (type: string, value: string, item: IItem) => {
      if (type === 'Date' && item[value]) {
        return (
          <Text style={styles.titleText}>
            {moment(item[value]).format('MMMM Do YYYY, h:mm a')}
          </Text>
        );
      }
    },
    []
  );

  const _renderItem: ListRenderItem<IItem> = ({ item, index }) => {
    const value =
      selectedCategory.inputFields[selectedCategory.titleSelected].value;
    const type =
      selectedCategory.inputFields[selectedCategory.titleSelected].type;
    return (
      <Item
        title={_renderTitle(type, value, item)}
        inputs={selectedCategory.inputFields}
        data={item}
        onRemoveItem={onRemoveItem}
        onUpdateItem={(data, field) => onUpdateItem(index, field, data)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.headerTextView}>
          <Text style={styles.title}>{params.name}</Text>
        </View>
        <Button title='Add New Item' onPress={handleAddItem} />
      </View>
      <FlatList
        data={items[params.id]}
        keyExtractor={(item: IItem) => item.id}
        renderItem={_renderItem}
        ListEmptyComponent={<EmptyList title='List' />}
      />
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
    color: '#333',
    textAlign: 'left',
  },
  headerView: { flexDirection: 'row' },
  headerTextView: { flex: 1 },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default Items;

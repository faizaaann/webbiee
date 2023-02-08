import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, TextInput, Title } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {
  addInputFields,
  updateCategoryName,
  updateInputFieldsValue,
  updateSelectedTitle,
} from '../../../store/features/categorySlice';
import { AppDispatch } from '../../../store/store';
import NewInputField from '../../UI Components/NewInputField';
import Button from '../../UI Components/CustomButton';
import { v4 as uuidv4 } from 'uuid';
import { ICardCategory } from '../../../Interface/Card';
import { TInputFieldType } from '../../../Types/ManageCategory';
import { IInputField } from '../../../Interface/ManageCategory';
import types from '../../../constants/InputFields';
import Colors from '../../../constants/Colors';

const Category: React.FC<ICardCategory> = ({ removeCategory, data, index }) => {
  const [title, setTitle] = useState<string>(data.name);
  const [modal, setModal] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<boolean>(false);
  const [inputList, setInputList] = useState<Array<IInputField>>(
    data.inputFields
  );
  const [titleField, setTitleField] = useState<number>(data.titleSelected);
  const dispatch = useDispatch<AppDispatch>();

  const onAddInput = (item: TInputFieldType) => {
    const newlyAddedValue: IInputField = {
      type: item,
      value: '',
      id: uuidv4(),
    };
    const addInput: Array<IInputField> = [...inputList, newlyAddedValue];
    setInputList(addInput);
    dispatch(addInputFields({ index, data: newlyAddedValue }));
    setModal(false);
  };

  const onRemoveInput = (i: number) => {
    const removeInput = [...inputList];
    removeInput.splice(i, 1);
    if (removeInput.length === 0) {
      setTitleField(-1);
      dispatch(updateSelectedTitle({ index, data: -1 }));
    }
    setInputList(removeInput);
    dispatch(updateSelectedTitle({ index, inputIndex: i }));
  };

  const handleChange = (text: string, i: number, id: string) => {
    let inputData = [...inputList];
    inputData[i] = { ...inputData[i], value: text };
    dispatch(updateInputFieldsValue({ index, data: inputData }));
    setInputList(inputData);
  };

  const handleSetTitleField = (i: number) => {
    setTitleField(i);
    dispatch(updateSelectedTitle({ index, data: i }));
    setTitleModal(false);
  };

  const toggleFieldModal = () => setModal(!modal);
  const toggleTitleModal = () => setTitleModal(!titleModal);

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{title}</Title>
      <View>
        <TextInput
          label='Category Name'
          mode='outlined'
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            dispatch(updateCategoryName({ index, data: text }));
          }}
        />
      </View>

      {inputList.map((data: IInputField, i: number) => {
        return (
          <NewInputField
            key={i}
            value={data.value}
            onChange={(text: string) => handleChange(text, i, data.id)}
            fieldType={data.type}
            handleRemove={() => onRemoveInput(i)}
            placeholder={data.type}
          />
        );
      })}
      <Menu
        visible={titleModal}
        onDismiss={toggleTitleModal}
        anchor={
          <Button
            title={`Title Field ${
              titleField === -1
                ? ':Unnamed Fields'
                : inputList[titleField]?.value
                ? ':' + inputList[titleField].value
                : ':' + 'Unnamed Fields'
            }`}
            onPress={toggleTitleModal}
            color={Colors.CASUAL}
          />
        }>
        {inputList.map((item: IInputField, i: number) => (
          <Menu.Item
            key={i}
            onPress={() => handleSetTitleField(i)}
            title={item.value ? item.value : 'Unamed Fields ' + (i + 1)}
          />
        ))}
      </Menu>
      <View style={styles.btnGroup}>
        <Menu
          visible={modal}
          onDismiss={toggleFieldModal}
          anchor={
            <Button title={'Add New Field'} onPress={toggleFieldModal} />
          }>
          {types.map((item: TInputFieldType, i: number) => (
            <Menu.Item key={i} onPress={() => onAddInput(item)} title={item} />
          ))}
        </Menu>

        <Button
          title={'Remove Category'}
          onPress={removeCategory}
          color={Colors.DELETE}
        />
      </View>
    </View>
  );
};

export default Category;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },
  title: { fontSize: 22, marginVertical: 8 },
  contentContainer: {
    flexDirection: 'column',
    paddingBottom: '10%',
  },
  btnGroup: { flexDirection: 'row', justifyContent: 'space-evenly' },
});

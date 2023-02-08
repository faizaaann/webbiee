import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Checkbox, TextInput, Title } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Colors from '../../../constants/Colors';
import { IInputField } from '../../../Interface/ManageCategory';
import { ICardItem } from '../../../Interface/Card';
import { Ionicons } from '@expo/vector-icons';

const Item: React.FC<ICardItem> = ({
  data,
  title,
  inputs,
  onRemoveItem,
  onUpdateItem,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <View style={{ backgroundColor: 'white', padding: 8, marginTop: 8 }}>
      <Title>{title}</Title>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {inputs.map((item: IInputField, i: number) => {
        return (
          <React.Fragment key={i}>
            {(item.type === 'Text' || item.type === 'Number') && (
              <TextInput
                value={data[item.value]}
                keyboardType={item.type === 'Number' ? 'number-pad' : 'default'}
                placeholder={item.value}
                mode={'outlined'}
                onChangeText={(text: string) => {
                  onUpdateItem(text, item.value);
                }}
              />
            )}
            {item.type === 'Date' && (
              <Pressable
                onPress={showDatePicker}
                style={{
                  backgroundColor: '#fffbfe',
                  padding: 12,
                  borderColor: '#79747e',
                  borderWidth: 1,
                  marginVertical: 7,
                  borderRadius: 4,
                }}>
                <Text style={{ fontSize: 16 }}>
                  {data[item.value]
                    ? moment(data[item.value]).format('L')
                    : 'Select a date'}
                </Text>
              </Pressable>
            )}
            {item.type === 'Checkbox' && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 55,
                }}>
                <Checkbox.Android
                  status={data[item.value] ? 'checked' : 'unchecked'}
                  onPress={() => {
                    onUpdateItem(!data[item.value], item.value);
                  }}
                />
                <View>
                  <Text>{item.value}</Text>
                </View>
              </View>
            )}
          </React.Fragment>
        );
      })}
      <TouchableOpacity
        onPress={() => onRemoveItem(data.id)}
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
        <Ionicons name='ios-trash' size={24} color={Colors.SECONDARY} />
        <Text style={{ marginLeft: 8, color: Colors.SECONDARY }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Item;

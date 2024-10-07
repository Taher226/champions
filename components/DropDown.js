import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
function DropDown() {
  const data = [
    {label: 'English', value: '1'},
    {label: 'Arabic', value: '2'},
    {label: 'French', value: '3'},
    {label: 'Spanish', value: '4'},
    {label: 'Russian', value: '5'},
    {label: 'Portuguese', value: '6'},
    {label: 'Urdu', value: '7'},
    {label: 'Turkish', value: '8'},
  ];

  const [selected, setSelected] = useState([]);

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Kindly choose the language"
        value={selected}
        activeColor="#c5c5c5"
        onChange={item => {
          setSelected(item);
        }}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16},
  dropdown: {
    height: 50,
    elevation: 0.5,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor: '#07b2bc',
  },
});

export default DropDown;

import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleTextInputFocus = () => {
    setIsCalendarVisible(true);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setIsCalendarVisible(false);
  };

  const handleCalendarDismiss = () => {
    setIsCalendarVisible(false);
  };

  return (
    <View>
      <TextInput
        placeholder="Select Date"
        value={selectedDate}
        onFocus={handleTextInputFocus}
        onChangeText={handleDateChange}
      />
      <DatePicker
        mode="date"
        date={selectedDate}
        onDateChange={handleDateChange}
        visible={isCalendarVisible}
        onDismiss={handleCalendarDismiss}
      />
    </View>
  );
};
export default CalendarComponent;

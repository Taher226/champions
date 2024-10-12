import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function TitleText({label, invalid, ...props}) {
  let labelStyles = [styles.text];

  if (invalid) {
    labelStyles.push(styles.invalidLabel);
  }

  return (
    <View>
      <Text style={labelStyles}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingTop: 8,
  },

  invalidLabel: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    paddingTop: 8,
  },
});
export default TitleText;

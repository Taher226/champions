import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function GenderContainer({onPress, selected, type, invalid, value}) {
  return (
    <View style={{flex: 0.5, paddingVertical: 10}}>
      <TouchableOpacity
        onPress={() => {
          onPress(type);
        }}
        style={[
          styles.button,
          {
            borderWidth: selected || invalid ? 1 : 0,
            borderColor: selected ? '#07b2bc' : invalid ? 'red' : null,
            borderRadius: selected || invalid ? 5 : 0,
          },
        ]}>
        <Text
          style={{
            fontSize: 15,
            color: selected ? '#07b2bc' : invalid ? 'red' : 'black',
          }}>
          {type}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default GenderContainer;

const styles = StyleSheet.create({
  button: {
    width: '95%',
    backgroundColor: 'white',
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    //marginHorizontal: 50,
  },
});

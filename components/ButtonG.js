import {Pressable, View, Text, StyleSheet} from 'react-native';

const ButtonG = ({title, onPress = () => {}, disabled}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => (pressed ? styles.pressed : null)}>
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>{title}</Text>
      </View>
    </Pressable>
  );
};
export default ButtonG;

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingTop: 8,
  },

  conditions: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 30,
  },
  pressed: {
    opacity: 0.5,
  },
  buttonContainer: {
    marginLeft: 40,
    marginTop: 5,
    backgroundColor: '#07b2bc',
    borderRadius: 20,
    //minWidth: 200,
    width: 300,
    alignItems: 'center',
  },
  button: {
    margin: 10,
    fontSize: 16,
    color: 'white',
  },
});

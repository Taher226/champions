import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonG from './ButtonG';
import {invalid} from 'moment';
const Input = ({
  label,
  error,
  invalid,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  let inputStyles = [styles.input];
  let labelStyles = [styles.text];

  if (invalid) {
    inputStyles.push(styles.invalidInput);
    labelStyles.push(styles.invalidLabel);
  }

  return (
    <View>
      <Text style={labelStyles}>{label}</Text>
      <View
        style={[
          inputStyles,
          {
            flexDirection: 'row',
            borderColor: error ? 'red' : isFocused ? 'transparent' : 'white',
          },
        ]}>
        <TextInput
          secureTextEntry={hidePassword}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />
        {password && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon
              name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
              size={22}
              style={{paddingTop: 15}}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={{color: 'red', fontSize: 12}}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingTop: 8,
  },
  input: {
    //justifyContent: 'flex-end',
    width: 390,
    //marginHorizontal: 20,
    marginVertical: 8,
    fontSize: 16,
    elevation: 0.5,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
  },
  invalidLabel: {
    color: 'red',
  },
  invalidInput: {
    backgroundColor: '#e45959',
  },
});
export default Input;

import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import 'firebase/auth';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Checkbox} from 'react-native-paper';
import ButtonMultiselect, {ButtonLayout} from 'react-native-button-multiselect';
import DropDown from '../components/DropDown';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import Icon from 'react-native-vector-icons/EvilIcons';
import Input from '../components/Input';
import ButtonG from '../components/ButtonG';

import {storeData} from '../util/http';

function RegisterScreen() {
  const [checked, setChecked] = useState(true);

  const [selectedButtons, setSelectedButtons] = useState([]);
  const buttons = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];
  const handleButtonSelected = selectedValues => {
    setSelectedButtons(selectedValues);
  };

  const [inputs, setInputs] = useState({
    name: {
      value: '',
      isValid: true,
    },
    date: {
      value: '',
      isValid: true,
    },
    email: {
      value: '',
      isValid: true,
    },
    password: {
      value: '',
      isValid: true,
    },
    mobile: {
      value: '',
      isValid: true,
    },
  });
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }

  function validateHandler() {
    const registerData = {
      name: inputs.name.value,
      date: new Date(inputs.date.value),
      email: inputs.email.value,
      password: inputs.password.value,
      mobile: inputs.mobile.value,
    };
    const nameIsValid = registerData.name.trim().length > 0;
    const dateIsValid = registerData.date.toString() !== 'Invalid Date';
    const emailIsValid = registerData.email.trim().length > 0;
    const passwordIsValid = registerData.password.trim().length > 0;
    const mobileIsValid =
      !isNaN(registerData.mobile) && registerData.mobile > 0;

    if (
      !nameIsValid ||
      !dateIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !mobileIsValid
    ) {
      setInputs(curInputs => {
        return {
          name: {value: curInputs.name.value, isValid: nameIsValid},
          date: {value: curInputs.date.value, isValid: dateIsValid},
          email: {value: curInputs.email.value, isValid: emailIsValid},
          password: {value: curInputs.password.value, isValid: passwordIsValid},
          mobile: {value: curInputs.mobile.value, isValid: mobileIsValid},
        };
      });

      return;
    }

    handleSubmit(registerData);
  }
  const formIsInvalid =
    !inputs.name.isValid ||
    !inputs.date.isValid ||
    !inputs.email.isValid ||
    !inputs.password.isValid ||
    !inputs.mobile.isValid;

  //////////////////////firebase///////////////////////////

  const handleSubmit = async registerData => {
    try {
      let x = createUserWithEmailAndPassword(
        auth,
        inputs.email.value,
        inputs.password.value,
      ).then(() => {
        storeData(registerData);
      });

      console.log(x);
    } catch (err) {
      console.log('got error: ', err.message);
      Alert.alert('Error Here !!!!');
    }
  };

  ///////////////////////////firebase//////////////////////

  return (
    <ScrollView>
      <View style={styles.fullContainer}>
        <Input
          label="* Email"
          placeholder="Enter your Email"
          invalid={!inputs.email.isValid}
          value={inputs.email.value}
          onChangeText={inputChangedHandler.bind(this, 'email')}
        />

        <Input
          label="Name"
          placeholder="Full Name"
          invalid={!inputs.name.isValid}
          value={inputs.name.value}
          onChangeText={inputChangedHandler.bind(this, 'name')}
        />

        <Input
          label="Mobile Number"
          placeholder="Mobile Number"
          keyboardType="decimal-pad"
          invalid={!inputs.mobile.isValid}
          value={inputs.mobile.value}
          onChangeText={inputChangedHandler.bind(this, 'mobile')}
        />

        <Input
          label="Birth Date"
          placeholder="2002-06-22"
          invalid={!inputs.date.isValid}
          value={inputs.date.value}
          onChangeText={inputChangedHandler.bind(this, 'date')}
        />

        <Text style={[styles.text, {marginBottom: 3}]}>Gender</Text>
        <ButtonMultiselect
          layout={ButtonLayout.FULL_WIDTH}
          buttons={buttons}
          selectedButtons={selectedButtons}
          onButtonSelected={handleButtonSelected}
          unselectedColors={{
            borderColor: '#dbd8d8',
          }}
          selectedColors={{
            backgroundColor: '#07b2bc',
            borderColor: 'white',
            textColor: 'white',
          }}
        />

        <Text style={styles.text}>Learning Language</Text>
        <DropDown />

        <Input
          label={'* Password'}
          placeholder="Enter your Password"
          password
          invalid={!inputs.password.isValid}
          value={inputs.password.value}
          onChangeText={inputChangedHandler.bind(this, 'password')}
        />

        <View style={styles.conditions}>
          <Checkbox
            color="#07b2bc"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />

          <Text style={{fontSize: 16, color: 'black', marginTop: 5}}>
            I accept the{' '}
          </Text>

          <Pressable style={({pressed}) => (pressed ? styles.pressed : null)}>
            <Text
              style={{
                marginTop: 5,
                fontSize: 16,
                color: '#07b2bc',
                borderBottomWidth: 1,
                borderBottomColor: '#07b2bc',
              }}>
              Terms and Conditions
            </Text>
          </Pressable>
        </View>

        <ButtonG title={'Register'} onPress={validateHandler} />
      </View>
    </ScrollView>
  );
}

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
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 12,
  },
});

export default RegisterScreen;

import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import 'firebase/auth';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import ButtonMultiselect, {ButtonLayout} from 'react-native-button-multiselect';
import DropDown from '../components/DropDown';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import Icon from 'react-native-vector-icons/EvilIcons';
import Input from '../components/Input';
import ButtonG from '../components/ButtonG';
import {storeData} from '../util/http';
import GenderContainer from '../components/GenderContainer';
import MultiSelectModal from '../components/MultiselectModal';
import CalendarComponent from '../components/CalenderComponent';
import DatePicker from 'react-native-date-picker';
import {Calendar} from 'react-native-calendar';
import TitleText from '../components/TitleText';
import moment from 'moment';

function RegisterScreen() {
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');

  const [selectedOption, setSelectedOption] = useState('');
  const handleSelection = type => {
    setSelectedOption(type);
  };
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  /////////////////////////Validation////////////////////////////
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
    gender: {
      value: '',
      isValid: true,
    },
    languagee: {
      value: [...language],
      isValid: true,
    },
  });

  const language = [
    {id: 1, label: 'English'},
    {id: 2, label: 'French'},
    {id: 3, label: 'Spanish'},
    {id: 4, label: 'Turkish'},
    {id: 5, label: 'German'},
    {id: 6, label: 'Dutch'},
  ];

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
      gender: inputs.gender.value,
      languagee: inputs.languagee.value,
    };
    const nameIsValid = registerData.name.trim().length > 0;
    const dateIsValid = registerData.date.toString() !== 'Invalid Date';
    const emailIsValid = registerData.email.trim().length > 0;
    const passwordIsValid = registerData.password.trim().length > 0;
    const mobileIsValid =
      !isNaN(registerData.mobile) && registerData.mobile > 0;
    const genderIsValid = registerData.gender.trim().length > 0;
    const languageIsValid = registerData.languagee.length > 0;

    if (
      !nameIsValid ||
      !dateIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !mobileIsValid ||
      !genderIsValid ||
      !languageIsValid
    ) {
      setInputs(curInputs => {
        return {
          name: {value: curInputs.name.value, isValid: nameIsValid},
          date: {value: curInputs.date.value, isValid: dateIsValid},
          email: {value: curInputs.email.value, isValid: emailIsValid},
          password: {value: curInputs.password.value, isValid: passwordIsValid},
          mobile: {value: curInputs.mobile.value, isValid: mobileIsValid},
          gender: {value: curInputs.gender.value, isValid: genderIsValid},
          language: {
            value: curInputs.languagee.value,
            isValid: languageIsValid,
          },
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
    !inputs.mobile.isValid ||
    !inputs.gender.isValid ||
    !inputs.languagee.isValid;
  /////////////////////////Validation////////////////////////////

  /////////////////////////firebase/////////////////////////////

  const handleSubmit = async registerData => {
    try {
      createUserWithEmailAndPassword(
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

  /////////////////////////firebase/////////////////////////////

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
        {!inputs.email.isValid && (
          <Text style={styles.error}>Invalid Email</Text>
        )}

        <Input
          label="Name"
          placeholder="Full Name"
          invalid={!inputs.name.isValid}
          value={inputs.name.value}
          onChangeText={inputChangedHandler.bind(this, 'name')}
        />
        {!inputs.name.isValid && <Text style={styles.error}>Invalid Name</Text>}
        <Input
          label="Mobile Number"
          placeholder="Mobile Number"
          keyboardType="decimal-pad"
          invalid={!inputs.mobile.isValid}
          value={inputs.mobile.value}
          onChangeText={inputChangedHandler.bind(this, 'mobile')}
        />
        {!inputs.mobile.isValid && (
          <Text style={styles.error}>Invalid Mobile Number</Text>
        )}
        <Input
          label="Birth Date"
          placeholder="2002-06-22"
          invalid={!inputs.date.isValid}
          value={inputs.date.value}
          onChangeText={inputChangedHandler.bind(this, 'date')}
          onPress={() => {
            setOpen(true);
          }}
        />
        {/* {console.log(inputs)} */}

        <DatePicker
          modal
          mode="date"
          open={open}
          date={new Date()}
          //title={date}
          onConfirm={value => {
            setOpen(false);
            inputChangedHandler('date', moment(value).format('YYYY-MM-DD'));

            // setDate(
            //   value.getFullYear().toString() +
            //     '-' +
            //     value.getMonth().toString() +
            //     '-' +
            //     value.getDate(date).toString(),
            // );
            // console.log(value);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        {!inputs.date.isValid && <Text style={styles.error}>Invalid Date</Text>}

        <TitleText invalid={!inputs.gender.isValid} label={'Gender'} />
        <View style={{flexDirection: 'row'}}>
          <GenderContainer
            type={'Male'}
            selected={inputs.gender.value === 'Male'}
            onPress={type => {
              inputChangedHandler('gender', type);
            }}
            invalid={!inputs.gender.isValid}
          />

          <GenderContainer
            type={'Female'}
            selected={inputs.gender.value === 'Female'}
            onPress={type => {
              inputChangedHandler('gender', type);
            }}
            invalid={!inputs.gender.isValid}
          />
        </View>
        {!inputs.gender.isValid && (
          <Text style={styles.error}>Invalid Gender</Text>
        )}

        <TitleText
          invalid={!inputs.languagee.isValid}
          label={'Learning Language'}
        />

        <MultiSelectModal
          onPress={language => {
            if (
              selectedLanguage.find(items => {
                items.id == language.id;
              })
            ) {
              setSelectedLanguage(
                selectedLanguage.filter(items => {
                  items.id !== language.id;
                }),
              );
            } else {
              setSelectedLanguage([...selectedLanguage, language]);
            }
          }}
          //selected={selectedLanguage}
          data={language}
          invalid={!inputs.languagee.isValid}
          value={inputs.languagee.value}
        />

        {!inputs.languagee.isValid && (
          <Text style={styles.error}>Invalid Language</Text>
        )}
        <Input
          label={'* Password'}
          placeholder="Enter your Password"
          password
          invalid={!inputs.password.isValid}
          value={inputs.password.value}
          onChangeText={inputChangedHandler.bind(this, 'password')}
        />
        {!inputs.password.isValid && (
          <Text style={styles.error}>Invalid password</Text>
        )}

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
    fontSize: 13,
    marginBottom: 12,
  },
});

export default RegisterScreen;

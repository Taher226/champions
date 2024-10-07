import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {MultiSelect} from 'react-native-element-dropdown';
import 'firebase/auth';
import {
  Button,
  Keyboard,
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
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import Icon from 'react-native-vector-icons/EvilIcons';
import Input from '../components/Input';
import ButtonG from '../components/ButtonG';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {storeData} from '../util/http';

function RegisterScreen({onSubmit, defaultValues}) {
  const [checked, setChecked] = useState(true);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const buttons = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];

  const handleButtonSelected = selectedValues => {
    setSelectedButtons(selectedValues);
  };

  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    email: {
      value: defaultValues ? defaultValues.email : '',
      isValid: true,
    },
    password: {
      value: defaultValues ? defaultValues.password : '',
      isValid: true,
    },
    mobile: {
      value: defaultValues ? defaultValues.mobile : '',
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
      //Alert.alert('Invalid Input', 'Please check your input values');

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

  ////////////////////////Validation 1//////////////////////
  // useEffect(() => {
  //   validateForm();
  // }, [name, email, password, date, mobile, buttons, language]);

  // const validateForm = () => {
  //   let errors = {};

  //   if (!name) {
  //     errors.name = 'Name is required';
  //   }
  //   if (!email) {
  //     errors.email = 'Email is required';
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     errors.email = 'Email is Invalid';
  //   }
  //   if (!password) {
  //     errors.name = 'Name is required';
  //   } else if (password.length < 6) {
  //     errors.password = 'password must be at least 6 characters';
  //   }
  //   if (!date) {
  //     errors.date = 'Date is required';
  //   }
  //   if (!mobile) {
  //     errors.mobile = 'Mobile Number is required';
  //   }
  //   if (!buttons) {
  //     errors.buttons = 'Gender is required';
  //   }
  //   if (!language) {
  //     errors.language = 'Learning Language is required';
  //   }

  //   setErrors(errors);
  //   setIsFormValid(Object.keys(errors).length === 0);
  // };

  ////////////////////////Validation1//////////////////////

  ////////////////////////Validation 2//////////////////////
  //Before Register Function

  //  const SignupSchema = Yup.object().shape({
  //   name: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required('Enter your Full Name'),

  //   email: Yup.string().email('Invalid email').required('Required'),
  // });
  //After Return
  //  <Formik
  //  initialValues={{
  //    email: '',
  //    name: '',
  //    mobile: '',
  //    birthDate: '',
  //    Gender: '',
  //    language: '',
  //    password: '',
  //  }}
  //  validationSchema={SignupSchema}>
  //  {({
  //    values,
  //    errors,
  //    touched,
  //    handleChange,
  //    setFieldTouched,
  //    isValid,
  //    handleSubmit,
  //  }) => { ALL RETURN HERE }}
  // </Formik>
  ////////////////////////Validation2//////////////////////

  //////////////////////firebase///////////////////////////

  const handleSubmit = async registerData => {
    //if (isFormValid) {

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
  //console.log('form submitted successfully!');
  // } else {
  //   console.log('Form has errors. Please correct them.');
  // }

  ///////////////////////////firebase//////////////////////

  return (
    <ScrollView>
      <View style={styles.fullContainer}>
        <Input
          label="* Email"
          placeholder="Enter your Email"
          invalid={!inputs.email.isValid}
          //error={'Input Email'}
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
          // onPress={() => setOpen(true)}
        />

        {/* <DatePicker
          modal
          mode="date"
          open={open}
          date={new Date()}
          //title={date}
          onConfirm={value => {
            setOpen(false);
            setDate(
              value.getFullYear().toString() +
                '-' +
                value.getMonth().toString() +
                '-' +
                value.getDate(date).toString(),
            );

            console.log(value);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */}

        <Text style={[styles.text, {marginBottom: 3}]}>Gender</Text>
        <ButtonMultiselect
          layout={ButtonLayout.FULL_WIDTH} // Choose from ButtonLayout enum: CAROUSEL, FULL_WIDTH, GRID
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
          // Additional props can be customized as needed
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

        <ButtonG
          title={'Register'}
          onPress={validateHandler}
          // disabled={!isFormValid}
        />
        {/* {Object.values(errors).map((error, index) => (
          <Text key={index} style={styles.error}>
            {error}
          </Text>
        ))} */}
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

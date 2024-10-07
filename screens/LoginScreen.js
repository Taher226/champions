import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';

function LoginScreen({id}) {
  const navigation = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  function registerNavigate() {
    navigation.navigate('RegisterScreen', {screenId: id});
  }
  function welcomeNavigate() {
    navigation.navigate('WelcomeScreen', {screenId: id});
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log('got error: ', err.message);
        Alert.alert('Error Here !!!!');
      }
    }
  };

  return (
    <View style={styles.fullContainer}>
      <View>
        <Image
          source={require('../assets/images/championsLogo.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Login By Email</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder=" Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder=" Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isSecureEntry}
        />

        {/*  <Icon name="eye-outline" size={20} color={'black'} /> */}
      </View>
      <Pressable style={({pressed}) => (pressed ? styles.pressed : null)}>
        <Text style={styles.forget}>Forget Password ?</Text>
      </Pressable>
      <Pressable
        onPress={handleSubmit}
        style={({pressed}) => (pressed ? styles.pressed : null)}>
        <View style={styles.buttonContainer}>
          <Text style={styles.button}>Login</Text>
        </View>
      </Pressable>

      <Text style={styles.regText}>You don't have an account ?</Text>

      <Pressable
        onPress={registerNavigate}
        style={({pressed}) => (pressed ? styles.pressed : null)}>
        <View style={styles.regContainer}>
          <Text style={styles.regButton}>Create New Account</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  image: {
    marginLeft: 10,
    marginVertical: 30,
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 100,
    width: '100%',
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 16,
    elevation: 1,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  pressed: {
    opacity: 0.5,
  },
  forget: {
    marginLeft: 230,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 30,
    backgroundColor: '#07b2bc',
    borderRadius: 20,
    minWidth: 300,
    alignItems: 'center',
  },
  button: {
    margin: 10,
    fontSize: 16,
    color: 'white',
  },

  regText: {
    paddingTop: 60,
    fontSize: 15,
    // fontWeight: 'bold',
    color: 'black',
  },
  regContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#dfbc59',
    borderRadius: 20,
    minWidth: 300,
    alignItems: 'center',
  },
  regButton: {
    color: '#dfbc59',
    margin: 10,
    fontSize: 16,
  },
});

export default LoginScreen;

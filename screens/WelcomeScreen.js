import {signOut} from 'firebase/auth';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {auth} from '../config/firebase';

function WelcomeScreen() {
  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <View style={styles.fullContainer}>
      <Image
        source={require('../assets/images/championsLogo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Welcome To Champions</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={({pressed}) => (pressed ? styles.pressed : null)}>
        <View style={styles.buttonContainer}>
          <Text style={styles.button}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'red',
  },
  pressed: {
    opacity: 0.5,
  },
  buttonContainer: {
    marginTop: 50,
    backgroundColor: 'red',
    borderRadius: 20,
    //minWidth: 200,
    width: 100,
    alignItems: 'center',
  },
  button: {
    margin: 10,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;

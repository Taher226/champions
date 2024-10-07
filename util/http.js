import axios from 'axios';

export function storeData(registerData) {
  axios.post(
    'https://react-native-course-b5a15-default-rtdb.firebaseio.com/register.json',
    registerData,
  );
}

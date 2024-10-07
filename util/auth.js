import axios from 'axios';

const API_KEY = 'AIzaSyCDJGya8X3VuMJVVDXFiDKHXxmh6olmmeE';

export async function createUser(email, password) {
  await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    },
  );
}

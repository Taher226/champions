import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TeacherList from '../components/TeacherList';
import {SearchBar} from 'react-native-screens';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {TEACHERS} from '../data/teachersData';
import TeacherItem from '../components/TeacherItem';

function WelcomeScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          alignSelf: 'center',
          borderRadius: 15,
          elevation: 1,
          paddingHorizontal: 4,
          top: 4,
        }}>
        <Icon name="search-outline" size={20} style={{alignSelf: 'center'}} />
        <TextInput
          placeholder="Search..."
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchText}
          onChangeText={setSearchText}
          style={{
            borderRadius: 15,
            paddingVertical: 5,
            width: '80%',
          }}
        />
        <View
          style={{
            backgroundColor: '#e2e6ef',
            height: '98%',
            width: '9%',
            borderRadius: 10,
            left: 3,
          }}>
          <Pressable>
            <Image
              source={require('../assets/icons/filter.png')}
              style={{
                height: 18,
                width: 18,
                tintColor: '#00a293',
                top: 10,
                left: 9,
              }}
            />
          </Pressable>
        </View>
      </View>
      <TeacherList searchName={searchText} />
      {/* <FlatList
        data={TEACHERS}
        keyExtractor={item => item.id}
        renderItem={renderTeacherItem}
      /> */}
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

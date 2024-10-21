import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import {width} from '../consts/consts';

function TeacherItem({
  name,
  type,
  category,
  languages,
  numOfSessions,
  imageUrl,
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '900',
              color: 'black',
              padding: 10,
            }}>
            {name}
          </Text>
          <View
            style={{
              backgroundColor: type == 'Mentor' ? '#06aab4' : 'red',
              padding: 3,
              height: '60%',
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
                paddingHorizontal: 10,
              }}>
              {type}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={imageUrl} style={styles.image} />
          <View style={{width: width * 0.6}}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 15,
                color: '#13b3a3',
                paddingVertical: 8,
                fontWeight: 'bold',
                marginHorizontal: 5,
              }}>
              {category}
            </Text>
            <View style={{flexDirection: 'row'}}>
              {languages.map(language => {
                return (
                  <View
                    key={language.id}
                    style={{
                      backgroundColor: language == 'Arabic' ? '#06aab4' : 'red',
                      borderRadius: 7,
                      marginHorizontal: 5,
                      padding: 4,
                      paddingHorizontal: 7,
                      //width: '25%',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'white',
                        //padding: 4,
                        textAlign: 'center',
                      }}>
                      {language}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                backgroundColor: '#e9fbfb',

                borderRadius: 8,
                //width: '100%',
                marginVertical: 15,
                marginHorizontal: 5,
                padding: 2,
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
                  color: '#4ea5a5',
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                {numOfSessions} Sessions Available
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 13,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 2,
  },

  image: {
    marginHorizontal: 5,
    //width: '35%',
    height: '97%',
    borderRadius: 25,
    //flex: 0.5,
    maxWidth: width * 0.3,
    minWidth: width * 0.2,
  },
});
export default TeacherItem;

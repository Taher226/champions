import {TouchableOpacity, View, StyleSheet, Image, Text} from 'react-native';

function TeacherItem({
  name,
  type,
  category,
  languages,
  numOfSessions,
  imageUrl,
}) {
  return (
    <View style={styles.Item}>
      <TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
              padding: 10,
            }}>
            {name}
          </Text>
          <View
            style={{
              backgroundColor: type == 'Mentor' ? '#06aab4' : 'red',
              //borderRadius: 7,
              padding: 3,
              height: '60%',
              // margin: 5,
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
          <Image
            source={imageUrl} // need to be fixed
            style={styles.image}
          />
          <View>
            <Text
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
                    style={{
                      backgroundColor: language == 'Arabic' ? '#06aab4' : 'red',
                      borderRadius: 7,
                      marginHorizontal: 5,
                      width: '25%',
                    }}>
                    <Text
                      key={language.id}
                      style={{
                        fontSize: 10,
                        color: 'white',
                        padding: 4,
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
                width: '100%',
                marginVertical: 15,
                marginHorizontal: 5,
              }}>
              <Text style={{color: '#4ea5a5', padding: 1, fontSize: 12}}>
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
  Item: {
    margin: 13,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 4,
  },

  image: {
    marginHorizontal: 5,
    width: '35%',
    height: '97%',
    borderRadius: 25,
  },
});
export default TeacherItem;

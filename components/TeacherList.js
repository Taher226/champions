import {FlatList, Text, View, TextInput, Pressable, Image} from 'react-native';
import {TEACHERS} from '../data/teachersData';
import TeacherItem from './TeacherItem';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';

const TeacherList = ({searchName}) => {
  const showData = () => {
    let x = TEACHERS.filter(teacher =>
      teacher.name.toLowerCase().includes(searchName.toLowerCase()),
    );
    if (x.length > 0) return x;
    else return TEACHERS;
  };

  const renderTeacherItem = itemData => {
    // if (searchName === '') {
    return (
      <TeacherItem
        name={itemData.item.name}
        type={itemData.item.type}
        category={itemData.item.category}
        numOfSessions={itemData.item.numberOfSessions}
        languages={itemData.item.languages}
        imageUrl={itemData.item.imageUrl}
      />
    );
  };
  //   if (itemData.item.name.includes(searchText)) {
  //     return (
  //       <TeacherItem
  //         name={itemData.item.name}
  //         type={itemData.item.type}
  //         category={itemData.item.category}
  //         numOfSessions={itemData.item.numberOfSessions}
  //         languages={itemData.item.languages}
  //         imageUrl={itemData.item.imageUrl}
  //       />
  //     );
  //   }
  // };

  return (
    <View>
      <FlatList
        data={showData()}
        keyExtractor={item => item.id}
        renderItem={renderTeacherItem}
      />
    </View>
  );
};
export default TeacherList;

// () => (
//   <TeacherItem
//     name={TEACHERS[0].name}
//     type={TEACHERS[0].type}
//     //imageUrl="../assets/images/default.png"
//     category={TEACHERS[0].category}
//     languages={TEACHERS[0].languages.map((item, index) => (
//       <Text key={index}>{item}</Text>
//     ))}
//     numOfSessions={0}
//     mentorStyle={{
//       backgroundColor: '#06aab4',
//       borderRadius: 7,
//       padding: 3,
//       margin: 5,
//     }}
//     languageStyle={{
//       backgroundColor: '#06aab4',
//       borderRadius: 7,
//       width: '27%',
//     }}
//   />
// )

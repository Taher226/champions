import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MultiSelectModal = ({invalid, value, data, onPress}) => {
  let boxStyles = [styles.box];

  if (invalid) {
    boxStyles.push(styles.invalidBox);
  }
  const [imageSrc, setImageSrc] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [selected, setSelected] = useState([]);
  // Store selected items
  // const [data, setData] = useState([
  //   {id: 1, label: 'English'},
  //   {id: 2, label: 'French'},
  //   {id: 3, label: 'Spanish'},
  //   {id: 4, label: 'Turkish'},
  //   {id: 5, label: 'German'},
  //   {id: 6, label: 'Dutch'},
  // ]);
  const handleSelected = item => {
    console.log(item);

    if (selected.find(d => d.id == item.id)) {
      console.log('1');

      setSelected(selected.filter(d => d.id !== item.id));
    } else {
      console.log('2');

      setSelected([...selected, item]);
    }
  };
  function ImageHandler() {
    setImageSrc(!imageSrc);
  }
  // Function to handle checkbox toggle
  const toggleSelection = item => {
    console.log('check');

    const updatedData = data.map(el =>
      el.id === item.id ? {...el, isChecked: !el.isChecked} : el,
    );
    setData(updatedData);

    // Update selected items state
    const selected = updatedData.filter(el => el.isChecked);
    setSelectedItems(selected);
  };

  return (
    <View style={styles.container}>
      {/* Button to open modal */}
      <TouchableOpacity style={boxStyles} onPress={() => setModalVisible(true)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 16,
              marginLeft: 10,
            }}>
            Kindly choose the language
          </Text>
          <Icon name={'chevron-down-outline'} size={22} style={styles.icon} />
        </View>
      </TouchableOpacity>

      {/* Modal component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Languages</Text>

            {/* FlatList to render multiple options */}
            <FlatList
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View style={styles.itemContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      onPress(item);
                      handleSelected(item);
                      console.log(selected, item);
                    }}>
                    <Image
                      style={styles.image}
                      tintColor={'#07b2bc'}
                      source={
                        selected.find(x => x.id == item.id)
                          ? require('../assets/icons/check-mark.png')
                          : require('../assets/icons/radio.png')
                      }
                    />
                  </TouchableOpacity>

                  {/* <Checkbox
                    value={item.isChecked}
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                      toggleSelection(item);
                    }}
                  /> */}
                  <Text style={styles.itemLabel}>{item.label}</Text>
                </View>
              )}
            />

            {/* Confirm and Close Modal */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Selected items */}
      {selected.length > 0 && (
        <View style={{flexDirection: 'row'}}>
          {selected.map((item, index) => (
            <View //setSelected item here
              key={item.id}
              style={[
                styles.selectedLang,
                {
                  marginHorizontal: index == 0 ? 0 : 10,
                },
              ]}>
              <Text style={styles.selectedLangText}>{item?.label}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    //marginTop: height * 0.55,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    //paddingHorizontal: 70,
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '100%',

    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#07b2bc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  selectedLang: {
    borderRadius: 15,

    backgroundColor: '#07b2bc',
    padding: 7,

    marginVertical: 3,
  },
  selectedLangText: {
    fontSize: 15,
    color: 'white',
  },
  image: {
    width: 20,
    height: 20,
  },
  box: {
    elevation: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  invalidBox: {
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default MultiSelectModal;

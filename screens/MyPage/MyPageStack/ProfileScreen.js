import React, {useState} from 'react';
import {View, Text, Alert, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({navigation, myInfoData}) => {
  const [imageSource, setImageSource] = useState('');

  const options = {
    title: '프로필 변경',
    cancelButtonTitle: '취소',
    takePhotoButtonTitle: '사진 찍기',
    chooseFromLibraryButtonTitle: '앨범에서 선택',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const showImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setImageSource(response.uri);
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: '#cccccc',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('유저정보');
          }}>
          <Text style={{fontFamily: 'AntDesign'}}>닫기</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 16, fontFamily: 'AntDesign'}}>프로필 설정</Text>
        <Text style={{fontFamily: 'AntDesign'}}>완료</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={showImagePicker}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 5,
              width: 22,
              height: 22,
              backgroundColor: '#fff',
              opacity: 0.8,
              zIndex: 1,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#c0c0c0',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Ionicons name="camera" size={16} color='gray'/>
          </View>
          {imageSource === '' ? (
            <Image
              source={require('../../../images/1.png')}
              style={{width: 100, height: 100, borderRadius: 100}}
            />
          ) : (
            <Image
              source={{uri: imageSource}}
              style={{width: 100, height: 100, borderRadius: 100}}
            />
          )}
        </TouchableOpacity>
        <View style={{marginVertical: 20}}>
          <Text>
            {' '}
            {myInfoData.nickname} {myInfoData.age} {myInfoData.department}{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

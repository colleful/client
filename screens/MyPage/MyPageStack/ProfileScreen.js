import React, {useState} from 'react';
import {View, Text, Alert, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {css} from '@emotion/native';

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
    <View style={css`flex: 1; background-color: #fff`}>
      <View
        style={css`
          flex-direction: row;
          align-items: center;
          padding: 10px;
          justify-content: space-between;
          border-bottom-width: 1px;
          border-color: #cccccc;
          margin-bottom: 20px;
        `}>
        <TouchableOpacity
          onPress={() => navigation.navigate('유저정보')}>
          <Text style={css`font-family: AntDesign`}>닫기</Text>
        </TouchableOpacity>
        <Text style={css`font-size: 16px; font-family: AntDesign`}>프로필 설정</Text>
        <Text style={css`font-family: AntDesign`}>완료</Text>
      </View>
      <View style={css`align-items: center`}>
        <TouchableOpacity onPress={showImagePicker}>
          <View
            style={css`
              position: absolute;
              bottom: 0;
              right: 5px;
              width: 22px;
              height: 22px;
              background-color: #fff;
              opacity: 0.8;
              z-index: 1;
              border-radius: 100px;
              border-width: 1px;
              border-color: #c0c0c0;
              justify-content: center;
              align-items: center
            `}>
            <Ionicons name="camera" size={16} color='gray'/>
          </View>
          {imageSource === '' ? (
            <Image
              source={require('../../../images/1.png')}
              style={css`width: 100px; height: 100px; border-radius: 100px`}
            />
          ) : (
            <Image
              source={{uri: imageSource}}
              style={css`width: 100px; height: 100px; border-radius: 100px`}
            />
          )}
        </TouchableOpacity>
        <View style={css`margin-vertical: 20px`}>
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

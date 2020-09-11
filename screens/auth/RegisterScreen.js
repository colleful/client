import React,{useState,useEffect} from 'react';
import {View, ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {Config} from '../../Config';

//여긴 가독성이 너무 심하게 떨어져서 prettier 일단 적용 안했음. 어차피 디자인 바뀌면 inline-style 다 바꿀 예정이라

const RegisterScreen = ({navigation,form,getDepartmentId,getGender,getBirthYear,onSendAuthEmail, onCreateAddress, onChangeEmail, onChangePassword, onChangePasswordConfirm, onChangeNickname, onChangeBirthYear, onChangeGender, onChangeDepartmentId, onChangeSelfIntroduction,onChangeCode,onConfirmAuthEmail, onSubmitRegister, error}) => {
  let today = new Date().getFullYear();
  let yearData = [];
  let collegeList = [];
  for(var i=today-20; i>=today-30; i--){
    yearData.push(String(i));
  }
  const [visible, setVisible] = useState(true);
  const [selectedDid, setSelectedDid] = useState({ //Did => DepartmentId
    item: ''
  });
  const [selectedGender, setSelectedGender] = useState({
    item: ''
  })
  const [selectedBirthYear, setSelectedBirthYear] = useState({
    item: ''
  })
  const [selectedCollege, setSelectedCollege] = useState({
    item: ''
  })
  const [collegeData, setCollegeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [birthYearData, setBirthYearData] = useState(yearData)
  
  const getDepartments = async () => {
    try {
      const response = await axios.get(`${Config.baseUrl}/api/departments`);
      setDepartmentData(response.data);
      collegeList = [...new Set(response.data.map(datas => datas.collegeName))];
      setCollegeData(collegeList);
    } catch (error) {
      console.log(error);
    }
  }
  const visibleText = () => {
    setVisible(!visible);
  }
  const addToBehindText = (e) => {
    onCreateAddress(`${e.nativeEvent.text}@jbnu.ac.kr`)
    // onCreateAddress(e.nativeEvent.text) 
  }
  useEffect(() => {
    getDepartments();
  },[])

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{justifyContent: "center", alignItems: "center", marginTop: 20}}>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <TextInput
            placeholder="학교 웹메일 입력"
            placeholderTextColor="black"
            style={{ backgroundColor:"#ccc", borderRadius:5, opacity:0.5, width: 180, paddingLeft:10, marginLeft: 10, marginRight: 10 }}
            value={form.email}
            onChange={onChangeEmail}
            onEndEditing={addToBehindText}
          />
          <TouchableOpacity
            onPress={onSendAuthEmail}
            style={{
              backgroundColor: '#cdc',
              opacity: 0.5,
              borderRadius:5,
              padding: 15,
              paddingVertical: 10,
              width: 104
            }}>
            <Text>인증번호 발송</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", alignItems: "center", marginVertical:15 }}>
          <TextInput
            placeholder="인증번호 입력"
            style={{ width: 100,height:40, paddingLeft:10, marginRight: 20, borderBottomWidth:1, borderBottomColor: 'gray'}}
            value={form.code}
            onChange={onChangeCode}
          />
          <TouchableOpacity
            onPress={onConfirmAuthEmail}
            style={{
              backgroundColor: '#cdc',
              opacity: 0.5,
              borderRadius:5,
              padding: 15,
              paddingVertical: 10,
              width: 80
            }}>
            <Text>인증하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flexDirection: 'row',justifyContent: "center", alignItems: "center", marginTop: 10}}>
        <TextInput
          placeholder="비밀번호"
          placeholderTextColor="black"
          style={{ backgroundColor:"#ccc", borderRadius:5, opacity:0.5, width: 220, paddingLeft:10, marginHorizontal: 10}}
          value={form.password}
          secureTextEntry={visible}
          onChange={onChangePassword}
        />
        {visible ? 
        <Ionicons name="eye-off-outline" size={20} onPress={visibleText} /> 
        : <Ionicons name="eye-outline" size={20} onPress={visibleText} />}
      </View>

      <View style={{flexDirection: 'row',justifyContent: "center", alignItems: "center", marginTop: 10}}>
        <TextInput
          placeholder="비밀번호 확인"
          placeholderTextColor="black"
          style={{ backgroundColor:"#ccc", borderRadius:5, opacity:0.5, width: 250, paddingLeft:10, marginLeft: 10}}
          value={form.passwordConfirm}
          secureTextEntry={visible}
          onChange={onChangePasswordConfirm}
        />
      </View>

      <View style={{flexDirection: 'row',justifyContent: "center", alignItems: "center", marginTop: 10}}>
        <TextInput
          placeholder="닉네임"
          placeholderTextColor="black"
          style={{ backgroundColor:"#ccc", borderRadius:5, opacity:0.5, width: 250, paddingLeft:10, marginLeft: 10}}
          value={form.nickname}
          onChange={onChangeNickname}
        />
      </View>

      <View style={{alignItems:"center"}}>
        <Picker
          selectedValue={selectedBirthYear.item}
          style={{ height: 50, width: 250}}
          onValueChange={(itemValue, itemIndex) => { 
            setSelectedBirthYear({item: itemValue}); 
            getBirthYear(selectedBirthYear.item); 
          }}
          mode="dropdown"
          >
          <Picker.Item label="출생연도" />
          {birthYearData.map((datas) => {
            return (
              <Picker.Item
                label={datas}
                value={datas}
                key={datas}
              />
            );
          })}
        </Picker>
      </View>

      <View style={{alignItems:"center"}}>
        <Picker
          selectedValue={selectedCollege.item}
          style={{ height: 50, width: 250}}
          onValueChange={(itemValue, itemIndex) => { 
            setSelectedCollege({item: itemValue}); 
            setFilteredData(departmentData.filter(datas => datas.collegeName === selectedCollege.item)) 
          }}
          mode="dropdown"
          >
          <Picker.Item label="단과대학" />
          {collegeData.map((datas) => {
            return (
              <Picker.Item
              label={datas}
              value={datas}
              key={datas}
              />
              );
            })}
        </Picker>
      </View>

      <View style={{alignItems:"center"}}>
        <Picker
          selectedValue={selectedDid.item}
          style={{ height: 50, width: 250}}
          onValueChange={(itemValue, itemIndex) => { 
            setSelectedDid({item: itemValue}); 
            getDepartmentId(selectedDid.item); 
          }}
          mode="dropdown"
          >
          {selectedCollege.item ? <Picker.Item label="소속학과 선택" /> : <Picker.Item label="단과대학 먼저 선택해주세요" /> }
          {filteredData.map((datas) => {
            return (
              <Picker.Item
              label={datas.departmentName}
              value={datas.id}
              key={datas.id}
              />
              );
            })}
        </Picker>
      </View>

      <View style={{alignItems:"center"}}>
        <Picker
          selectedValue={selectedGender.item}
          style={{ height: 50, width: 250}}
          onValueChange={(itemValue, itemIndex) => { 
            setSelectedGender({item: itemValue}); 
            getGender(selectedGender.item); 
          }}
          mode="dropdown"
          >
          <Picker.Item label="성별" />
          <Picker.Item label="남자" value="남자" />
          <Picker.Item label="여자" value="여자" />
        </Picker>
      </View>

      <View style={{flexDirection: 'row',justifyContent: "center", alignItems: "center", marginTop: 10}}>
        <TextInput
          placeholder="자기소개"
          placeholderTextColor="black"
          multiline
          textAlignVertical={"top"}
          style={{ backgroundColor:"#ccc", borderRadius:5, opacity:0.5, width: 250, height: 100, paddingLeft:10, marginLeft: 10}}
          value={form.selfIntroduction}
          onChange={onChangeSelfIntroduction}
        />
      </View>
      <View style={{flexDirection: 'row',justifyContent: "center", alignItems: "center", marginTop: 10}}>
        <TouchableOpacity
          onPress={onSubmitRegister}
          style={{
            marginVertical:15,
            backgroundColor: '#cdc',
            opacity: 0.5,
            borderRadius:5,
            padding: 15,
            paddingVertical: 10,
            width: 80,
          }}>
          <Text>회원가입</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

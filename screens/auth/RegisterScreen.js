import React,{useState, useEffect, useCallback, useRef} from 'react';
import {View, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import loading from "../../modules/loading";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-community/picker';
import * as authAPI from '../../lib/api';
import { useForm, Controller } from 'react-hook-form';

//여긴 가독성이 너무 심하게 떨어져서 prettier 일단 적용 안했음. 어차피 디자인 바뀌면 inline-style 다 바꿀 예정이라
const RegisterScreen = ({form,getDepartmentId,getGender,getBirthYear,onSendAuthEmail, onCreateAddress, onChangeEmail, onChangePassword, onChangePasswordConfirm, onChangeNickname, onChangeSelfIntroduction,onChangeCode,onConfirmAuthEmail, onSubmitRegister, error}) => {
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
  const [birthYearData, setBirthYearData] = useState([]);

  const getDepartments = async () => {
    try {
      const response = await authAPI.getDepartment();
      setDepartmentData(response.data);
      let collegeList = [...new Set(response.data.map(datas => datas.collegeName))];
      console.log(collegeList);
      setCollegeData(collegeList);
    } catch (error) {
      console.log(error);
    }
  }
  const visibleText = () => {
    setVisible(!visible);
  }
  const addToBehindText = (e) => {
    onCreateAddress(
      e.nativeEvent.text.includes('@')
        ? e.nativeEvent.text
        : `${e.nativeEvent.text}@jbnu.ac.kr`,
    );
    // onCreateAddress(e.nativeEvent.text)
  }
  useEffect(() => {
    getDepartments();
    setYearData();
  },[])
  
  const setYearData = useCallback(() => {
    let today = new Date().getFullYear();
    let yearData = [];
    for(let i=today-20; i>=today-30; i--){
      yearData.push(String(i));
    }
    setBirthYearData(yearData);
  },[])

  const {isLoading} = useSelector(({loading}) => ({
    isLoading: loading.isLoading
  }));

  const { control, handleSubmit, watch, trigger, errors } = useForm(); // useForm({ mode: "onChange"});
  const onSubmit = data => console.log(data);

  const password = useRef();
  password.current = watch("password");

  return (
    <>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.5,
            backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <ScrollView style={{flex: 1}}>
        <View style={{justifyContent: "center", alignItems: "center", marginTop: 20}}>
          <View style={{ alignItems:"center"}}>
            <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>이메일</Text>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <TextInput
                  name="email"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={form.email, value}
                  onChange={onChangeEmail}
                  onEndEditing={addToBehindText}
                />
              )}
              name="email"
              rules={{required: true, pattern: /^\S+@\S+$/i }}
              defaultValue=""
            />
            {errors.email && errors.email.type === "required" && (<Text style={{
              color: '#f54260', alignSelf:'flex-start', marginBottom: 10}}>이메일을 입력해 주세요</Text>
            )}
            {errors.email && errors.email.type === "pattern" && (<Text style={{
              color: '#f54260', alignSelf:'flex-start', marginBottom: 10}}>이메일 형식에 맞게 작성 해주세요</Text>
            )}
            
            <TouchableOpacity onPress={onSendAuthEmail} style={styles.button}>
              <Text style={{color:'white', textAlign:'center'}}>
                인증메일 전송
              </Text>
            </TouchableOpacity>

            <View style={{marginBottom:15}} />

            <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>인증번호</Text>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <TextInput
                  name="mailAuth"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={form.code, value}
                  onChange={onChangeCode}
                />
              )}
              name="mailAuth"
              rules={{required: true, pattern: /^[0-9]/g }}
              defaultValue=""
            />
            {errors.mailAuth && errors.mailAuth.type === "required" && (<Text style={{
              color: '#f54260', alignSelf:'flex-start', marginBottom: 10}}>인증번호를 입력 해주세요</Text>
            )}
            {errors.mailAuth && errors.mailAuth.type === "pattern" && (<Text style={{
              color: '#f54260', alignSelf:'flex-start', marginBottom: 10}}>숫자만 입력해주세요</Text>
            )}
            <TouchableOpacity onPress={onConfirmAuthEmail} style={styles.button}>
              <Text style={{color:'white', textAlign:'center'}}>
                인증하기
              </Text>
            </TouchableOpacity>

            <View style={{marginBottom:15}} />
            
            <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>비밀번호</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}> 
              <Controller
                control={control}
                render={({value, onBlur, onChange}) => (
                  <TextInput
                    name="password"
                    style={[styles.input, {marginLeft: -10}]}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={form.password, value}
                    secureTextEntry={visible}
                    onChange={onChangePassword}
                  />
                )}
                name="password"
                rules={{required: true}}
                defaultValue=""
              />
              <View style={{marginRight:-30}} />
              {visible ? 
                <Ionicons name="eye-off-outline" size={20} onPress={visibleText} /> 
                : <Ionicons name="eye-outline" size={20} onPress={visibleText} />}
            </View>
            {errors.password && <Text style={{color: '#f54260', alignSelf:'flex-start', marginBottom: 10}}>비밀번호를 입력해 주세요</Text>}

            <View style={{marginBottom:10}} />

            <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>비밀번호확인</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}> 
              <Controller
                control={control}
                render={({value, onBlur, onChange}) => (
                  <TextInput
                    name="passwordConfirm"
                    style={[styles.input, {marginLeft: -10}]}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={form.passwordConfirm, value}
                    secureTextEntry={visible}
                    onChange={onChangePasswordConfirm}
                  />
                )}
                name="passwordConfirm"
                rules={{required: true}}
                defaultValue=""
              />
              <View style={{marginRight:-30}} />
              {visible ? 
                <Ionicons name="eye-off-outline" size={20} onPress={visibleText} /> 
                : <Ionicons name="eye-outline" size={20} onPress={visibleText} />}
            </View>
            {errors.passwordConfirm && <Text style={{color: '#f54260', alignSelf:'flex-start', marginBottom: 10}}>비밀번호를 입력해 주세요</Text>}

            <View style={{marginBottom:15}} />

            <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>닉네임</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}> 
              <Controller
                control={control}
                render={({value, onBlur, onChange}) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={form.nickname, value}
                    onChange={onChangeNickname}
                  />
                )}
                name="nickname"
                rules={{required: true, maxLength: 10}}
                defaultValue=""
              />
            </View>
            {errors.nickname && errors.nickname.type === "required" && (<Text style={{
              color: '#f54260', alignSelf:'flex-start', marginBottom: 10}}>닉네임을 입력 해주세요</Text>
            )}
            {errors.nickname && errors.nickname.type === "maxLength" && (<Text style={{
              color: '#f54260', alignSelf:'flex-start', marginBottom: 10}}>닉네임은 최대 10자까지 가능합니다</Text>
            )}

            <View style={{marginBottom:15}} />      
          
            <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>출생연도</Text>

            <Picker
              selectedValue={selectedBirthYear.item}
              style={{ height: 50, width: 200}}
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

            <View style={{marginBottom:15}} />  
            <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>소속학과</Text>

            <Picker
              selectedValue={selectedCollege.item}
              style={{ height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => { 
                setSelectedCollege({item: itemValue}); 
                setFilteredData(departmentData.filter(datas => datas.collegeName === selectedCollege.item));
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

            <Picker
              selectedValue={selectedDid.item}
              style={{ height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => { 
                setSelectedDid({item: itemValue}); 
                getDepartmentId(selectedDid.item);
              }}
              mode="dropdown"
              >
              {selectedCollege.item ? <Picker.Item label="소속학과 선택" /> : <Picker.Item label="단과대 먼저 선택" /> }
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

            <View style={{marginBottom:15}} />  
            <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>성별</Text>

            <Picker
              selectedValue={selectedGender.item}
              style={{ height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => { 
                setSelectedGender({item: itemValue}); 
                getGender(selectedGender.item); 
              }}
              mode="dialog"
              >
              <Picker.Item label="성별" />
              <Picker.Item label="남자" value="MALE" />
              <Picker.Item label="여자" value="FEMALE" />
            </Picker>

            <View style={{marginBottom:15}} />  

            <Text style={{alignSelf: 'flex-start', marginBottom: 5}}>자기소개</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}> 
              <Controller
                control={control}
                render={({value, onBlur, onChange}) => (
                  <TextInput
                    name="selfIntroduction"  
                    style={styles.textArea}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={form.selfIntroduction, value}
                    onChange={onChangeSelfIntroduction}
                    textAlignVertical={"top"}
                    multiline
                  />
                )}
                name="selfIntroduction"
                rules={{required: true}}
                defaultValue=""
              />
            </View>
            {errors.selfIntroduction && (<Text style={{
              color: '#f54260', alignSelf:'flex-start', marginBottom: 10}}>닉네임을 입력 해주세요</Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {trigger(); handleSubmit(onSubmit); onSubmitRegister()}}
            style={styles.button}>
            <Text style={{color:'white', textAlign:'center' }}>
              🎉회원가입🎉
            </Text>
          </TouchableOpacity> 

          <View style={{marginBottom:20}} />

        </View>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({  
  input: {
    width: 200,
    borderWidth: 0.5,
    height: 40,
    padding: 10,
    marginBottom: 5,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#ec5990',
    borderRadius: 10,
    width: 200,
    paddingVertical: 10,
    borderRadius: 4,
    opacity: 0.8,
    marginVertical: 5
  },
  textArea: {
    width: 200, 
    borderWidth: 0.5,
    height: 100,
    padding: 10,
    marginBottom: 5,
    borderRadius: 4,
  }
});
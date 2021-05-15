import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-community/picker';
import {css} from '@emotion/native';
import * as authAPI from '../../../lib/api';
import {useForm, Controller} from 'react-hook-form';
import LoadingScreen from '../../../components/LoadingScreen';
import {RegisterWrapper, RegisterForm} from './style';
import {
  InputForm_title,
  InputForm_container__borderWidth05,
  InputForm_input,
  InputForm_inputWithIcon,
  InputForm_errorMessage,
  InputForm_button,
  InputForm_buttonText,
  InputForm_pickerContainer,
} from '../../../assets/css/InputForm';

const RegisterScreen = ({
  getDepartmentId,
  getGender,
  getBirthYear,
  onSendAuthEmail,
  onCreateAddress,
  onChangeEmail,
  onChangePassword,
  onChangePasswordConfirm,
  onChangeNickname,
  onChangeSelfIntroduction,
  onChangeCode,
  onConfirmAuthEmail,
  onSubmitRegister,
}) => {
  const [visible, setVisible] = useState(true);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState({});
  const [selectedGender, setSelectedGender] = useState({});
  const [selectedBirthYear, setSelectedBirthYear] = useState({});
  const [selectedCollege, setSelectedCollege] = useState({});
  const [collegeData, setCollegeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const {
    form,
    authLoading,
    emailAuthLoading,
    confirmEmailLoading,
  } = useSelector(({auth}) => ({
    form: auth.register,
    ...auth,
  }));

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    try {
      const response = await authAPI.getDepartment();
      setDepartmentData(response.data);
      let collegeList = [
        ...new Set(response.data.map((datas) => datas.collegeName)),
      ];
      console.log(collegeList);
      setCollegeData(collegeList);
    } catch (error) {
      console.log(error);
    }
  };
  const visibleText = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const addToBehindText = (e) => {
    onCreateAddress(
      e.nativeEvent.text.includes('@')
        ? e.nativeEvent.text
        : `${e.nativeEvent.text}@jbnu.ac.kr`,
    );
    // onCreateAddress(e.nativeEvent.text)
  };

  const today = useRef(new Date().getFullYear()).current;
  const yearData = useRef([]).current;

  const setYearData = (today, yearData) => {
    for (let i = today - 20; i >= today - 30; i--) {
      yearData.push(String(i));
    }
    return yearData;
  };

  const yearList = useMemo(() => setYearData(today, yearData), [
    today,
    yearData,
  ]);

  const registerHandler = useCallback(() => {
    trigger();
    handleSubmit(onSubmit);
    onSubmitRegister();
  }, [trigger, handleSubmit, onSubmitRegister]);

  const {control, handleSubmit, watch, trigger, errors} = useForm({
    mode: 'onChange',
  });
  const onSubmit = (data) => console.log(data);

  const password = useRef();
  password.current = watch('password');

  /**
   * 리렌더링이 발생하는 곳은 picker, 이유는 onValueChange에서 함수를 계속 재생성해서 리렌더링이 발생함
   */

  // const count = useRef(0);
  // console.log(`회원가입 렌더링횟수: ${count.current++}`);

  return (
    <>
      <RegisterWrapper>
        <RegisterForm>
          <InputForm_title>이메일</InputForm_title>
          <Controller
            control={control}
            render={({value, onBlur, onChange}) => (
              <InputForm_input
                name="email"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={(form.email, value)}
                onChange={onChangeEmail}
                onEndEditing={addToBehindText}
              />
            )}
            name="email"
            rules={{required: true, pattern: /^\S+@\S+$/i}}
            defaultValue=""
          />
          {errors.email && errors.email.type === 'required' && (
            <InputForm_errorMessage>
              이메일을 입력해 주세요
            </InputForm_errorMessage>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <InputForm_errorMessage>
              이메일 형식에 맞게 작성 해주세요
            </InputForm_errorMessage>
          )}

          <InputForm_button onPress={onSendAuthEmail}>
            <InputForm_buttonText>인증메일 전송</InputForm_buttonText>
          </InputForm_button>

          <View
            style={css`
              margin-bottom: 15px;
            `}
          />

          <InputForm_title>인증번호</InputForm_title>
          <Controller
            control={control}
            render={({value, onBlur, onChange}) => (
              <InputForm_input
                name="emailAuth"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={(form.code, value)}
                onChange={onChangeCode}
              />
            )}
            name="emailAuth"
            rules={{required: true, pattern: /^[0-9]/g}}
            defaultValue=""
          />
          {errors.emailAuth && errors.emailAuth.type === 'required' && (
            <InputForm_errorMessage>
              인증번호를 입력 해주세요
            </InputForm_errorMessage>
          )}
          {errors.emailAuth && errors.emailAuth.type === 'pattern' && (
            <InputForm_errorMessage>숫자만 입력해주세요</InputForm_errorMessage>
          )}
          <InputForm_button onPress={onConfirmAuthEmail}>
            <InputForm_buttonText>인증하기</InputForm_buttonText>
          </InputForm_button>

          <View
            style={css`
              margin-bottom: 15px;
            `}
          />

          <InputForm_title>비밀번호</InputForm_title>

          <InputForm_container__borderWidth05>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <InputForm_inputWithIcon
                  name="password"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={(form.password, value)}
                  secureTextEntry={visible}
                  onChange={onChangePassword}
                />
              )}
              name="password"
              rules={{required: true}}
              defaultValue=""
            />
            {visible ? (
              <Ionicons
                name="eye-off-outline"
                size={20}
                onPress={visibleText}
              />
            ) : (
              <Ionicons name="eye-outline" size={20} onPress={visibleText} />
            )}
          </InputForm_container__borderWidth05>

          {errors.password && (
            <InputForm_errorMessage>
              비밀번호를 입력해 주세요
            </InputForm_errorMessage>
          )}

          <View
            style={css`
              margin-bottom: 15px;
            `}
          />

          <InputForm_title>비밀번호확인</InputForm_title>

          <InputForm_container__borderWidth05>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <InputForm_inputWithIcon
                  name="passwordConfirm"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={(form.passwordConfirm, value)}
                  secureTextEntry={visible}
                  onChange={onChangePasswordConfirm}
                />
              )}
              name="passwordConfirm"
              rules={{required: true}}
              defaultValue=""
            />
            {visible ? (
              <Ionicons
                name="eye-off-outline"
                size={20}
                onPress={visibleText}
              />
            ) : (
              <Ionicons name="eye-outline" size={20} onPress={visibleText} />
            )}
          </InputForm_container__borderWidth05>
          {errors.passwordConfirm && (
            <InputForm_errorMessage>
              비밀번호를 입력해 주세요
            </InputForm_errorMessage>
          )}

          <View
            style={css`
              margin-bottom: 15px;
            `}
          />

          <InputForm_title>닉네임</InputForm_title>

          <Controller
            control={control}
            render={({value, onBlur, onChange}) => (
              <InputForm_input
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={(form.nickname, value)}
                onChange={onChangeNickname}
              />
            )}
            name="nickname"
            rules={{required: true, maxLength: 10}}
            defaultValue=""
          />
          {errors.nickname && errors.nickname.type === 'required' && (
            <InputForm_errorMessage>
              닉네임을 입력 해주세요
            </InputForm_errorMessage>
          )}
          {errors.nickname && errors.nickname.type === 'maxLength' && (
            <InputForm_errorMessage>
              닉네임은 최대 10자까지 가능합니다
            </InputForm_errorMessage>
          )}

          <View
            style={css`
              margin-bottom: 15px;
            `}
          />

          <InputForm_title>출생연도</InputForm_title>

          <InputForm_container__borderWidth05>
            <InputForm_pickerContainer
              selectedValue={selectedBirthYear.item}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedBirthYear({item: itemValue});
                getBirthYear(selectedBirthYear.item);
              }}
              mode="dropdown">
              <Picker.Item label="출생연도" />
              {yearList.map((datas) => (
                <Picker.Item label={datas} value={datas} key={datas} />
              ))}
            </InputForm_pickerContainer>
          </InputForm_container__borderWidth05>

          <View
            style={css`
              margin-bottom: 15px;
            `}
          />

          <InputForm_title>소속학과</InputForm_title>

          <InputForm_container__borderWidth05>
            <InputForm_pickerContainer
              selectedValue={selectedCollege.item}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedCollege({item: itemValue});
                setFilteredData(
                  departmentData.filter(
                    (datas) => datas.collegeName === selectedCollege.item,
                  ),
                );
              }}
              mode="dropdown">
              <Picker.Item label="단과대학" />
              {collegeData.map((datas) => (
                <Picker.Item label={datas} value={datas} key={datas} />
              ))}
            </InputForm_pickerContainer>
          </InputForm_container__borderWidth05>

          <InputForm_container__borderWidth05>
            <InputForm_pickerContainer
              selectedValue={selectedDepartmentId.item}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedDepartmentId({item: itemValue});
                getDepartmentId(selectedDepartmentId.item);
              }}
              mode="dropdown">
              {selectedCollege.item ? (
                <Picker.Item label="소속학과 선택" />
              ) : (
                <Picker.Item label="단과대학을 먼저 선택해주세요" />
              )}
              {filteredData.map((datas) => (
                <Picker.Item
                  label={datas.departmentName}
                  value={datas.id}
                  key={datas.id}
                />
              ))}
            </InputForm_pickerContainer>
          </InputForm_container__borderWidth05>

          <View
            style={css`
              margin-bottom: 15px;
            `}
          />

          <InputForm_title>성별</InputForm_title>

          <InputForm_container__borderWidth05>
            <InputForm_pickerContainer
              selectedValue={selectedGender.item}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedGender({item: itemValue});
                getGender(selectedGender.item);
              }}
              mode="dialog">
              <Picker.Item label="성별" />
              <Picker.Item label="남자" value="MALE" />
              <Picker.Item label="여자" value="FEMALE" />
            </InputForm_pickerContainer>
          </InputForm_container__borderWidth05>

          <View
            style={css`
              margin-bottom: 15px;
            `}
          />

          <InputForm_title>자기소개</InputForm_title>

          <Controller
            control={control}
            render={({value, onBlur, onChange}) => (
              <InputForm_input
                name="selfIntroduction"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={(form.selfIntroduction, value)}
                onChange={onChangeSelfIntroduction}
                textAlignVertical={'top'}
                multiline
              />
            )}
            name="selfIntroduction"
            rules={{required: true}}
            defaultValue=""
          />

          {errors.selfIntroduction && (
            <InputForm_errorMessage>
              닉네임을 입력 해주세요
            </InputForm_errorMessage>
          )}

          <InputForm_button onPress={registerHandler}>
            <InputForm_buttonText>🎉회원가입🎉</InputForm_buttonText>
          </InputForm_button>
        </RegisterForm>
      </RegisterWrapper>

      {(authLoading || emailAuthLoading || confirmEmailLoading) && (
        <LoadingScreen />
      )}
    </>
  );
};

export default RegisterScreen;

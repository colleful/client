import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-community/picker';
import * as authAPI from '../../../lib/api';
import {useForm, Controller} from 'react-hook-form';
import LoadingScreen from '../../../components/LoadingScreen';
import {RegisterWrapper, RegisterForm} from './style';
import {
  AuthForm_inputTitle,
  AuthForm_inputContainer,
  AuthForm_input,
  AuthForm_errorMessage,
  AuthForm_button,
  AuthForm_buttonText,
  AuthForm_pickerContainer,
  AuthForm__marginBottom15,
} from '../LoginScreen/style';

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
          <AuthForm_inputTitle>이메일</AuthForm_inputTitle>
          <AuthForm_inputContainer>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <AuthForm_input
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
          </AuthForm_inputContainer>
          {errors.email && errors.email.type === 'required' && (
            <AuthForm_errorMessage>
              이메일을 입력해 주세요
            </AuthForm_errorMessage>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <AuthForm_errorMessage>
              이메일 형식에 맞게 작성 해주세요
            </AuthForm_errorMessage>
          )}

          <AuthForm_button onPress={onSendAuthEmail}>
            <AuthForm_buttonText>인증메일 전송</AuthForm_buttonText>
          </AuthForm_button>

          <AuthForm__marginBottom15 />

          <AuthForm_inputTitle>인증번호</AuthForm_inputTitle>
          <AuthForm_inputContainer>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <AuthForm_input
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
          </AuthForm_inputContainer>
          {errors.emailAuth && errors.emailAuth.type === 'required' && (
            <AuthForm_errorMessage>
              인증번호를 입력 해주세요
            </AuthForm_errorMessage>
          )}
          {errors.emailAuth && errors.emailAuth.type === 'pattern' && (
            <AuthForm_errorMessage>숫자만 입력해주세요</AuthForm_errorMessage>
          )}
          <AuthForm_button onPress={onConfirmAuthEmail}>
            <AuthForm_buttonText>인증하기</AuthForm_buttonText>
          </AuthForm_button>

          <AuthForm__marginBottom15 />

          <AuthForm_inputTitle>비밀번호</AuthForm_inputTitle>

          <AuthForm_inputContainer>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <AuthForm_input
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
          </AuthForm_inputContainer>

          {errors.password && (
            <AuthForm_errorMessage>
              비밀번호를 입력해 주세요
            </AuthForm_errorMessage>
          )}

          <AuthForm__marginBottom15 />

          <AuthForm_inputTitle>비밀번호확인</AuthForm_inputTitle>

          <AuthForm_inputContainer>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <AuthForm_input
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
          </AuthForm_inputContainer>
          {errors.passwordConfirm && (
            <AuthForm_errorMessage>
              비밀번호를 입력해 주세요
            </AuthForm_errorMessage>
          )}

          <AuthForm__marginBottom15 />

          <AuthForm_inputTitle>닉네임</AuthForm_inputTitle>

          <AuthForm_inputContainer>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <AuthForm_input
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
          </AuthForm_inputContainer>
          {errors.nickname && errors.nickname.type === 'required' && (
            <AuthForm_errorMessage>
              닉네임을 입력 해주세요
            </AuthForm_errorMessage>
          )}
          {errors.nickname && errors.nickname.type === 'maxLength' && (
            <AuthForm_errorMessage>
              닉네임은 최대 10자까지 가능합니다
            </AuthForm_errorMessage>
          )}

          <AuthForm__marginBottom15 />

          <AuthForm_inputTitle>출생연도</AuthForm_inputTitle>

          <AuthForm_pickerContainer
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
          </AuthForm_pickerContainer>

          <AuthForm__marginBottom15 />

          <AuthForm_inputTitle>소속학과</AuthForm_inputTitle>

          <AuthForm_pickerContainer
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
          </AuthForm_pickerContainer>

          <AuthForm_pickerContainer
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
          </AuthForm_pickerContainer>

          <AuthForm__marginBottom15 />

          <AuthForm_inputTitle>성별</AuthForm_inputTitle>

          <AuthForm_pickerContainer
            selectedValue={selectedGender.item}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedGender({item: itemValue});
              getGender(selectedGender.item);
            }}
            mode="dialog">
            <Picker.Item label="성별" />
            <Picker.Item label="남자" value="MALE" />
            <Picker.Item label="여자" value="FEMALE" />
          </AuthForm_pickerContainer>

          <AuthForm__marginBottom15 />

          <AuthForm_inputTitle>자기소개</AuthForm_inputTitle>

          <AuthForm_inputContainer>
            <Controller
              control={control}
              render={({value, onBlur, onChange}) => (
                <AuthForm_input
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
          </AuthForm_inputContainer>

          {errors.selfIntroduction && (
            <AuthForm_errorMessage>
              닉네임을 입력 해주세요
            </AuthForm_errorMessage>
          )}

          <AuthForm_button onPress={registerHandler}>
            <AuthForm_buttonText>🎉회원가입🎉</AuthForm_buttonText>
          </AuthForm_button>
        </RegisterForm>
      </RegisterWrapper>

      {(authLoading || emailAuthLoading || confirmEmailLoading) && (
        <LoadingScreen />
      )}
    </>
  );
};

export default RegisterScreen;

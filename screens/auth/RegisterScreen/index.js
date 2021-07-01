import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-community/picker';
import {useForm, Controller} from 'react-hook-form';
import LoadingScreen from '../../../components/LoadingScreen';
import * as P from '../../../assets/css/common';
import * as S from './style';
import {GET_DEPARTMENT_REQUEST} from '../../../reducers/department';

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
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const {
    form,
    authLoading,
    emailAuthLoading,
    confirmEmailLoading,
  } = useSelector(
    ({authentication}) => ({
      form: authentication.register,
      ...authentication,
    }),
    shallowEqual,
  );

  const {
    departmentData,
    collegeData,
    getDepartmentLoading,
    getDepartmentError,
  } = useSelector(({department}) => department);

  const {
    email,
    code,
    password,
    passwordConfirm,
    nickname,
    selfIntroduction,
  } = form;

  useEffect(() => {
    dispatch({type: GET_DEPARTMENT_REQUEST});
  }, [dispatch]);

  useEffect(() => {
    if (getDepartmentError) {
      Alert.alert('에러', `${getDepartmentError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({getDepartmentError});
    }
  }, [getDepartmentError]);

  const visibleText = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const addToBehindText = (e) => {
    onCreateAddress(e.nativeEvent.text);
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

  const passwordRef = useRef();
  passwordRef.current = watch('password');

  /**
   * 리렌더링이 발생하는 곳은 picker, 이유는 onValueChange에서 함수를 계속 재생성해서 리렌더링이 발생함
   */

  // const count = useRef(0);
  // console.log(`회원가입 렌더링횟수: ${count.current++}`);

  return (
    <S.Wrapper>
      <S.WrapperInner>
        <P.InputTitle>이메일</P.InputTitle>
        <Controller
          control={control}
          render={({value, onBlur, onChange}) => (
            <P.Input
              name="email"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={(email, value)}
              onChange={onChangeEmail}
              onEndEditing={addToBehindText}
            />
          )}
          name="email"
          rules={{required: true, pattern: /^\S+@\S+$/i}}
          defaultValue=""
        />
        {errors.email && errors.email.type === 'required' && (
          <P.ErrorMessage>이메일을 입력해 주세요</P.ErrorMessage>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <P.ErrorMessage>이메일 형식에 맞게 작성 해주세요</P.ErrorMessage>
        )}

        <P.Button pink onPress={onSendAuthEmail}>
          <P.ButtonText>인증메일 전송</P.ButtonText>
        </P.Button>

        <S.BorderLine />

        <P.InputTitle>인증번호</P.InputTitle>
        <Controller
          control={control}
          render={({value, onBlur, onChange}) => (
            <P.Input
              name="emailAuth"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={(code, value)}
              onChange={onChangeCode}
            />
          )}
          name="emailAuth"
          rules={{required: true, pattern: /^[0-9]/g}}
          defaultValue=""
        />
        {errors.emailAuth && errors.emailAuth.type === 'required' && (
          <P.ErrorMessage>인증번호를 입력 해주세요</P.ErrorMessage>
        )}
        {errors.emailAuth && errors.emailAuth.type === 'pattern' && (
          <P.ErrorMessage>숫자만 입력해주세요</P.ErrorMessage>
        )}
        <P.Button pink onPress={onConfirmAuthEmail}>
          <P.ButtonText>인증하기</P.ButtonText>
        </P.Button>

        <S.BorderLine />

        <P.InputTitle>비밀번호</P.InputTitle>

        <P.Container>
          <Controller
            control={control}
            render={({value, onBlur, onChange}) => (
              <P.InputWithIcon
                name="password"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={(password, value)}
                secureTextEntry={visible}
                onChange={onChangePassword}
              />
            )}
            name="password"
            rules={{required: true}}
            defaultValue=""
          />
          {visible ? (
            <Ionicons name="eye-off-outline" size={20} onPress={visibleText} />
          ) : (
            <Ionicons name="eye-outline" size={20} onPress={visibleText} />
          )}
        </P.Container>

        {errors.password && (
          <P.ErrorMessage>비밀번호를 입력해 주세요</P.ErrorMessage>
        )}

        <S.BorderLine />

        <P.InputTitle>비밀번호확인</P.InputTitle>

        <P.Container>
          <Controller
            control={control}
            render={({value, onBlur, onChange}) => (
              <P.InputWithIcon
                name="passwordConfirm"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={(passwordConfirm, value)}
                secureTextEntry={visible}
                onChange={onChangePasswordConfirm}
              />
            )}
            name="passwordConfirm"
            rules={{required: true}}
            defaultValue=""
          />
          {visible ? (
            <Ionicons name="eye-off-outline" size={20} onPress={visibleText} />
          ) : (
            <Ionicons name="eye-outline" size={20} onPress={visibleText} />
          )}
        </P.Container>
        {errors.passwordConfirm && (
          <P.ErrorMessage>비밀번호를 입력해 주세요</P.ErrorMessage>
        )}

        <S.BorderLine />

        <P.InputTitle>닉네임</P.InputTitle>

        <Controller
          control={control}
          render={({value, onBlur, onChange}) => (
            <P.Input
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={(nickname, value)}
              onChange={onChangeNickname}
            />
          )}
          name="nickname"
          rules={{required: true, maxLength: 10}}
          defaultValue=""
        />
        {errors.nickname && errors.nickname.type === 'required' && (
          <P.ErrorMessage>닉네임을 입력 해주세요</P.ErrorMessage>
        )}
        {errors.nickname && errors.nickname.type === 'maxLength' && (
          <P.ErrorMessage>닉네임은 최대 10자까지 가능합니다</P.ErrorMessage>
        )}

        <S.BorderLine />

        <P.InputTitle>출생연도</P.InputTitle>

        <P.Container>
          <P.PickerContainer
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
          </P.PickerContainer>
        </P.Container>

        <S.BorderLine />

        <P.InputTitle>소속학과</P.InputTitle>

        <P.Container>
          <P.PickerContainer
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
          </P.PickerContainer>
        </P.Container>

        <P.Container>
          <P.PickerContainer
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
          </P.PickerContainer>
        </P.Container>

        <S.BorderLine />

        <P.InputTitle>성별</P.InputTitle>

        <P.Container>
          <P.PickerContainer
            selectedValue={selectedGender.item}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedGender({item: itemValue});
              getGender(selectedGender.item);
            }}
            mode="dialog">
            <Picker.Item label="성별" />
            <Picker.Item label="남자" value="MALE" />
            <Picker.Item label="여자" value="FEMALE" />
          </P.PickerContainer>
        </P.Container>

        <S.BorderLine />

        <P.InputTitle>자기소개</P.InputTitle>

        <Controller
          control={control}
          render={({value, onBlur, onChange}) => (
            <P.Input
              name="selfIntroduction"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={(selfIntroduction, value)}
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
          <P.ErrorMessage>닉네임을 입력 해주세요</P.ErrorMessage>
        )}

        <P.Button pink onPress={registerHandler}>
          <P.ButtonText>🎉회원가입🎉</P.ButtonText>
        </P.Button>
      </S.WrapperInner>

      {(authLoading ||
        emailAuthLoading ||
        confirmEmailLoading ||
        getDepartmentLoading) && <LoadingScreen />}
    </S.Wrapper>
  );
};

export default RegisterScreen;

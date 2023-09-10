/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, InputField} from '../../components';
import {AuthContext} from '../../../App';
import AuthScreenWrapper from '../../components/hoc/AuthWrapper';
// @ts-ignore
// import ScooperImage from '../../assets/scooper.png';
import {authErrors} from '../../constants/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {STYLES} from '../../constants/styles';
import Scooper from '../../svgs/Scooper';

export default function LoginWithEmailAndPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const [isApiCalling, setIsApiCalling] = useState(false);
  // @ts-ignore
  const {signIn} = React.useContext(AuthContext);
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  const handleSubmit = async () => {
    try {
      console.log(
        '🚀 ~ file: LoginWithUsernameAndPassword.tsx:85 ~ handleSubmit ~ handleSubmit:',
        email,
        password,
      );
      setIsApiCalling(true);
      setApiError('');
      setEmailError('');
      setPasswordError('');

      if (!email) {
        setEmailError('Enter Email');
        setIsApiCalling(false);
      }
      if (!password) {
        setPasswordError('Enter Password');
        setIsApiCalling(false);
      }
      if (email && !emailRegex.test(email)) {
        setEmailError('Enter Valid Email');
        setIsApiCalling(false);
        return;
      }

      if (email && password) {
        const payload = {
          email: email,
          password: password,
        };
        const response = await signIn(payload);

        if (response.success === false) {
          const apiEmailError =
            response.message === 'error_message_email_not_registered';

          const apiPasswordError =
            response.message === 'error_message_password_wrong';

          if (apiEmailError) {
            console.log('apiEmailError: ', apiEmailError);
            setPasswordError('');
            //@ts-ignore
            setEmailError(authErrors[response.message]);
            setIsApiCalling(false);
          } else if (apiPasswordError) {
            console.log('apiPasswordError: ', apiPasswordError);
            setEmailError('');
            //@ts-ignore
            setPasswordError(authErrors[response.message]);
            setIsApiCalling(false);
          }
        }
        setIsApiCalling(false);
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: LoginWithEmailAndPassword.tsx:31 ~ handleSubmit ~ error:',
        error,
      );
      setEmailError('');
      setPasswordError('');
      setApiError('Oops! Something went wrong, Please try again later.');
      setIsApiCalling(false);
    }
  };

  return (
    <AuthScreenWrapper showBackArrowIcon={false}>
      <View
        style={{
          alignItems: 'center',
          paddingBottom: 24,
          paddingTop: 42,
        }}>
        <Scooper />
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          // justifyContent: 'flex-end',
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 42,
          borderRadius: 24,
          // backgroundColor: '#e8e8e8',
          flexGrow: 1,
          // marginHorizontal: 24,
          paddingBottom: 400,
        }}>
        <Text
          style={{
            color: STYLES.textGreenColor,
            fontSize: 20,
            fontWeight: 700,
            paddingTop: 12,
            textAlign: 'center',
            marginBottom: 31,
          }}>
          Welcome Back
        </Text>
        {/* <Text style={styles.header}>LOGIN</Text> */}
        <InputField
          // label={'Email'}
          value={email}
          leftIcon={<Icon name="user" size={15} color="#555" />}
          style={styles.input}
          placeholder="Email"
          onChangeText={(text: string) => {
            setEmail(text);
            setEmailError('');
          }}
          inputBoxContainerStyle={[
            styles.inputBoxContainer,
            emailError ? styles.inputError : null,
            email && emailRegex.test(email) ? styles.validInput : null,
          ]}
          // @ts-ignore
          errorComponent={
            emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null
          }
          errorMessageStyle={styles.errorMessageStyle}
        />
        <InputField
          // label={'Password'}
          leftIcon={<Icon name="lock" size={15} color="#555" />}
          style={styles.input}
          value={password}
          onChangeText={(text: string) => {
            setPassword(text);
            setPasswordError('');
          }}
          inputBoxContainerStyle={[
            styles.inputBoxContainer,
            passwordError ? styles.inputError : null,
            password.length >= 2 ? styles.validInput : null,
          ]}
          placeholder="Password"
          secureTextEntry={true}
          // @ts-ignore
          errorComponent={
            passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null
          }
          errorMessageStyle={styles.errorMessageStyle}
        />
        {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}
        <Button
          color={STYLES.greenColor}
          wrapperStyle={{marginTop: 16, marginBottom: 40}}
          title="Sign In"
          onPress={handleSubmit}
          processing={isApiCalling}
        />
      </View>
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 12,
    color: 'black',
    width: '100%',
  },
  inputBoxContainer: {
    borderBottomColor: '#294959',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  inputError: {
    borderBottomColor: 'red',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
    color: 'black',
    textAlign: 'center',
  },
  errorMessageStyle: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  validInput: {
    borderBottomColor: 'green',
  },
});

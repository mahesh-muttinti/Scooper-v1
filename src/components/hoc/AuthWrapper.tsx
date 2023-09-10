/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Keyboard,
  View,
  Pressable,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {STYLES} from '../../constants/styles';

/**
 * @author
 * @function AuthScreenWrapper
 **/
// @ts-ignore
const AuthScreenWrapper = ({children, showBackArrowIcon = true, ...props}) => {
  const navigation = useNavigation();
  const safeAreaViewStyle = {
    flex: 1,
    height: '100%',
    backgroundColor: STYLES.baseColor,
    mariginHorizontal: 24,
    ...props.wrapperStyles,
  };
  const keyboardAvoidingViewStyles = {
    flex: 1,
    ...props.keyboardAvoidingViewStyles,
  };
  const touchableWithoutFeedbackStyle = {
    flex: 1,
  };
  const contentContainerStyle = {
    flexGrow: 1,
  };
  const backArrowIconWrapperStyle = {
    // paddingBottom: 41.18,
    ...props.backArrowIconWrapperStyle,
  };

  return (
    <SafeAreaView style={{...safeAreaViewStyle}}>
      <KeyboardAvoidingView
        enabled
        style={{...keyboardAvoidingViewStyles}}
        // @ts-ignore
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={0}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{...touchableWithoutFeedbackStyle}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            style={{
              ...{
                flex: 1,
                ...props.scrollViewStyles,
              },
            }}
            contentContainerStyle={{...contentContainerStyle}}
            keyboardShouldPersistTaps={'handled'}>
            <View
              style={{
                marginBottom: 32,
                paddingBottom: 42,
                ...props.childrenWrapperStyles,
              }}>
              <View style={{...backArrowIconWrapperStyle}}>
                {showBackArrowIcon && (
                  <Pressable
                    hitSlop={{top: 30, left: 30, right: 30, bottom: 30}}
                    onPress={() => {
                      props.onBackPress
                        ? props.onBackPress()
                        : // @ts-ignore
                          navigation.canGoBack() && navigation.pop();
                    }}
                    style={{width: 50}}>
                    <Text>Back</Text>
                  </Pressable>
                )}
              </View>

              {children}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' if you want the image to stretch
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // You can add padding or margins as needed
  },
});

export default AuthScreenWrapper;

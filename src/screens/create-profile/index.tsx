// React
import React, { Fragment, useCallback, useContext, useState } from 'react';
// Native
import { KeyboardAvoidingView, View } from 'react-native';
// Store
import * as Store from '@store/index';
// Components
import { Text } from '@components/Text';
import { TextInput } from '@components/TextInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import Slider from '@react-native-community/slider';
// Context
import { ThemeContext } from '@src/context/ThemeContext';
// Theme
import { getSpacing } from '@src/theme/utils/spacing';
import { styles } from './styles';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
};

export const CreateProfileScreen = (): React.ReactElement => {
  const dispatch = Store.useDispatch();
  const loading = Store.useSelector((store) => store.app.createLoading);

  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState(initialFormState);

  const handleTextInput = (
    key: keyof FormData,
    value: string | number,
  ): void => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleButton = (): void => {
    dispatch(Store.App.createUser({ user: formData }))
      .unwrap()
      .then((res) => {
        if (res.error) return;

        setFormData(initialFormState);
      });
  };

  const formatPlaceHolder = useCallback((val: string): string => {
    const format = val
      .split(/(?=[A-Z])/)
      .join(' ')
      .toLocaleLowerCase();

    return format.charAt(0).toUpperCase() + format.slice(1);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.flexGrow}
        contentContainerStyle={styles.flexGrow}
        keyboardVerticalOffset={getSpacing(5, 'height')}
        behavior="position">
        <Header title="Create Profile" />
        <View style={styles.content}>
          {Object.keys(initialFormState).map((val) => (
            <Fragment key={val}>
              {['firstName', 'lastName', 'email'].includes(val) ? (
                <TextInput
                  testID={val}
                  style={styles.input}
                  value={
                    formData[
                      val as keyof Pick<
                        FormData,
                        'email' | 'firstName' | 'lastName'
                      >
                    ]
                  }
                  placeholder={formatPlaceHolder(val)}
                  onChangeText={(e) => handleTextInput(val as keyof FormData, e)}
                />
              ) : (
                <>
                  <Text center variant="body-large" weight="semi-bold">
                    {`Age: ${formData.age}`}
                  </Text>
                  <Slider
                    testID="age"
                    style={styles.slider}
                    minimumValue={1}
                    step={1}
                    value={formData.age}
                    maximumValue={100}
                    onValueChange={(e) => handleTextInput('age', e)}
                    minimumTrackTintColor={theme.primary}
                    maximumTrackTintColor={theme.text}
                  />
                </>
              )}
            </Fragment>
          ))}
        </View>
        <Button
          testID="create-profile"
          title="Create profile"
          onPress={handleButton}
          loading={loading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

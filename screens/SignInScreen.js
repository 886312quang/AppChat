import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { materialTheme } from "../constants/index";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import actions from "../redux/actions/auth";

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      let userInfo = { email: data.email, password: data.password };
      dispatch(actions.doSignin(userInfo, navigation));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(`error`, errors);

  const [data, setData] = React.useState({
    sdt: "",
    password: "",
    check_input: false,
    secureTextEntry: true,
  });

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        sdt: val,
        check_input: true,
      });
    } else {
      setData({
        ...data,
        sdt: val,
        check_input: false,
      });
    }
  };

  const passwordChange = (val, field) => {
    setData({
      ...data,
      password: val,
    });
  };

  const checkSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <LinearGradient colors={["#076585", "#fff"]} style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration="1000"
          source={require("../assets/images/LogoRA.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user" color="#05375a" size={20} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                  textInputChange(value);
                }}
                value={value}
                placeholder="Email"
              />
            )}
            name="email"
            rules={
              ({ required: { value: true, message: "Kh??ng ???????c b??? tr???ng." } },
              {
                pattern: { value: /^\S+@\S+$/i, message: "Nh???p sai email." },
              })
            }
            defaultValue=""
          />
          {data.check_input && !errors.email ? (
            <Feather name="check-circle" color="green" size={20} />
          ) : null}
        </View>
        {errors.email && errors.email.type === "pattern" ? (
          <TextInput style={styles.textError}>{errors.email.message}</TextInput>
        ) : null}
        <Text style={[styles.text_footer, { marginTop: 20 }]}>M???t kh???u</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <Controller
            name="password"
            rules={{
              required: true,
              minLength: { value: 8, message: "M???t kh???u t???i thi???u 8 k?? t???." },
            }}
            defaultValue=""
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                  passwordChange(value);
                }}
                value={value}
                secureTextEntry={data.secureTextEntry}
                autoCapitalize={false}
                placeholder="M???t kh???u"
              />
            )}
          />

          <TouchableOpacity onPress={checkSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {errors.password ? (
          <TextInput style={styles.textError}>
            {errors.password.message}
          </TextInput>
        ) : null}

        <View style={styles.button}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <LinearGradient style={styles.btn} colors={["#2980b9", "#2980a0"]}>
              <Text style={styles.textSign}>????ng nh???p</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.button_SignUp}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
          >
            <LinearGradient style={styles.btn} colors={["#2980b9", "#2980a0"]}>
              <Text style={styles.textSign}>????ng k??</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default SignInScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${materialTheme.COLORS.PRIMARY}`,
  },
  logo: {
    height: height_logo,
    width: height_logo,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 2,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  textError: { color: "red", fontWeight: "normal", fontStyle: "italic" },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  button_SignUp: {
    alignItems: "center",
    marginTop: 10,
  },
  btn: {
    width: 360,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
});

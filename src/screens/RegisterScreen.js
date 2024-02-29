import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import React from 'react'
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { BASE_URL } from '@env' 

const RegisterScreen = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigation = useNavigation();

  function handleRegister () {
    const userPayload = {
      name: name,
      email: email,
      password: password
    }

    // send a post request to backend api
    axios.post(`${BASE_URL}/register`, userPayload)
      .then(res => {
        console.log(res.data);

        Alert.alert("Registration successful", "You've registered successfully. Please verify the mail id now.");

        setName("");
        setEmail("");
        setPassword("");
      })
      .catch(err => {
        console.log("Registration failed:", err.response.data.message);
        
        Alert.alert("Registration error", err.response.data.message);
      })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <View>
        <Image 
          source={{ uri : "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" }}
          style={{ width: 150, height: 100 }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 12, color: '#041E42' }}>Register your account</Text>
        </View>

        <View style={{ marginTop: 56 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#E9E9E9', paddingVertical: 6, borderRadius: 5, marginTop: 24 }}>
            <FontAwesome name="user" size={24} color="black" style={{ marginRight: 14, marginLeft: 10, opacity: 0.9 }} />

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder='Enter your name'
              style={{ color: 'black', marginVertical: 8, width: 300, fontSize: 16 }}
            />
          </View>
        </View>
        
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#E9E9E9', paddingVertical: 6, borderRadius: 5, marginTop: 24 }}>
            <MaterialIcons name="email" size={24} color="black" style={{ marginHorizontal: 8, opacity: 0.9 }} />

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder='Enter your email'
              style={{ color: 'black', marginVertical: 8, width: 300, fontSize: 16 }}
            />
          </View>
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#E9E9E9', paddingVertical: 5, borderRadius: 5, marginTop: 24 }}>
            <MaterialIcons name="lock" size={26} color="black" style={{ marginHorizontal: 8, opacity: 0.9 }} />

            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder='Enter your password'
              style={{ color: 'black', marginVertical: 8, width: 300, fontSize: 16 }}
            />
          </View>
        </View>

        <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>Keep me logged in</Text>
          
          <Text style={{ color: '#007fff', fontWeight: '500' }}>Forgot Password</Text>
        </View>

        <View style={{ marginTop: 56 }} />

        <Pressable onPress={handleRegister} style={{ width: 200, backgroundColor: '#FEBE10', marginLeft: 'auto', marginRight: 'auto', borderRadius: 6, padding: 16}}>
          <Text style={{ textAlign: 'center', color: 'black', opacity: 0.75, fontSize: 16, fontWeight: 'bold' }}>Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Login")} style={{ marginTop: 16 }}>
          <Text style={{ textAlign: 'center', color: 'black', opacity: 0.8, fontSize: 15 }}>Already have an account? Sign in</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})
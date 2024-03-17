import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'

const HomeHeader = () => {
    return (
        <View style={{ backgroundColor: '#00CED1', padding: 10, flexDirection: 'row', alignItems: 'center', }}>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, gap: 10, backgroundColor: 'white', borderRadius: 3, height: 40, flex: 1 }}>
                <AntDesign name='search1' size={20} color={'black'} style={{ paddingLeft: 10 }} />
                <TextInput
                    placeholder='Search amazon.in'
                />
            </Pressable>

            <Pressable style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
                <Feather name='mic' size={22} color={'black'} style={{ paddingHorizontal: 10 }} />
            </Pressable>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({})
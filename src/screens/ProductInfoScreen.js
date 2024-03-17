import { ScrollView, StyleSheet, SafeAreaView, Dimensions, Text, View, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import HomeHeader from '../components/HomeHeader'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/CartReducer'

const ProductInfoScreen = () => {
    const { width } = Dimensions.get('window')
    const height = width

    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)

    function handleOnAddToCart() {
        const item = route?.params?.item
        dispatch(addToCart(item))
    }
    function handleOnRemoveFromCart() {
        const item = route?.params?.item
        dispatch(removeFromCart(item))
    }
    console.log(cart.length)

    const isAddedToCart = cart.find(item => item.id === route?.params?.item?.id)

    return (
        <SafeAreaView
            style={{
                flex: 1, backgroundColor: 'white',
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
                <HomeHeader />

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        route.params.carouselImages.map((item, index) => (
                            <ImageBackground resizeMode='contain' style={{ width, height, marginTop: 8 }} source={{ uri: item }} key={index}>
                                <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', width: 40, height: 40, borderRadius: 20, backgroundColor: '#C60C30', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 12 }}>20% off</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name='share-variant' size={24} color={'black'} />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row', width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center',
                                        marginTop: 'auto', marginRight: 12, marginLeft: 'auto', marginBottom: 4
                                    }}
                                >
                                    <AntDesign name='hearto' size={24} color={'black'} />
                                </View>
                            </ImageBackground>
                        ))
                    }
                </ScrollView>

                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>{route?.params?.title}</Text>

                    <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 6 }}>₹ {route?.params?.price}</Text>

                </View>

                <View style={{ height: 1, borderWidth: 1, borderColor: '#D0D0D0' }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Text>Color: </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{route?.params?.color}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Text>Size: </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{route?.params?.size}</Text>
                </View>

                <View style={{ height: 1, borderWidth: 1, borderColor: '#D0D0D0' }} />

                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 5 }}>Total: ₹ {route?.params?.price}</Text>
                    <Text style={{ color: 'blue' }}>FREE delivery tomorrow by 3:00PM {'\n'}( within 10h30m )</Text>

                    <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center', gap: 6 }}>
                        <Ionicons name="location" size={20} color={"black"} />

                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Deliver to Parth - Pune 411011</Text>
                    </View>
                </View>

                <Text style={{ color: 'green', marginHorizontal: 12, marginBottom: 8, fontWeight: '500' }}>In stock</Text>

                {
                    !isAddedToCart ?
                    <Pressable
                        onPress={handleOnAddToCart}
                        style={{ backgroundColor: '#FFC72C', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', margin: 10 }}
                    >
                        <Text>Add to cart</Text>
                    </Pressable>
                    :
                    <Pressable
                        onPress={handleOnRemoveFromCart}
                        style={{ backgroundColor: 'crimson', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', margin: 10 }}
                    >
                        <Text style={{ color: 'white' }}>Remove from Cart</Text>
                    </Pressable>
                }
                <Pressable
                    style={{ backgroundColor: '#FFC72C', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', margin: 10 }}
                >
                    <Text>Buy now</Text>
                </Pressable>
            </ScrollView>

        </SafeAreaView>
    )
}

export default ProductInfoScreen

const styles = StyleSheet.create({})
import { Image, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from 'react-native-image-slider-box';
import axios from 'axios'
import ProductItem from '../components/ProductItem'
import { categories, carouselImages, deals, offers, fakeProductsUrl } from '../data/dummy'
import DropDownPicker from 'react-native-dropdown-picker';

const HomeScreen = () => {
  const [products, setProducts] = useState()
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState("jewelery")
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's clothing", value: "women's clothing" },
  ])

  React.useEffect(() => {
    async function fetchData() {
      try {
          const response = await axios.get(fakeProductsUrl)
          setProducts(response.data)
      } catch (error) {
          console.log("Failed to fetch products data: ", error);
      }
    }

    fetchData()
  }, [])

  const onCategoryOpen = React.useCallback(() => {
    // setCompanyOpen(false)
  })

  return (
    <SafeAreaView 
      style={{ 
        flex: 1, backgroundColor: 'white',
      }}
    >
      <ScrollView>
        <View style={{ backgroundColor: '#00CED1', padding: 10, flexDirection: 'row', alignItems: 'center',}}>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, gap: 10, backgroundColor: 'white', borderRadius: 3, height: 40, flex: 1}}>
            <AntDesign name='search1' size={20} color={'black'} style={{ paddingLeft: 10 }} />
            <TextInput 
              placeholder='Search amazon.in'
            />
          </Pressable>

          <Pressable style={{ flexDirection: 'row', alignItems: 'center', height: 40}}>
            <Feather name='mic' size={22} color={'black'} style={{ paddingHorizontal: 10 }} />
          </Pressable>
        </View>

        <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, backgroundColor: '#AFEEEE', }}>
          <Ionicons name='location-outline' size={20} color={'black'} />

          <View>
            <Text style={{ fontSize: 13, fontWeight: '500' }}>Deliver to Parth - Pune 411011</Text>
          </View>

          <MaterialIcons name='keyboard-arrow-down' size={24} color={'black'} />
        </Pressable>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingHorizontal: 12 }}>
          {
            categories.map((item, index) => (
              <Pressable key={item.id} style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={{ uri: item.image}}
                  style={{ width:50, height: 50 }}
                  resizeMode='contain'
                />

                <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '500', marginTop: 5, marginBottom: 3 }}>{item?.name}</Text>
              </Pressable>
            ))
          }
        </ScrollView>

        <SliderBox
          images={carouselImages}
          autoplay
          circleLoop
          dotColor={'#13274F'}
          inactiveDotColor={'#90A4AE'}
          ImageComponentStyle={{ width: '100%' }}
        />

        <Text style={{ paddingHorizontal: 10, paddingVertical: 16, fontSize: 18, fontWeight: 'bold' }}>Trending deals of the week</Text>
      
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' }}>
          {
            deals.map((item, index) => (
              <Pressable key={index} style={{ marginVertical: 10 }}>
                <Image 
                  source={{ uri: item?.image }}
                  style={{ width: 200, height: 200 }}
                  resizeMode='contain'
                />
              </Pressable>
            ))
          }
        </View>

        <View style={{ borderWidth: 1, borderColor: '#D0D0D0', height: 1, marginTop: 16 }} />

        <Text style={{ paddingHorizontal: 10, paddingVertical: 16, fontSize: 18, fontWeight: 'bold' }}>Today's deals</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
            offers.map((item, index) => (
              <Pressable key={index} style={{ marginTop: 16, marginBottom: 16, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={{ uri: item?.image }}
                  style={{ width: 150, height: 150 }}
                  resizeMode='contain'
                />

                <View 
                  style={{ 
                    backgroundColor: 'rgb(120,121,250)', justifyContent: 'center', alignItems: 'center', width: 130, paddingVertical: 5,
                    borderRadius: 4, marginTop: 16
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'white' }}>Upto {item?.offer} off</Text>
                </View>
              </Pressable>
            ))
          }
        </ScrollView>

        <View style={{ borderWidth: 1, borderColor: '#D0D0D0', height: 1, marginVertical: 8 }} />

        <View style={{ marginHorizontal: 12, marginTop: 12, width: '45%', marginBottom: open ? 50: 15 }}>
          <DropDownPicker 
            style={{ borderColor: '#B7B7B7', height: 30, marginBottom: open ? 140 : 15 }}
            open={open} setOpen={setOpen}
            value={category} setValue={setCategory}
            items={items} setItems={setItems}
            placeholder='Choose category'
            placeholderStyle={styles.placeholderStyle}
            onOpen={onCategoryOpen}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}}>
          {
            products?.filter((item) => item.category === category)
              ?.map((item, index) => (
              <View key={index} style={{ marginVertical: 12 }}>
                <ProductItem item={item} />
              </View>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
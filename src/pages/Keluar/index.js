import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { getData, storeData } from '../../utils/localStorage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import GetLocation from 'react-native-get-location';
import { getDistance, convertDistance } from 'geolib';
export default function Masuk({ navigation, route }) {
  const items = route.params.jenis;
  // console.log('hasil sebelumya', items);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [toleransi, setToleransi] = useState(0);
  const [data, setData] = useState({
    nama_lengkap: null,
    email: null,
    password: null,
    tlp: null,
    alamat: null,
  });

  const [kirim, setKirim] = useState({
    foto: null,
    jenis: 'PULANG',
    tipe: route.params.jenis,
  });
  const [jarak, setJarak] = useState(0);
  const options = {
    includeBase64: true,
    quality: 0.4,
    maxWidth: 300,
    maxHeight: 300,
  };

  const getCamera = xyz => {
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = { uri: response.uri };
        switch (xyz) {
          case 1:
            setData({
              ...data,
              foto: `data:${response.type};base64, ${response.base64}`,
            });
            setKirim({
              ...kirim,
              foto: `data:${response.type};base64, ${response.base64}`,
            });
            break;
        }
      }
    });
  };

  useEffect(() => {


    axios
      .get('https://absen.okeadmin.com/api/company.php')
      .then(tol => {
        setToleransi(tol.data.toleransi);
      });

    getData('user').then(res => {
      setData(res);
      console.log(res);
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          console.log(location);
          setLatitude(location.latitude);

          setLongitude(location.longitude);
          setLoading(false);
          setKirim({
            ...kirim,
            ref_member: res.id,
            latitude: location.latitude,
            longitude: location.longitude,
          });

          const ProsesJarak = getDistance(
            { latitude: res.user_latitude, longitude: res.user_longitude },
            { latitude: location.latitude, longitude: location.longitude },

            1,
          );
          setJarak(ProsesJarak);

        })
        .catch(error => {
          setLoading(false);
          const { code, message } = error;
          console.warn(code, message);
        });
    });
  }, []);

  const simpan = () => {

    if (kirim.foto == null) {
      alert('Foto Masih kosong, silahkan untuk selfie !');
    } else {

      if (jarak >= toleransi && data.dinas_luar == 'YA' && items == 'KANTOR') {

        alert('Maaf jarak toleransi Anda tidak sesuai, maksimal ' + toleransi + ' Meter dari titik ');
      }
      else {
        // setLoading(true);


        axios
          .post('https://absen.okeadmin.com/api/absen_add.php', kirim)
          .then(x => {
            setLoading(false);
            alert('Absensi Pulang Berhasil Di Kirim');
            console.error('respose server', x.data);
            navigation.navigate('MainApp');
          });
      }

    }
  };
  return (
    <SafeAreaView style={styles.page}>
      {/* <Image
        source={require('../../assets/logooren.png')}
        style={styles.image}
      /> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.black,
              fontSize: windowWidth / 30,
            }}>
            Latitude
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              color: colors.primary,
              fontSize: windowWidth / 30,
            }}>
            {latitude}
          </Text>
          {/* <Text>{data.latitude}</Text> */}
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.black,
              fontSize: windowWidth / 30,
            }}>
            Longitude
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              color: colors.primary,
              fontSize: windowWidth / 30,
            }}>
            {longitude}
          </Text>
          {/* <Text>{data.longitude}</Text> */}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* {data.dinas_luar == "YA" && route.params.jenis == "KANTOR" && ( */}

        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 30,
            color: colors.zavalabs
          }}>{items} - {jarak} Meter</Text>


        {/* )} */}


        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 25,
            marginBottom: 5,
          }}>
          ABSEN PULANG
        </Text>

        <View>
          <View
            style={{
              backgroundColor: colors.white,
              width: 250,
              height: 350,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Image
              source={{
                uri:
                  data.foto == null
                    ? 'https://zavalabs.com/nogambar.jpg'
                    : data.foto,
              }}
              style={{ width: 250, height: 350 }}
            />
          </View>
          <MyGap jarak={10} />
          <MyButton
            title="Ambil Foto"
            Icons="camera-outline"
            warna="gray"
            iconColor={colors.white}
            colorText={colors.white}
            onPress={() => getCamera(1)}
          />
        </View>
      </View>
      <MyButton
        title="PULANG SEKARANG"
        Icons="cloud-upload-outline"
        warna={colors.primary}
        iconColor={colors.white}
        colorText={colors.white}
        onPress={simpan}
      />

      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
  Image,
} from 'react-native';

const InsuranceScreen = ({navigation}) => {
  const insurances = [
    {
      insuranceProvider: 'زرعی ترقیاتی بینک لمیٹڈ (ZTBL)',
      policies: [
        {
          policyId: 'insa1',
          policyName: 'فصل بیمہ اسکیم',
          policyDetails:
            'ZTBL نے حکومت/اسٹیٹ بینک آف پاکستان کی ہدایات کے مطابق فصل قرضہ انشورنس سکیم (CLIS) کا آغاز کیا ہے۔ اس سکیم کی بنیادی خصوصیات درج ذیل ہیں:\n\nشرائط و ضوابط:\n\nپریمیم: ربیع اور خریف فصلوں کے لیے علیحدہ علیحدہ قرضوں کے لیے پریمیم 1.3% (تمام ٹیکسوں اور لیویوں سمیت) وصول کیا جائے گا۔ بینک چھوٹے کسانوں کے لیے پریمیم ادا کرے گا اور نصف سالانہ بنیاد پر حکومت سے ری ایمبرسمنٹ حاصل کرے گا۔\nزیادہ سے زیادہ قرض کی حد: انفرادی کیس میں 500,000 روپے۔\nمجموعی بیمہ: ہر سیزن کی منظور شدہ فصلوں (ربیع اور خریف) کے پیداواری قرض کے لیے جس کے لیے پریمیم ادا کیا گیا ہو۔\nشامل فصلیں: گندم، کپاس، گنا، چاول اور مکئی۔\nشامل خطرات: زیادہ بارش، سیلاب، خشک سالی، اولوں کا طوفان، کہر، ٹڈی دل کا حملہ، اور کیڑوں کا حملہ۔\nانشورنس کی مدت: بوائی/پودا لگانے کی تاریخ سے لے کر بیمہ شدہ فصل کی کٹائی مکمل ہونے تک۔\nمعاوضہ: حکومت کی جانب سے آفت زدہ علاقوں میں شامل بیمہ شدہ کھڑی فصل کے نقصان کی صورت میں مکمل معاوضہ ادا کیا جائے گا۔',
          policyLink:
            'https://ztbl.com.pk/agri-loan/crop-insurance-scheme/#:~:text=ZTBL%20has%20launched%20the%20Crop,this%20scheme%20are%20listed%20hereunder.&text=Premium%20will%20be%20charged%20%40%201.3,Rabi%20and%20Kharif%20crops%20separately.',
          policyImage: require('../Images/sun.png'),
        },
      ],
    },
    {
      insuranceProvider: 'اور دیگر شعبوں کے لیے سکیمیں SMEs ',
      policies: [
        {
          policyId: 'insb1',
          policyName: 'فصل قرضہ انشورنس اسکیم',
          policyDetails:
            'یہ اسکیم زراعتی برادری کو قدرتی آفات کے باعث ہونے والے نقصانات سے بچانے کے لیے بنائی گئی ہے۔\n\nیہ پانچ بڑی فصلوں یعنی گندم، کپاس، چاول، گنا اور مکئی کے تمام زرعی پیداوار کے قرضوں کے لیے قابل اطلاق اور لازمی ہے۔\n\nوفاقی حکومت مستحق قرض دہندگان کے لیے فی فصل فی موسم کے پریمیم کی قیمت برداشت کرتی ہے۔\n\nوہ قرض دہندگان جن کی زمین کی ملکیت 25 ایکڑ تک (بلوچستان کی صورت میں 32 ایکڑ تک) ہو، اس اسکیم کے تحت مستحق ہیں۔\n\nانشورنس قدرتی آفات جیسے زیادہ بارش، اولوں کا طوفان، کہر، سمندری طوفان، سیلاب، خشک سالی، اور فصل کی بیماریاں، کیڑوں کا حملہ وغیرہ کو شامل کرتی ہے۔',
          policyLink: 'https://www.sbp.org.pk/Incen-others/Agri-1.asp',
          policyImage: "require('../Images/sun.png')",
        },
      ],
    },
    {
      insuranceProvider: 'اور دیگر شعبوں کے لیے سکیمیں SMEs ',
      policies: [
        {
          policyId: 'insc1',
          policyName: 'Special Life Insurance',
          policyDetails: 'Life insurance with special rates for farmers.',
          policyLink: 'https://www.insurancec.com/policy/1',
          policyImage: require('../Images/sun.png'),
        },
        {
          policyId: 'insc2',
          policyName: 'Vehicle Insurance',
          policyDetails: 'Vehicle insurance for farm equipment.',
          policyLink: 'https://www.insurancec.com/policy/2',
          policyImage: require('../Images/sun.png'),
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>Available Insurance</Text>
      {insurances.map((insurance, index) => (
        <View key={index} style={styles.insuranceContainer}>
          <Text style={styles.insuranceProvider}>
            {insurance.insuranceProvider}
          </Text>
          {insurance.policies.map((policy, policyIndex) => (
            <TouchableOpacity
              key={policy.policyId}
              style={styles.policyContainer}
              onPress={() => navigation.navigate('InsuranceDetails', {policy})}>
              <View style={styles.imageContainer}>
                <Image source={policy.policyImage} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.policyName}>{policy.policyName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#4b830d',
  },
  insuranceContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  insuranceProvider: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
    textAlign: 'center',
  },
  policyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  policyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  policyDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default InsuranceScreen;

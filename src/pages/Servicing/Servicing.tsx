import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import FoodServiceItem from '../../components/shared/FoodServiceItem/FoodServiceItem';
import TaxiServiceItem from '../../components/shared/TaxiServiceItem/TaxiServiceItem';
import { useAppTheme } from '../../hooks/useAppTheme';
import CommonServicesItem from '../../components/shared/CommonServicesItem/CommonServicesItem';
import JobsServiceCard from '../../components/shared/JobsServiceCard/JobsServiceCard';
import { IScreenProps } from '../../interfaces';
import { useFocusEffect } from '@react-navigation/native';
import food from '../../mocks/foodServices.json';
import taxi from '../../mocks/taxi.json';
import common from '../../mocks/commonServices.json';
import commercial from '../../mocks/commercial_services.json';

import s from './Servicing.styles';

const foodServices = food.data;
const taxiServices = taxi.taxi_list_data;
const commonServices = common.commonServices_data;
const commercialServices = commercial.commercial_services_data;

const Servicing = ({ navigation, route }: IScreenProps<'Servicing'>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useAppTheme();

  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.isOpened) {
        setIsExpanded(true);
      }
      return () => {
        setIsExpanded(false);
      };
    }, [])
  );
  return (
    <ScrollView contentContainerStyle={s(theme).container}>
      <List.Accordion
        title="Food order"
        left={(props) => <List.Icon {...props} icon="food-turkey" />}
      >
        {foodServices.map((item) => {
          return <FoodServiceItem key={item.name} item={item} />;
        })}
      </List.Accordion>

      <List.Accordion
        title="Taxi"
        left={(props) => <List.Icon {...props} icon="taxi" />}
      >
        {taxiServices.map((item) => {
          return <TaxiServiceItem key={item.name} item={item} />;
        })}
      </List.Accordion>
      <List.Accordion
        title="Communal institutions"
        left={(props) => <List.Icon {...props} icon="office-building" />}
      >
        {commonServices.map((item) => {
          return <CommonServicesItem key={item.name} item={item} />;
        })}
      </List.Accordion>
      <List.Accordion
        expanded={isExpanded}
        onPress={toggleExpand}
        title="Commercial services"
        left={(props) => <List.Icon {...props} icon="human-dolly" />}
      >
        <View style={s(theme).commercialWrapper}>
          {commercialServices.map((item, index) => {
            return <JobsServiceCard key={index} service={item} />;
          })}
        </View>
      </List.Accordion>
    </ScrollView>
  );
};

export default Servicing;

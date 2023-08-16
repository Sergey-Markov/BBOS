import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import FoodServiceItem from '../../components/shared/FoodServiceItem/FoodServiceItem';
import TaxiServiceItem from '../../components/shared/TaxiServiceItem/TaxiServiceItem';
import { useAppTheme } from '../../hooks/useAppTheme';
import CommonServicesItem from '../../components/shared/CommonServicesItem/CommonServicesItem';
import JobsServiceCard from '../../components/shared/JobsServiceCard/JobsServiceCard';
import { IScreenProps, JobsServiceCardType } from '../../interfaces';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { globalDataSelector } from '../../redux/reducers/globalDataReducer';

import s from './Servicing.styles';

export type TTaxiItem = {
  name: any;
  id?: string | number | undefined;
  tel?: string[];
  url?: string;
};
export type TFoodServiceItem = {
  name: any;
  id?: string | number | undefined;
  tel?: string[];
  url?: string;
  address?: string;
};
export type TCommonServicesItem = {
  name: any;
  id?: string | number | undefined;
  tel?: string[];
  address?: string;
};

const Servicing = ({ navigation, route }: IScreenProps<'Servicing'>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useAppTheme();

  const globalData = useSelector(globalDataSelector)[0];
  const { foodServices, taxi, commonServices, commercial_services } =
    globalData;

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
        {foodServices.map((item: TFoodServiceItem) => {
          return <FoodServiceItem key={item.name} item={item} />;
        })}
      </List.Accordion>

      <List.Accordion
        title="Taxi"
        left={(props) => <List.Icon {...props} icon="taxi" />}
      >
        {taxi.map((item: TTaxiItem) => {
          return <TaxiServiceItem key={item.name} item={item} />;
        })}
      </List.Accordion>
      <List.Accordion
        title="Communal institutions"
        left={(props) => <List.Icon {...props} icon="office-building" />}
      >
        {commonServices.map((item: TCommonServicesItem) => {
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
          {commercial_services.map(
            (item: JobsServiceCardType, index: number) => {
              return <JobsServiceCard key={index} service={item} />;
            }
          )}
        </View>
      </List.Accordion>
    </ScrollView>
  );
};

export default Servicing;

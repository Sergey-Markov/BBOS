import React, { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult as ExpoImagePickerResult } from 'expo-image-picker';
import { Image, ImageURISource, Pressable, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useAppTheme } from '../../../hooks/useAppTheme';
import _ from 'lodash';

import s from './ImgPicker.styles';

type ImagePickerResult = ExpoImagePickerResult & { cancelled?: boolean };

const processImage = (image: ImagePickerResult) => {
  delete image.cancelled;
  return image;
};

const ImgPicker = ({ data, onChange, onReset, multiple = false }: any) => {
  const theme = useAppTheme();

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: !multiple,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: multiple,
    });

    const img = processImage(result);
    if (!img.assets) {
      return;
    }

    if (data?.assets.length > 0 && multiple) {
      const newSelectedImages = img.assets;
      const oldSelectedImages = data.assets;
      const filteredImages = _.uniqBy(
        [...oldSelectedImages, ...newSelectedImages],
        'assetId'
      );

      const addedImages = {
        assets: filteredImages,
      };
      onChange(addedImages);
      return;
    }
    onChange(img);
  }, []);

  const deleteImgHandler = useCallback((src: string) => {
    if (data?.assets.length > 1) {
      const imagesFilter = data.assets.filter(
        ({ uri }: ImageURISource) => src !== uri
      );
      const result = {
        assets: imagesFilter,
      };
      onChange(result);
      return;
    }
    onReset();
  }, []);

  return (
    <View style={s(theme).container}>
      {data && data?.assets.length > 0 ? (
        data.assets.map(({ uri }: ImageURISource, index: number) => {
          return (
            <Pressable key={index} onPress={pickImage}>
              <Image source={{ uri: uri }} style={s(theme).img} />
              <IconButton
                icon="close"
                iconColor={theme.colors.primary}
                size={15}
                onPress={() => deleteImgHandler(uri as string)}
                style={s(theme).icon}
              />
            </Pressable>
          );
        })
      ) : (
        <IconButton
          icon="camera"
          size={90}
          iconColor={theme.colors.primary}
          onPress={pickImage}
        />
      )}
    </View>
  );
};

export default ImgPicker;

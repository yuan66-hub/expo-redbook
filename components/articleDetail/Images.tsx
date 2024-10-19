import { ImageSlider } from '../ImageSlider';
import { View, StyleSheet } from 'react-native';

export default function Images({ images }: { images: any[] }) {
  if (!images?.length) {
    return null;
  }
  const data: any[] = images.map((i) => {
    return { img: i };
  });
  return (
    <View style={{ paddingBottom: 30 }}>
      <ImageSlider
        data={data}
        autoPlay={false}
        closeIconColor="white"
        caroselImageStyle={{ height: 400 }}
        indicatorContainerStyle={{ bottom: -40 }}
        activeIndicatorStyle={styles.activeDot}
        inActiveIndicatorStyle={styles.inActiveDot}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  activeDot: {
    width: 6,
    height: 6,
    backgroundColor: '#ff2442',
    borderRadius: 3,
  },
  inActiveDot: {
    width: 6,
    height: 6,
    backgroundColor: '#c0c0c0',
    borderRadius: 3,
  },
});

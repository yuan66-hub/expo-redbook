import { Text, StyleSheet, View } from 'react-native';

export default function Info({
  detail,
  tags = [],
}: {
  detail: Article | any,
  tags: any[],
}) {
  const tagStr = tags.map((i) => `# ${i}`).join(' ');
  return (
    <>
      <Text style={styles.articleTitleTxt}>{detail.title}</Text>
      <Text style={styles.descTxt}>{detail.desc}</Text>
      <Text style={styles.tagsTxt}>{tagStr}</Text>
      <Text style={styles.timeAndLocationTxt}>
        {detail.dateTime} {detail.location}
      </Text>
      <View style={styles.line} />
    </>
  );
}

const styles = StyleSheet.create({
  articleTitleTxt: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  descTxt: {
    fontSize: 15,
    color: '#333',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  tagsTxt: {
    fontSize: 15,
    color: '#305090',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  timeAndLocationTxt: {
    fontSize: 12,
    color: '#bbb',
    marginVertical: 16,
    marginLeft: 16,
  },
  line: {
    marginHorizontal: 16,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
  },
});

import {StyleSheet, View} from 'react-native';

export function Card({children}: any) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
  },
  card: {
    // justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    elevation: 3,
  },
  firstHalf: {
    flex: 1,
  },
  idText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 12,
  },
  stateText: {
    fontSize: 14,
    color: 'gray',
  },
  secondHalf: {
    flex: 1,
    alignItems: 'flex-end',
  },
  pickupText: {
    fontSize: 14,
    color: 'green',
    paddingBottom: 12,
  },
  viewDetailButton: {
    backgroundColor: '#7529f6',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginTop: 12,
  },
  viewDetailButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    width: '100%',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

import React, {FC, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from '../../../general/Card';
import Button from '../../../general/Button';
import {TripDetails} from './TripDetails';
// import Button from '../../../Button';

interface CardProps {
  id: string;
  state: string;
  pickupAt: string;
  tripData: object;
  onCancel: () => void;
}

const TripsCard: FC<CardProps> = ({
  id,
  tripData,
  state,
  pickupAt,
  onCancel,
}) => {
  const [openDetails, setOpenDetails] = useState(false);

  const onView = () => {
    setOpenDetails(prevState => !prevState);
  };
  return (
    <Card>
      {/* First half of the card */}

      <View style={styles.topHeader}>
        <View style={styles.firstHalf}>
          <Text style={styles.idText}>ID: {id}</Text>
          <Text style={styles.stateText}>State: {state}</Text>
        </View>

        {/* Second half of the card */}
        <View style={styles.secondHalf}>
          <Text style={styles.pickupText}>Pickup at: {pickupAt}</Text>
          <Button
            buttonStyles={styles.cancelButton}
            onPress={onCancel}
            textStyles={styles.cancelButtonText}>
            Cancel
          </Button>
        </View>
      </View>

      <View>
        <Button
          buttonStyles={styles.viewDetailButton}
          onPress={onView}
          textStyles={styles.viewDetailButtonText}>
          View Details
        </Button>
      </View>
      {openDetails ? (
        <View>
          <TripDetails tripData={tripData} />
        </View>
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
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

export default TripsCard;

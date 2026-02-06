import { useState } from 'react';
import { Button, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [shortTermGoals, setShortTermGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }
  const addGoalHandler = () => {
    if (enteredGoalText.trim().length === 0) return; // Prevent adding empty goals
    setShortTermGoals((currentGoals) => [...currentGoals, { text: enteredGoalText, key: Math.random().toString() }]);
    setEnteredGoalText(''); // Clear the input field after adding a goal
  };

  const deleteGoalHandler = (key) => {
    setShortTermGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.key !== key);
    });
  };

  const openModalHandler = () => setIsModalVisible(true);
  const closeModalHandler = () => setIsModalVisible(false);

  return (
    <View style={styles.appContainer}>
      <Button title="Add New Goal" onPress={openModalHandler} />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Your Goal"
            onChangeText={goalInputHandler}
            value={enteredGoalText} // Bind input value to state
          />
          <Button title="Add Goal" onPress={() => { addGoalHandler(); closeModalHandler(); }} />
        </View>
      </Modal>
      <View style={styles.goalsContainer}>
        <FlatList data={shortTermGoals} renderItem={(itemData) => {
          return (
            <Pressable onPress={() => deleteGoalHandler(itemData.item.key) } android_ripple={{color: '#ddddf0'}}>
              <View> 
                <Text style={styles.eachGoal}>{itemData.item.text}</Text>
              </View>
            </Pressable>
          );
        }}>
        </FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#ddddf0',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    marginBottom: 25,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#0000cc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#0000ff',
    width: '70%',
    marginBottom: 8,
  },
  goalsContainer: {
    flex: 5,
    marginTop: 16,
  },
  eachGoal: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'royalblue',
    color: 'lightgray',
  },
});

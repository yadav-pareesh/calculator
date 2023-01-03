import React, {useEffect, useState} from 'react';
import Iicons from 'react-native-vector-icons/Ionicons';
import Ficons from 'react-native-vector-icons/Feather';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';

const items = [
  ['AC', '/', 'x'],
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['.', '0', '%'],
];
const buttonGroup2 = ['back', '-', '+', '='];

const Main = () => {
  const [input, setInput] = useState('');
  const [operation, setOperation] = useState({value: '', type: ''});
  const [bothValues, setBothValues] = useState({preValue: '', postValue: ''});
  const [result, setResult] = useState('');

  useEffect(() => {
    setResult(input);
    setInput('');
    if (operation.type === 'plus') {
      setOperation({
        type: 'plus',
        value:
          parseFloat(bothValues.preValue) + parseFloat(bothValues.postValue),
      });
    } else if (operation.type === 'minus')
      setOperation({
        type: 'minus',
        value:
          parseFloat(bothValues.preValue) - parseFloat(bothValues.postValue),
      });
    else if (operation.type === 'divide')
      setOperation({
        type: 'divide',
        value:
          parseFloat(bothValues.preValue) / parseFloat(bothValues.postValue),
      });
    else if (operation.type === 'multiply')
      setOperation({
        type: 'multiply',
        value:
          parseFloat(bothValues.preValue) * parseFloat(bothValues.postValue),
      });
    else if (operation.type === 'remainder')
      setOperation({
        type: 'remainder',
        value:
          parseFloat(bothValues.preValue) % parseFloat(bothValues.postValue),
      });
    else {
    }
  }, [bothValues]);

  const pressedValue = value => {
    if (value === 'back') {
      setInput(input?.substring(0, input?.length - 1));
      setOperation({value: '', type: ''});
    } else if (value === 'AC') {
      setInput('');
      setOperation({value: '', type: ''});
      setResult('');
    } else if (value === '=') {
      if (input.search(/[+]/) != -1) {
        setBothValues({
          preValue: input.slice(0, input.indexOf('+')),
          postValue: input.slice(input.indexOf('+') + 1, input.length),
        });
        setOperation({...operation, type: 'plus'});
      } else if (input.search('-') !== -1) {
        setBothValues({
          preValue: input.slice(0, input.indexOf('-')),
          postValue: input.slice(input.indexOf('-') + 1, input.length),
        });
        setOperation({...operation, type: 'minus'});
      } else if (input.search('/') !== -1) {
        setBothValues({
          preValue: input.slice(0, input.indexOf('/')),
          postValue: input.slice(input.indexOf('/') + 1, input.length),
        });
        setOperation({...operation, type: 'divide'});
      } else if (input.search('x') !== -1) {
        setBothValues({
          preValue: input.slice(0, input.indexOf('x')),
          postValue: input.slice(input.indexOf('x') + 1, input.length),
        });
        setOperation({...operation, type: 'multiply'});
      } else if (input.search('%') !== -1) {
        setBothValues({
          preValue: input.slice(0, input.indexOf('%')),
          postValue: input.slice(input.indexOf('%') + 1, input.length),
        });
        setOperation({...operation, type: 'remainder'});
      } else setOperation({...operation, type: 'not matched'});
    } else setInput(input + value);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}>
        <Text style={{alignSelf: 'center'}}>
          Calculation between two numbers
        </Text>
        <Text
          style={[
            styles.text,
            {
              flex: 1,
              textAlign: 'right',
              textAlignVertical: 'bottom',
              paddingRight: 12,
            },
          ]}>
          {result}
        </Text>
        <Text style={[styles.result]}>
          {operation.value && '= '}
          {operation.value}
        </Text>
        <TextInput
          placeholder="..."
          showSoftInputOnFocus={false}
          onKeyPress={Keyboard.dismiss()}
          autoFocus={true}
          style={styles.input}
          defaultValue={input}
          onChangeText={value => setInput(value)}
          value={input}
        />
      </View>

      <View style={styles.viewContainer}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          {items.map((item, i) => (
            <View style={styles.buttonContainer} key={i}>
              {item.map((value, j) => (
                <TouchableOpacity
                  key={j}
                  style={[styles.button, {backgroundColor: '#2C3333'}]}
                  onPress={() => pressedValue(value)}>
                  <Text
                    style={[
                      styles.text,
                      {color: i === 0 ? '#C85C8E' : 'white'},
                    ]}>
                    {value === '/' ? <Ficons name="divide" size={30} /> : value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <View style={{flex: 0.3, flexDirection: 'column'}}>
          {buttonGroup2.map((item, index) => (
            <View style={styles.buttonContainer} key={index}>
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,

                  item === '=' ? {height: 160} : {height: 80},
                  {backgroundColor: '#C85C8E'},
                ]}
                onPress={() => pressedValue(item)}>
                <Text style={styles.text}>
                  {item === 'back' ? (
                    <Iicons name="backspace" size={30} />
                  ) : (
                    item
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#fff',
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191919',
    height: 80,
    borderColor: '#000',
    borderWidth: 1,
  },
  input: {
    flex: 0.8,
    fontSize: 48,
    alignSelf: 'flex-end',
    paddingRight: 12,
  },
  text: {
    color: '#fff',
    fontSize: 25,
    height: 40,
  },
  result: {
    textAlign: 'right',
    textAlignVertical: 'bottom',
    paddingRight: 12,
    marginTop: 12,
    color: '#fff',
    fontSize: 36,
    height: 40,
  },
});
export default Main;

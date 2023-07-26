import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    SafeAreaView,
    StyleSheet,
    ScrollView
} from 'react-native';

export default function AddRecipeScreen({ navigation }) {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [ingredients, setIngredients] = useState([{ ingredient: '', measurement: '' }]);

    const handleIngredientChange = (text, index) => {
        const newIngredients = [...ingredients];
        newIngredients[index].ingredient = text;
        setIngredients(newIngredients);
    };

    const handleMeasurementChange = (text, index) => {
        const newIngredients = [...ingredients];
        newIngredients[index].measurement = text;
        setIngredients(newIngredients);
    };

    const addIngredientField = () => {
        setIngredients([...ingredients, { ingredient: '', measurement: '' }]);
    };

    const handleSubmit = () => {
        navigation.navigate('Home', { newRecipe: { name, details, ingredients } });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Recipe Name</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Recipe Name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Details</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Details"
                    value={details}
                    onChangeText={setDetails}
                    multiline
                />

{ingredients.map((ingredientObj, index) => (
    <View key={index} style={styles.ingredientContainer}>
        <Text style={styles.label}>Ingredient</Text>
        <TextInput
            style={styles.inputBox}
            placeholder="Enter Ingredient"
            value={ingredientObj.ingredient}
            onChangeText={(text) => handleIngredientChange(text, index)}
        />

        <Text style={styles.label}>Measurement</Text>
        <TextInput
            style={styles.inputBox}
            placeholder="Enter Measurement"
            value={ingredientObj.measurement}
            onChangeText={(text) => handleMeasurementChange(text, index)}
        />
    </View>
))}

                <Button title="Add Ingredient" onPress={addIngredientField} />
                <Button title="Submit" onPress={handleSubmit} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    inputBox: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        marginVertical: 10,
    },
    ingredientContainer: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
});




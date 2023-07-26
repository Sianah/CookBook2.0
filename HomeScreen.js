import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation, route }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (route.params?.newRecipe) {
            setRecipes(prevRecipes => [...prevRecipes, route.params.newRecipe]);
        }
    }, [route.params?.newRecipe]);
    const deleteRecipe = (indexToDelete) => {
        setRecipes(prevRecipes => prevRecipes.filter((_, index) => index !== indexToDelete));
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button title="Add Recipe" onPress={() => navigation.navigate('AddRecipe')} />
                <Text style={styles.title}>Home</Text>
                <Button title="View Calendar" onPress={() => navigation.navigate('ViewCalendar')} />
            </View>
            
            <FlatList
    data={recipes}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item, index }) => (
        <View style={styles.recipeContainer}>
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text style={styles.recipeDetails}>{item.details}</Text>
            {item.ingredients.map((ing, i) => (
                <Text key={i} style={styles.ingredient}>
                    {ing.ingredient} - {ing.measurement}
                </Text>
            ))}
            <Button title="Delete" onPress={() => deleteRecipe(index)} />
        </View>
    )}
/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    recipeContainer: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        backgroundColor: '#f8f8f8', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    recipeDetails: {
        marginVertical: 8,
    },
    ingredient: {
        fontSize: 16,
    },
});




import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddRecipeScreen from './AddRecipeScreen'; // Assuming AddRecipeScreen.js is in the same directory
import ViewCalendarScreen from './ViewCalendarScreen';



const Stack = createStackNavigator();

function Home({ navigation, route }) {
    const [recipes, setRecipes] = useState([]);

    if (route.params?.newRecipe) {
        if (!recipes.some(r => r.name === route.params.newRecipe.name)) {
            setRecipes(prev => [...prev, route.params.newRecipe]);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => alert(item.details)}>
                        <Text>{item.name}</Text>
                        <Button title="Delete" onPress={() => {
                            setRecipes(recipes.filter(r => r.name !== item.name))
                        }} />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

function AddRecipe({ navigation }) {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');

    const handleSubmit = () => {
        navigation.navigate('Home', { newRecipe: { name, details } });
    };

    return (
        <SafeAreaView>
            <TextInput placeholder="Recipe Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Details" value={details} onChangeText={setDetails} multiline />
            {/* Add more input fields for ingredients and quantities here */}
            <Button title="Submit" onPress={handleSubmit} />
        </SafeAreaView>
    );
}

function ViewCalendar() {
    return (
        <SafeAreaView>
            {/* Implement your calendar component here. For simplicity, I'm using a placeholder text. */}
            <Text>Calendar Placeholder</Text>
        </SafeAreaView>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home" 
                    component={Home} 
                    options={({ navigation }) => ({
                        headerTitle: "Home",
                        headerLeft: () => (
                            <Button title="Add Recipe" onPress={() => navigation.navigate('AddRecipe')} />
                        ),
                        headerRight: () => (
                            <Button title="View Calendar" onPress={() => navigation.navigate('ViewCalendar')} />
                        ),
                    })}
                />
                <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />

                <Stack.Screen name="ViewCalendar" component={ViewCalendarScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}


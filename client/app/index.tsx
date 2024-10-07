import { Text, View, StyleSheet } from 'react-native';

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Expo App</Text>
            <Text style={styles.subtitle}>Upload Demo Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6FA',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#1F2D56',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#4C5C7E',
    },
});

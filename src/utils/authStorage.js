import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const token = await AsyncStorage.getItem(
            `${this.namespace}:authToken`,
        );
    
        return token ? JSON.parse(token) : null;
    }

    async setAccessToken(accessToken) {
        await AsyncStorage.setItem(
            `${this.namespace}:authToken`,
            JSON.stringify(accessToken),
        );
        console.log('auth token set');
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}:authToken`);
        console.log('auth token removed');
    }
}

export default AuthStorage;
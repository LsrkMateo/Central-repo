
// Función para obtener una URL de imagen aleatoria de robohash
const getRandomAvatar = async (email) => {
    try {
        // Realiza una solicitud a la API de robohash
        const response = await fetch(`https://robohash.org/${email}`);

        return response;
    } catch (error) {
        console.error('Error al obtener el avatar aleatorio:', error);
        return null;
    }
};

export default getRandomAvatar;

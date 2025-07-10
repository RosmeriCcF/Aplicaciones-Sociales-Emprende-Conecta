// Configuración base de la API
const API_BASE_URL = 'http://localhost:8000'; // Cambia por tu URL de backend

// Función para realizar login - Usando JSON (ajustada para /auth/login)
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error en el login');
        }

        const data = await response.json();

        // Guardar token en localStorage
        localStorage.setItem('authToken', data.token);

        return {
            success: true,
            data: data,
            message: 'Login exitoso'
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};



// Función para realizar registro - Usando FormData (por el archivo logo)
export const registerUser = async (userData) => {
    try {
        const formData = new FormData();

        // Agregar campos obligatorios
        formData.append('tipo', userData.tipo); // UserRole enum value
        formData.append('nombre', userData.nombre);
        formData.append('correo', userData.correo);
        formData.append('contrasena', userData.contrasena);

        // Agregar campos opcionales si existen
        if (userData.nombre_emprendimiento) {
            formData.append('nombre_emprendimiento', userData.nombre_emprendimiento);
        }
        if (userData.ubicacion) {
            formData.append('ubicacion', userData.ubicacion);
        }
        if (userData.ruc) {
            formData.append('ruc', userData.ruc);
        }
        if (userData.logo) {
            formData.append('logo', userData.logo); // File object
        }

        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error en el registro');
        }

        const data = await response.json();

        return {
            success: true,
            data: data,
            message: 'Registro exitoso'
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

// Función para logout
export const logoutUser = () => {
    localStorage.removeItem('authToken');
    return {
        success: true,
        message: 'Logout exitoso'
    };
};

// Función para obtener el token guardado
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
    const token = getAuthToken();
    return token !== null;
};

// Función para decodificar el token JWT (opcional)
export const decodeToken = () => {
    const token = getAuthToken();
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch (error) {
        console.error('Error decodificando token:', error);
        return null;
    }
};

// Función para realizar peticiones autenticadas
export const authenticatedFetch = async (url, options = {}) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('No hay token de autenticación');
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Token expirado o inválido
        logoutUser();
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
    }

    return response;
};

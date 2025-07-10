import api from '../lib/axios';

// Servicios de autenticación
export const authService = {
  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Obtener información del usuario actual
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Registro de emprendedor
  registerEmprendedor: async (formData) => {
    const response = await api.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Registro de cliente
  registerCliente: async (userData) => {
    const response = await api.post('/auth/register', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Servicios de productos
export const productService = {
  // Obtener todos los productos
  getProductos: async () => {
    const response = await api.get('/producto/list');
    return response.data;
  },

  // Crear producto
  createProducto: async (productData) => {
    const response = await api.post('/producto/create', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Servicios de emprendimientos
export const emprendimientoService = {
  // Obtener emprendimientos
  getEmprendimientos: async () => {
    const response = await api.get('/emprendimiento/list');
    return response.data;
  },
};

// Servicios de categorías
export const categoryService = {
  // Obtener categorías
  getCategorias: async () => {
    const response = await api.get('/categories/list');
    return response.data;
  },
};

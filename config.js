import dotenv from 'dotenv';

// Cargar variables de entorno desde un archivo específico
dotenv.config({ path: './claveToken.env' });

export const jwtSecret = process.env.JWT_SECRET;

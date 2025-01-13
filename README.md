# Ajustes previos

Renombrar el archivo .env.template a .env en la raíz del proyecto

### Importar SQL

- importar al motor de BBDD el arquivo reservas.sql que está en la raíz
- añadir el user y pass al archivo backend/.env

### Instalar el backend

Instalar lo siguiente, si no lo tienes instalado:

- Node.js (versión recomendada: >=18.x)
- npm install -g yarn
- npm install -g @nestjs/cli
- cd backend y desde allí **yarn install**

### Ejecutar el servidor en desarrollo

Inicia el servidor NestJS en modo desarrollo:

```
yarn start:dev

```

Por defecto, el servidor estará disponible en:
http://localhost:3000

# Levantar el frontend

Abrir una nueva terminal y cambiar al directorio raiz.

- y desde allí **yarn install**
- seguidamente **yarn dev**

Por defecto, el frontend estará disponible en:
http://localhost:5173/

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/M6x3p3QZ)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15106131)
# TradeWing

[comment]: # (Incluir una breve descripción del proyecto en una o dos frases como mucho)

Aplicación web destinada a la compra/venta de objetos con una interacción directa entre el cliente y el vendedor. La aplicación esta escrita en JavaScript, usando modulos como Express.js, mongoose, cookie-parser... Las partes funcionales de la aplicacion son un inicio de sesion completamente seguro, no se podra iniciar sesion sin credenciales válidas, un sistema de registro en la aplicación para poder crear cuentas para su posterior uso, y un dashboard en el que se podrá buscar objetos de interes, con la posibilidad de poder tener una vista previa del objeto sin tener que comprarlo para poder ver su estado. 

[comment]: # (Incluir un GIF o una captura de pantalla de la página principal del proyecto. Utilizar el directorio docs para almacenar dicha imagen)

![Funcionamiento de la aplicación web](docs/overview.jpg)

## Tabla de contenidos

* [Introducción](#introducción)
  * [Características](#características)
  * [Tecnologías](#tecnologías)
* [Uso de la aplicación](#uso-de-la-aplicación)
  * [Instalación](#instalación)
  * [Configuración](#configuración)
  * [Ejecución](#ejecución)
* [Créditos](#créditos)

## Introducción

### Características

[comment]: # (Enumerar las principales características que ofrece la aplicación web, siguiendo el formato:)

* Sistema de registro, inicio y cierre de sesión.
* Catálogo de productos (precio, descripción, imagen, etc).
* Carrito de compra (añadir y retirar productos).
* Perfil de usuario (mostrar datos usuario y productos que el usuario ha puesto en venta).
* Pestaña de ayuda (breve explicación sobre cómo usar la aplicación).

### Tecnologías

[comment]: # (Enumerar todas las APIs o librerías externas utilizadas en el proyecto pero sin mencionar las APIs DOM y fetch, Express ni Mongoose. El formato será como sigue:)

Este proyecto ha sido desarrollado utilizando:

* [Express](https://expressjs.com/) - Framework web
* [Mongoose](https://mongoosejs.com/) - ODM para trabajar con una base de datos MongoDB

## Uso de la aplicación

[comment]: # (Describir cómo instalar, configurar y ejecutar la aplicación web. El formato será como sigue:)

### Instalación

Clonar este repositorio y ejecutar desde el directorio raíz el siguiente comando para instalar las dependencias:

```bash
$ npm install
```

[comment]: # (Si es necesario hacer alguna tarea más compleja, como por ejemplo compilar código SASS, indicar a continuación cómo se debería hacer. Este tipo de tareas deberán estar automatizadas con npm build)

Antes de desplegar la aplicación, es necesario generar el frontend utilizando el siguiente comando desde el directorio raíz:

```bash
$ npm build
```

### Para iniciar sesion usando comandos en mongodb

```bash
$ mongosh "mongodb+srv://cluster-tradewing.ib4iwvc.mongodb.net/" --apiVersion 1 --username admin
```

### Configuración

[comment]: # (Enumerar todos los parámetros configurables de la aplicación web, sin incluir ningún dato sensible)

Crear un fichero `.env` en el directorio raíz que defina las siguientes variables de entorno:

```bash
# Puerto utilizado por el servidor de la aplicación
WEBAPP_PORT=3000
# URI de la base de datos
WEBAPP_DB_URI="mongodb+srv://admin:admin@cluster-tradewing.ib4iwvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-TradeWing"
# Credenciales para mongodb
USER="admin"
PASSWORD="admin"
JWT_TOKEN_SECRET="4eb51a8770e15fc12211b53f1f22a615c754899d7f80bea160335f2baba61a26"
```

### Ejecución

Para ejecutar la aplicación web, ejecutar el siguiente comando desde el directorio raíz:

```bash
$ npm start
$ npm run dev # Durante el desarrollo
```

## Créditos

Este proyecto ha sido desarrollado por el grupo *código del grupo*, formado por:

* Victor Acevedo Hernandez
* Pablo De Baro Escapa
* Marco Fernández Llamas
* Javier García Turiel
* Mateo González Alonso

# sistema-de-solicitud-comparte-por-una-vida
Proyecto Universidad CUFM
#Pasos a seguit para instalacion de proyecto
Primero debemos instalar nodejs en nuestras pc's
Posteriormente instalamos git en nuestras pc's
hacemos una instalacion de node mediante el siguiente comando: 
$ npm i express-handlebars express-sesion mysql express-mysql-session morgan bcryptjs passport passport-local timeago.js connect-flash express-validator
- Handlebars es un motor de plantillas.
- express-sesion Administra las sessiones de nuestra app. Sera necesario para autenticar a un usuario.
- mysql lo usamos para este modulo no es la base de datos, sino que sirve para conectarnos a la base de datos
- express-mysql-session este modulo almacenara las sessiones en la base de datos, en lugar del servidor. Esto es ideal cuando la aplicacion este en produccion
- morgan es un modulo que nos permite crear logs o mensajes de ques lo que las aplicaciones clientes estan pidiendo al servidor
- bcryptjs es un modulo que usaremos para cifrar las contrasenas de los usuarios antes de guardarlos en la base de datos
- passport es un modulo para autenticar y manejar el proceso de login de un usuario en nuestra aplicacion
- passport-local es un complemento de passport para autenticar a los usuarios con nuestra propia base de datos
- Convierte los timestanos o fechas de la base de datos en un formato de: 2 minutes ago, 2 hours ago, etc
- connect-flash lo usaremos para mostrar mensajes de error y exito cuando el usuario realice una operacion
- express-validator es un modulo para validar los datos que el usuario nos envia desde la aplicacion cliente 



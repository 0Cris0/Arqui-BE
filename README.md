# 2025-1 / IIC2173 - E0 | Stock Market Async

***Fecha de entrega:** 31/03/2025 - 3 Semanas*

## Dominio
URL: *`https://primordialdomain.me/`*
IP de la instancia EC2: *`34.192.236.26`*

## Consideraciones generales y puntos logrados
De momento en la aplicación **se encuentran implementados** todos los **requisitos funcionales** (API funcional, endpoints, paginación y filtros en endpoint de symbol) y **requisitos no funcionales** (conexión MQTT al broker mediante listener_mqtt, uso de proxy inverso NGINX, servidor con nombre de dominio y corriendo en EC2, base de datos Postgres con permanencia que se conecta a la aplicación mediante docker-compose ya que tanto la BD, api y listener son contenedores)

También se implementó completamente **docker-compose** (se puede lanzar la app con docker compose y tanto el listener como la BD se encuentra integrada con la api por esa vía) y en la **parte variable** solo **HTTPS** (dominio asegurado con Let's encrypt, redireccionamiento HTTP a HTTPS y checkeo de expiración de certificado SSL 2 veces al día)

En cuanto al **balanceo de carga con Nginx**, todavía no lo hago.

### Endpoints
* *`{url}/stocks`*: Muestra el listado paginado de todos los stocks
* *`{url}/stocks/:symbol`*: Muestra el listado paginado de todos los stocks que compartan dicho * *`symbol`*
    Admite queryParams: *`page, count, price, quantity, date`*, en cualquier combinación y permitiendo con count cambiar la cantidad de stock desplegados

### Método de acceso al servidor con SSH
Descargar las credenciales .pem y abrir una terminal en la carpeta donde han sido guardadas, ejecutando el siguiente código para poder acceder al servidor EC2:
*`ssh -i {nombre_pem_keys} ubuntu@ec2-34-192-236-26.compute-1.amazonaws.com`*

### Configuración de Nginx
Se encuentra en el archivo *`api.conf`* ubicado dentro de este mismo directorio

# [** ]No olvidar: actualizar cualquier progreso en balanceo


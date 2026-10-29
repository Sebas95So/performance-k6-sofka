PRUEBA DE CARGA DE LOGIN CON K6
================================

1. DESCRIPCIÓN

Este proyecto realiza una prueba de carga sobre el servicio de autenticación de Fake Store API, utilizando Grafana k6.

El objetivo es evaluar el comportamiento del servicio mediante solicitudes HTTP POST, midiendo la tasa de solicitudes, el tiempo de respuesta y los fallos detectados durante la ejecución.

Endpoint:
https://fakestoreapi.com/auth/login

Método HTTP: POST

Formato del cuerpo: JSON


2. TECNOLOGÍAS Y VERSIONES

- Sistema operativo utilizado: Ubuntu Linux.
- Herramienta de pruebas de carga: Grafana k6 v2.3.0.
- Lenguaje del script: JavaScript compatible con k6.
- Formato de datos de entrada: CSV.
- Protocolo de comunicación: HTTPS.

No se requieren dependencias externas de JavaScript para ejecutar el script.


3. ESTRUCTURA DEL PROYECTO

performance-k6/
├── data/
│   └── credenciales.csv
├── results/
│   ├── resultado.json
│   └── resultado_final.json
├── script.js
├── readme.txt
└── conclusiones.txt

Los archivos JSON contienen las métricas detalladas de las ejecuciones que fueron guardadas. Si alguno de estos archivos todavía no existe en el repositorio, se generará al ejecutar el comando correspondiente de la sección 7.


4. REQUISITOS PREVIOS

Antes de ejecutar la prueba, se requiere:

- Ubuntu Linux o un entorno compatible con k6.
- Grafana k6 v2.3.0.
- Acceso a Internet.
- Acceso al endpoint de la API.
- Los archivos script.js y data/credenciales.csv.

Verificar la versión instalada:

k6 version

La versión utilizada para desarrollar y ejecutar esta prueba fue k6 v2.3.0.


5. INSTALACIÓN DE K6 EN UBUNTU

Si k6 no está instalado, consultar las instrucciones oficiales de instalación para Ubuntu/Debian:

https://grafana.com/docs/k6/latest/set-up/install-k6/

Seguir las instrucciones para configurar el repositorio oficial e instalar k6.

Después de la instalación, verificar la versión con:

k6 version

Para reproducir los resultados originales, utilizar la misma versión de k6 empleada en la ejecución de referencia: v2.3.0.


6. CONFIGURACIÓN DE LA PRUEBA

El script script.js realiza las siguientes operaciones:

1. Lee el archivo data/credenciales.csv.
2. Separa las filas del CSV y obtiene los usuarios y contraseñas.
3. Selecciona una credencial para cada iteración.
4. Construye el cuerpo de la solicitud en formato JSON.
5. Envía una petición HTTP POST al endpoint de autenticación.
6. Verifica que la respuesta tenga código HTTP 201.

La configuración de carga utilizada es:

- Estrategia de ejecución: constant-arrival-rate.
- Tasa programada: 21 iteraciones por segundo.
- Unidad de tiempo: 1 segundo.
- Duración: 30 segundos.
- Usuarios virtuales preasignados: 50.
- Máximo de usuarios virtuales: 50.

La tasa configurada representa la cantidad de iteraciones que k6 intenta iniciar por segundo. La tasa real de solicitudes debe verificarse en los resultados de cada ejecución.


7. EJECUCIÓN DE LA PRUEBA

Paso 1. Abrir una terminal.

Paso 2. Entrar en el directorio del proyecto:

cd ~/performance-k6

Paso 3. Verificar que los archivos necesarios estén presentes:

ls -R

Paso 4. Ejecutar la prueba de carga:

k6 run script.js

Paso 5. Revisar el resumen final mostrado en la terminal. Las métricas principales son:

- http_reqs: cantidad total de solicitudes HTTP.
- http_reqs/s: tasa real de solicitudes por segundo.
- http_req_duration: tiempos de respuesta.
- http_req_failed: tasa de solicitudes HTTP fallidas.
- checks_succeeded: proporción de verificaciones aprobadas.



8. UMBRALES DE ACEPTACIÓN

El script incluye los siguientes umbrales:

- Tiempo máximo de respuesta inferior a 1500 ms.
- Tasa de fallos HTTP inferior al 3 %.
- Más del 97 % de los checks aprobados.

La tasa mínima de 20 transacciones por segundo debe verificarse por separado utilizando la métrica http_reqs/s del resumen de k6.

La prueba se considera satisfactoria únicamente cuando los criterios correspondientes se cumplen en la ejecución evaluada.


9. ARCHIVOS DE RESULTADOS

results/resultado.json:
Contiene las métricas detalladas de una ejecución anterior.

results/resultado_final.json:
Contiene las métricas de la ejecución guardada mediante el comando de la sección 7.

Los resultados permiten revisar las métricas y respaldar las conclusiones documentadas en conclusiones.txt.


10. CONSIDERACIONES

- La prueba se realizó contra el endpoint público de Fake Store API.
- Los resultados representan el comportamiento observado durante las ejecuciones realizadas y no garantizan el mismo rendimiento en ejecuciones futuras.
- Las credenciales del CSV son datos de prueba y no deben sustituirse por contraseñas personales o credenciales reales.
- No se debe interpretar la cantidad de usuarios virtuales como equivalente a la tasa de solicitudes por segundo.
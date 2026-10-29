import http from 'k6/http';
import { check } from 'k6';

const datos = open('./data/credenciales.csv');
// Dividir los datos en filas
const filas = datos.split('\n');

// Mapear las filas a un array de objetos con usuario y contraseña
const credenciales = filas.slice(1).map((fila) => {
    const [usuario, contrasena] = fila.trim().split(',');
    return { usuario, contrasena };
});

export const options = {
    scenarios: {
        login_load_test: {
            executor: 'constant-arrival-rate',
            rate: 21,
            timeUnit: '1s',
            duration: '30s',
            preAllocatedVUs: 50,
            maxVUs: 50,
        }
    },
    thresholds: {
        http_req_duration: ['max<1500'],
        http_req_failed: ['rate<0.03'],
        checks: ['rate>0.97'],
    },
};

const url = 'https://fakestoreapi.com/auth/login';
export default function () {
    // Calcular el índice de la credencial a usar en esta iteración
    const indice = (__ITER) % credenciales.length;
    // Obtener la credencial correspondiente
    const usuarioActual = credenciales[indice];
    // Crear el payload en formato JSON
    const payload = JSON.stringify({
    username: usuarioActual.usuario,
    password: usuarioActual.contrasena,
});

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);


    check(response, {
        'El servidor responde HTTP 201': (r) => r.status === 201,
    });
}

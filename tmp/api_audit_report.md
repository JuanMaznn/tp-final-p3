# API audit report

Generated at: 2026-06-16T16:26:54Z

## GET / success

- Request:

\`\`\`http
GET /
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 30
ETag: W/"1e-yKlTnRQF6Tw6v6TvQ4Hmy+7ovn4"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"msg":"API ok"}
\`\`\`

## POST /api/v1/auth/login success (admin)

- Request:

\`\`\`http
POST /api/v1/auth/login

{"email":"ferben@correo.com","contrasenia":"TempAdmin#2026"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 185
ETag: W/"b9-RY5nyeodjvWtJUTlovqqAAV5oQw"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjo4LCJyb2wiOjMsImlhdCI6MTc4MTYyNzIxNSwiZXhwIjoxNzgxNjMwODE1fQ.RWQ9L-r-4MyBEKG4_dAlZIg4KICQemfHShDwRfkNSe8"}
\`\`\`

## POST /api/v1/auth/login error (wrong password)

- Request:

\`\`\`http
POST /api/v1/auth/login

{"email":"ferben@correo.com","contrasenia":"wrongpass"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-MgjRGAja8YQ9lC+v+gw/RxEDUAQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Solicitud incorrecta."}
\`\`\`

## POST /api/v1/auth/recuperar success

- Request:

\`\`\`http
POST /api/v1/auth/recuperar

{"email":"ferben@correo.com"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 164
ETag: W/"a4-WOy3w3+sJUFXskNNwHakVg+TgRw"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Token de recuperación generado exitosamente","token":"fmfudu42urbptbaqj5pqqc","nota":"En producción, este token se enviaría por email"}
\`\`\`

## POST /api/v1/auth/recuperar error (email inexistente)

- Request:

\`\`\`http
POST /api/v1/auth/recuperar

{"email":"noexiste@correo.com"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 63
ETag: W/"3f-hx6TxrdhB4A5ESYrs2PXi7uQ7dc"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"No existe un usuario con ese email"}
\`\`\`

## GET /api/v1/auth/validar-token/:token success

- Request:

\`\`\`http
GET /api/v1/auth/validar-token/cfk1pgmllq61yphqdk3ou3
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 69
ETag: W/"45-BAHu2P62y7YF6UOYPN5mtkRjOrE"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Token válido","email":"lopjac@correo.com"}
\`\`\`

## GET /api/v1/auth/validar-token/:token error

- Request:

\`\`\`http
GET /api/v1/auth/validar-token/token-invalido
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-1fNmWwG+FZFqPpqTb+3Zozu4W+U"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Token inválido o expirado"}
\`\`\`

## POST /api/v1/auth/restablecer/:token success

- Request:

\`\`\`http
POST /api/v1/auth/restablecer/me4eouqj8sr9c9m3dxhnf

{"contrasenia":"DocPass#2026b"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 64
ETag: W/"40-2pZlvLXXDTpYDkkh2K3WIwZjhKM"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Contraseña actualizada exitosamente"}
\`\`\`

## POST /api/v1/auth/restablecer/:token error (token inválido)

- Request:

\`\`\`http
POST /api/v1/auth/restablecer/token-invalido

{"contrasenia":"123456"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-1fNmWwG+FZFqPpqTb+3Zozu4W+U"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Token inválido o expirado"}
\`\`\`

## GET /api/v1/especialidades success

- Request:

\`\`\`http
GET /api/v1/especialidades
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 770
ETag: W/"302-KsgF1VkTJWXneATqlnhQOYqbaJc"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"especialidades":[{"id_especialidad":1,"nombre":"PEDIATRÍA","activo":1},{"id_especialidad":2,"nombre":"CLÍNICA","activo":1},{"id_especialidad":3,"nombre":"TRAUMATOLOGÍA","activo":1},{"id_especialidad":4,"nombre":"INFECTOLOGÍA","activo":1},{"id_especialidad":9,"nombre":"NEUROLOGÍA","activo":1},{"id_especialidad":15,"nombre":"ESP_TEST_1781627071","activo":1},{"id_especialidad":16,"nombre":"ESP_TEST_1781627090","activo":1},{"id_especialidad":17,"nombre":"ESP_TEST_1781627153","activo":1},{"id_especialidad":18,"nombre":"ESP_TEST_1781627163","activo":1},{"id_especialidad":19,"nombre":"ESP_TEST_1781627192","activo":1},{"id_especialidad":20,"nombre":"ESP_TEST_1781627203","activo":1},{"id_especialidad":21,"nombre":"ESP_TEST_1781627214","activo":1}]}
\`\`\`

## GET /api/v1/especialidades error (sin token)

- Request:

\`\`\`http
GET /api/v1/especialidades
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 56
ETag: W/"38-Rzk19brj+Z+929TE1G/Buo0jXi0"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Token no válido o expirado"}
\`\`\`

## GET /api/v1/especialidades/:id success

- Request:

\`\`\`http
GET /api/v1/especialidades/1
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 87
ETag: W/"57-nzvXqTXX7jU1rx7IoVlwGdETya0"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"especialidad":[{"id_especialidad":1,"nombre":"PEDIATRÍA","activo":1}]}
\`\`\`

## GET /api/v1/especialidades/:id error (id inválido)

- Request:

\`\`\`http
GET /api/v1/especialidades/abc
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 129
ETag: W/"81-DEd3MNNoW39Il7R/hBU9eEWsBAo"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"abc","msg":"El ID debe ser un número entero","path":"id_especialidad","location":"params"}]}
\`\`\`

## POST /api/v1/especialidades success

- Request:

\`\`\`http
POST /api/v1/especialidades
Authorization: Bearer <token>

{"nombre":"CARDIO_TEST_1781627214"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 36
ETag: W/"24-MDbWicRioW5Qp/3WMtWCBgCGmgQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"msg":"ID Creado 22"}
\`\`\`

## POST /api/v1/especialidades error (rol paciente)

- Request:

\`\`\`http
POST /api/v1/especialidades
Authorization: Bearer <token>

{"nombre":"NOPE"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## PUT /api/v1/especialidades/:id success

- Request:

\`\`\`http
PUT /api/v1/especialidades/21
Authorization: Bearer <token>

{"nombre":"ESP_EDITADA_1781627214"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 47
ETag: W/"2f-RCrypQIh0MeaoLfemBfmLUxmd2M"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"msg":"Especialidad modificada"}
\`\`\`

## PUT /api/v1/especialidades/:id error (body inválido)

- Request:

\`\`\`http
PUT /api/v1/especialidades/21
Authorization: Bearer <token>

{"nombre":""}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 108
ETag: W/"6c-OHrHzflCN4Yl9BLkCzZosjW/cZQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"","msg":"El nombre es obligatorio.","path":"nombre","location":"body"}]}
\`\`\`

## DELETE /api/v1/especialidades/:id success

- Request:

\`\`\`http
DELETE /api/v1/especialidades/21
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 47
ETag: W/"2f-KrGtsx/jO9fy+5+LeIF4NfTWVsg"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"msg":"Especialidad eliminada."}
\`\`\`

## DELETE /api/v1/especialidades/:id error (id inválido)

- Request:

\`\`\`http
DELETE /api/v1/especialidades/abc
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 129
ETag: W/"81-DEd3MNNoW39Il7R/hBU9eEWsBAo"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"abc","msg":"El ID debe ser un número entero","path":"id_especialidad","location":"params"}]}
\`\`\`

## GET /api/v1/obras-sociales success

- Request:

\`\`\`http
GET /api/v1/obras-sociales
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 1495
ETag: W/"5d7-lB5bzkF8twBVPrC7STCG8cBk7TE"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"obrasSociales":[{"id_obra_social":1,"nombre":"Jerárquicos","descripcion":"jer","porcentaje_descuento":"0.10","es_particular":0,"activo":1},{"id_obra_social":2,"nombre":"OSUNER","descripcion":"osu","porcentaje_descuento":"0.10","es_particular":0,"activo":1},{"id_obra_social":3,"nombre":"OSECAC","descripcion":"ose","porcentaje_descuento":"0.11","es_particular":0,"activo":1},{"id_obra_social":4,"nombre":"OSUNER 3","descripcion":"OSU","porcentaje_descuento":"0.13","es_particular":0,"activo":1},{"id_obra_social":5,"nombre":"OS_TEST_1781627071","descripcion":"Obra temporal","porcentaje_descuento":"0.15","es_particular":0,"activo":1},{"id_obra_social":6,"nombre":"OS_TEST_1781627090","descripcion":"Obra temporal","porcentaje_descuento":"0.15","es_particular":0,"activo":1},{"id_obra_social":7,"nombre":"OS_TEST_1781627153","descripcion":"Obra temporal","porcentaje_descuento":"0.15","es_particular":0,"activo":1},{"id_obra_social":8,"nombre":"OS_TEST_1781627163","descripcion":"Obra temporal","porcentaje_descuento":"0.15","es_particular":0,"activo":1},{"id_obra_social":9,"nombre":"OS_TEST_1781627192","descripcion":"Obra temporal","porcentaje_descuento":"0.15","es_particular":0,"activo":1},{"id_obra_social":10,"nombre":"OS_TEST_1781627203","descripcion":"Obra temporal","porcentaje_descuento":"0.15","es_particular":0,"activo":1},{"id_obra_social":11,"nombre":"OS_TEST_1781627214","descripcion":"Obra temporal","porcentaje_descuento":"0.15","es_particular":0,"activo":1}]}
\`\`\`

## GET /api/v1/obras-sociales/:id success

- Request:

\`\`\`http
GET /api/v1/obras-sociales/1
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 154
ETag: W/"9a-wP87ZypO8U79x6boT9ZE0llSTAs"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"obraSocial":[{"id_obra_social":1,"nombre":"Jerárquicos","descripcion":"jer","porcentaje_descuento":"0.10","es_particular":0,"activo":1}]}
\`\`\`

## GET /api/v1/obras-sociales/:id error (id inválido)

- Request:

\`\`\`http
GET /api/v1/obras-sociales/abc
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 128
ETag: W/"80-OuUlJ/ibQr0NiK5xMcXsrLiWIXU"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"abc","msg":"El ID debe ser un número entero","path":"id_obra_social","location":"params"}]}
\`\`\`

## POST /api/v1/obras-sociales success

- Request:

\`\`\`http
POST /api/v1/obras-sociales
Authorization: Bearer <token>

{"nombre":"OS_EXTRA_1781627214","descripcion":"Alta temporal","porcentajeDescuento":12,"esParticular":false}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 49
ETag: W/"31-A+NrkADSaiFY+jPGxsnZI7+n+vs"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"msg":"Obra Social creada. ID 12"}
\`\`\`

## POST /api/v1/obras-sociales error (validación)

- Request:

\`\`\`http
POST /api/v1/obras-sociales
Authorization: Bearer <token>

{"nombre":"","descripcion":"x","porcentajeDescuento":999,"esParticular":"no"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 377
ETag: W/"179-wYrbd5QBNn8nTZECaba2n6paMI4"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"","msg":"El nombre es obligatorio.","path":"nombre","location":"body"},{"type":"field","value":999,"msg":"El porcentaje de descuento debe estar entre 0 y 100.","path":"porcentajeDescuento","location":"body"},{"type":"field","value":"no","msg":"El campo esParticular debe ser booleano (true/false).","path":"esParticular","location":"body"}]}
\`\`\`

## PUT /api/v1/obras-sociales/:id success

- Request:

\`\`\`http
PUT /api/v1/obras-sociales/11
Authorization: Bearer <token>

{"nombre":"OS_EDITADA_1781627214","descripcion":"Editada","porcentajeDescuento":10,"esParticular":false}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-H2RAbgo8C0CV8/gAUh6VCI3ZuBg"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"msg":"Obra Social modificada"}
\`\`\`

## PUT /api/v1/obras-sociales/:id error (rol médico)

- Request:

\`\`\`http
PUT /api/v1/obras-sociales/11
Authorization: Bearer <token>

{"nombre":"X","descripcion":"Y","porcentajeDescuento":10,"esParticular":false}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## DELETE /api/v1/obras-sociales/:id success

- Request:

\`\`\`http
DELETE /api/v1/obras-sociales/11
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-1VQZOpXc26ke0PUY6hGVDdlriFI"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"msg":"Obra Social eliminada."}
\`\`\`

## DELETE /api/v1/obras-sociales/:id error (id inválido)

- Request:

\`\`\`http
DELETE /api/v1/obras-sociales/abc
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 128
ETag: W/"80-OuUlJ/ibQr0NiK5xMcXsrLiWIXU"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"abc","msg":"El ID debe ser un número entero","path":"id_obra_social","location":"params"}]}
\`\`\`

## GET /api/v1/medicos success

- Request:

\`\`\`http
GET /api/v1/medicos
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 508
ETag: W/"1fc-3D50DvqNAmlKByFW3MW4Tx5/gOk"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Médicos encontrados.","medicos":[{"id_medico":1,"id_usuario":1,"apellido":"Lopez","nombres":"Marcelo","email":"lopmar@correo.com","foto_path":""},{"id_medico":2,"id_usuario":2,"apellido":"Diaz","nombres":"Juan","email":"diajua@correo.com","foto_path":""},{"id_medico":3,"id_usuario":3,"apellido":"Benitez","nombres":"Horacio","email":"benhor@correo.com","foto_path":""},{"id_medico":4,"id_usuario":4,"apellido":"Perez","nombres":"Luis","email":"perlui@correo.com","foto_path":""}]}
\`\`\`

## GET /api/v1/medicos/especialidad/:id success

- Request:

\`\`\`http
GET /api/v1/medicos/especialidad/1
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 189
ETag: W/"bd-5PexnjVoXdOHk0YxrUWr92CVamc"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"medicos":[{"id_medico":1,"apellido":"Lopez","nombres":"Marcelo","email":"lopmar@correo.com"},{"id_medico":2,"apellido":"Diaz","nombres":"Juan","email":"diajua@correo.com"}]}
\`\`\`

## GET /api/v1/medicos/especialidad/:id error (id inválido)

- Request:

\`\`\`http
GET /api/v1/medicos/especialidad/abc
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 113
ETag: W/"71-4fFvf5jn57iTVb2XBHLDAIqXJHk"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"abc","msg":"Debe ser entero.","path":"id_especialidad","location":"params"}]}
\`\`\`

## GET /api/v1/medicos/:id success

- Request:

\`\`\`http
GET /api/v1/medicos/1
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 140
ETag: W/"8c-5zXsmM74dREsWjdc4aZVFWBu47Q"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"medico":{"id_medico":1,"id_usuario":1,"id_especialidad":1,"matricula":1000,"descripcion":"test","valor_consulta":"5000.00"}}
\`\`\`

## GET /api/v1/medicos/:id error (no existe)

- Request:

\`\`\`http
GET /api/v1/medicos/999999
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 404 Not Found
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-AA5EfhgVTpHtOy7IllwzUPU6fMY"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"msg":"Médico no encontrado"}
\`\`\`

## PUT /api/v1/medicos/:id/obras-sociales success

- Request:

\`\`\`http
PUT /api/v1/medicos/1/obras-sociales
Authorization: Bearer <token>

{"obras_sociales":[{"id_obra_social":1},{"id_obra_social":2}]}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-RymURDoj10gF/8+d0KQ32AAb+zI"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Obras sociales asociadas correctamente"}
\`\`\`

## PUT /api/v1/medicos/:id/obras-sociales error (body inválido)

- Request:

\`\`\`http
PUT /api/v1/medicos/1/obras-sociales
Authorization: Bearer <token>

{"obras_sociales":[]}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 127
ETag: W/"7f-8BWI7IG70uReio+xJIfvtF1n8nM"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":[],"msg":"Debe enviar al menos una obra social","path":"obras_sociales","location":"body"}]}
\`\`\`

## PUT /api/v1/medicos/:id success

- Request:

\`\`\`http
PUT /api/v1/medicos/1
Authorization: Bearer <token>

{"id_especialidad":2,"descripcion":"Actualizado por test","matricula":123456,"valor_consulta":15000}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 41
ETag: W/"29-k6kyfPfZTbgi2FX2h3jQ2B03OEk"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"msg":"Medico modificado"}
\`\`\`

## PUT /api/v1/medicos/:id error (rol paciente)

- Request:

\`\`\`http
PUT /api/v1/medicos/1
Authorization: Bearer <token>

{"id_especialidad":2,"descripcion":"x","matricula":123,"valor_consulta":1}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## PUT /api/v1/medicos/:id/especialidad success

- Request:

\`\`\`http
PUT /api/v1/medicos/1/especialidad
Authorization: Bearer <token>

{"id_especialidad":1}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 63
ETag: W/"3f-8+nAEjJQhIkzP+Vzkb0alxkFJdA"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Especialidad asociada correctamente"}
\`\`\`

## PUT /api/v1/medicos/:id/especialidad error (especialidad inválida)

- Request:

\`\`\`http
PUT /api/v1/medicos/1/especialidad
Authorization: Bearer <token>

{"id_especialidad":999999}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 71
ETag: W/"47-DIq+fhpO34jmNoU6nOkIfdzhjn4"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"La especialidad no existe o está inactiva"}
\`\`\`

## GET /api/v1/pacientes success

- Request:

\`\`\`http
GET /api/v1/pacientes
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 928
ETag: W/"3a0-RF1V3dQJWOeaIJ2maeGEm+QvT90"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Pacientes encontrados.","pacientes":[{"id_paciente":1,"id_usuario":5,"apellido":"Lopez","nombres":"Jacinto","email":"lopjac@correo.com","id_obra_social":1,"descripcion_obra_social":"jer","foto_path":""},{"id_paciente":2,"id_usuario":6,"apellido":"Hunk","nombres":"Lorena","email":"hunlor@correo.com","id_obra_social":2,"descripcion_obra_social":"osu","foto_path":""},{"id_paciente":3,"id_usuario":7,"apellido":"Aguirre","nombres":"Brian","email":"agubri@correo.com","id_obra_social":3,"descripcion_obra_social":"ose","foto_path":""},{"id_paciente":4,"id_usuario":14,"apellido":"Paciente","nombres":"Temporal","email":"pac.test.1781627071@correo.com","id_obra_social":1,"descripcion_obra_social":"jer","foto_path":""},{"id_paciente":5,"id_usuario":16,"apellido":"Paciente","nombres":"Temporal","email":"pac.test.1781627090@correo.com","id_obra_social":1,"descripcion_obra_social":"jer","foto_path":""}]}
\`\`\`

## GET /api/v1/pacientes error (rol paciente)

- Request:

\`\`\`http
GET /api/v1/pacientes
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## GET /api/v1/pacientes/:id success

- Request:

\`\`\`http
GET /api/v1/pacientes/1
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 78
ETag: W/"4e-x9HlljVuCNR9HU6z9SQ1lBT7gW8"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"paciente":{"id_paciente":1,"id_usuario":5,"id_obra_social":1}}
\`\`\`

## GET /api/v1/pacientes/:id error (id inválido)

- Request:

\`\`\`http
GET /api/v1/pacientes/abc
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 125
ETag: W/"7d-mJb0h7vBI0AibxzCPtpE2H2MVnw"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"abc","msg":"El ID debe ser un número entero","path":"id_paciente","location":"params"}]}
\`\`\`

## PUT /api/v1/pacientes/:id/obra-social success

- Request:

\`\`\`http
PUT /api/v1/pacientes/1/obra-social
Authorization: Bearer <token>

{"id_obra_social":2}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 63
ETag: W/"3f-2SRK33GBA5o5FzmzrBgapb8SndQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Obra social asociada correctamente."}
\`\`\`

## PUT /api/v1/pacientes/:id/obra-social error (rol médico)

- Request:

\`\`\`http
PUT /api/v1/pacientes/1/obra-social
Authorization: Bearer <token>

{"id_obra_social":1}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## GET /api/v1/turnos success (admin)

- Request:

\`\`\`http
GET /api/v1/turnos
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 2368
ETag: W/"940-PO2Nn+BdaKvyu2iWGMmKotugbSQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Turnos encontrados.","turnos":[{"id_turno_reserva":1,"fecha_hora":"2026-04-01T20:00:00.000Z","valor_total":"4500.00","atentido":0,"paciente_nombres":"Jacinto","paciente_apellido":"Lopez","medico_nombres":"Marcelo","medico_apellido":"Lopez"},{"id_turno_reserva":8,"fecha_hora":"2026-12-31T13:00:00.000Z","valor_total":"4500.00","atentido":0,"paciente_nombres":"Jacinto","paciente_apellido":"Lopez","medico_nombres":"Marcelo","medico_apellido":"Lopez"},{"id_turno_reserva":9,"fecha_hora":"2026-12-31T13:00:00.000Z","valor_total":"4500.00","atentido":0,"paciente_nombres":"Jacinto","paciente_apellido":"Lopez","medico_nombres":"Marcelo","medico_apellido":"Lopez"},{"id_turno_reserva":10,"fecha_hora":"2026-12-31T13:00:00.000Z","valor_total":"4500.00","atentido":0,"paciente_nombres":"Jacinto","paciente_apellido":"Lopez","medico_nombres":"Marcelo","medico_apellido":"Lopez"},{"id_turno_reserva":11,"fecha_hora":"2026-12-31T13:00:00.000Z","valor_total":"4500.00","atentido":0,"paciente_nombres":"Jacinto","paciente_apellido":"Lopez","medico_nombres":"Marcelo","medico_apellido":"Lopez"},{"id_turno_reserva":12,"fecha_hora":"2026-12-31T13:00:00.000Z","valor_total":"4500.00","atentido":0,"paciente_nombres":"Jacinto","paciente_apellido":"Lopez","medico_nombres":"Marcelo","medico_apellido":"Lopez"},{"id_turno_reserva":2,"fecha_hora":"2026-04-01T21:00:00.000Z","valor_total":"9000.00","atentido":0,"paciente_nombres":"Lorena","paciente_apellido":"Hunk","medico_nombres":"Horacio","medico_apellido":"Benitez"},{"id_turno_reserva":5,"fecha_hora":"2026-04-14T21:00:00.000Z","valor_total":"9000.00","atentido":0,"paciente_nombres":"Lorena","paciente_apellido":"Hunk","medico_nombres":"Horacio","medico_apellido":"Benitez"},{"id_turno_reserva":6,"fecha_hora":"2026-04-21T21:00:00.000Z","valor_total":"9000.00","atentido":0,"paciente_nombres":"Lorena","paciente_apellido":"Hunk","medico_nombres":"Horacio","medico_apellido":"Benitez"},{"id_turno_reserva":4,"fecha_hora":"2026-04-01T22:00:00.000Z","valor_total":"13500.00","atentido":0,"paciente_nombres":"Brian","paciente_apellido":"Aguirre","medico_nombres":"Luis","medico_apellido":"Perez"},{"id_turno_reserva":7,"fecha_hora":"2026-05-07T19:00:00.000Z","valor_total":"133500.00","atentido":0,"paciente_nombres":"Brian","paciente_apellido":"Aguirre","medico_nombres":"Luis","medico_apellido":"Perez"}]}
\`\`\`

## GET /api/v1/turnos/:id success (admin)

- Request:

\`\`\`http
GET /api/v1/turnos/12
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 184
ETag: W/"b8-rntZ7JiVxU1pKhd1V+2gxR4ZA/0"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"turno":{"id_turno_reserva":12,"id_medico":1,"id_paciente":1,"id_obra_social":1,"fecha_hora":"2026-12-31T13:00:00.000Z","valor_total":"4500.00","atentido":0,"activo":1}}
\`\`\`

## GET /api/v1/turnos/:id error (id inválido)

- Request:

\`\`\`http
GET /api/v1/turnos/abc
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 115
ETag: W/"73-AYp0utjwZXYo+gpgtcgcoK0fHns"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"abc","msg":"id_turno debe ser entero.","path":"id_turno","location":"params"}]}
\`\`\`

## POST /api/v1/turnos success (paciente propio)

- Request:

\`\`\`http
POST /api/v1/turnos
Authorization: Bearer <token>

{"id_medico":1,"id_paciente":1,"fecha_hora":"2026-12-31 11:00:00"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 225
ETag: W/"e1-+t7c27Xa3MIa+DmZZ2gLcd/PqMk"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Turno creado correctamente.","turno":{"id_turno_reserva":13,"id_medico":1,"id_paciente":1,"id_obra_social":2,"fecha_hora":"2026-12-31T14:00:00.000Z","valor_total":"13500.00","atentido":0,"activo":1}}
\`\`\`

## POST /api/v1/turnos error (paciente ajeno)

- Request:

\`\`\`http
POST /api/v1/turnos
Authorization: Bearer <token>

{"id_medico":1,"id_paciente":1,"fecha_hora":"2026-12-31 12:00:00"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 225
ETag: W/"e1-UssyENxwe3OzdDvX25tEmFcgxbM"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Turno creado correctamente.","turno":{"id_turno_reserva":14,"id_medico":1,"id_paciente":1,"id_obra_social":2,"fecha_hora":"2026-12-31T15:00:00.000Z","valor_total":"13500.00","atentido":0,"activo":1}}
\`\`\`

## PUT /api/v1/turnos/:id success (admin)

- Request:

\`\`\`http
PUT /api/v1/turnos/12
Authorization: Bearer <token>

{"id_medico":1,"id_paciente":1,"fecha_hora":"2027-01-01 09:00:00"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 140
ETag: W/"8c-v6CRimiEmrJeCdKyb/CjKgtfwko"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Turno modificado.","turno":{"id_medico":1,"id_paciente":1,"fecha_hora":"2027-01-01 09:00:00","valor_total":13500}}
\`\`\`

## PUT /api/v1/turnos/:id error (rol paciente)

- Request:

\`\`\`http
PUT /api/v1/turnos/12
Authorization: Bearer <token>

{"id_medico":1,"id_paciente":1,"fecha_hora":"2027-01-01 09:00:00"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## PUT /api/v1/turnos/:id/atender success (médico dueño)

- Request:

\`\`\`http
PUT /api/v1/turnos/12/atender
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-Qs9hjev8IGnxT23N+hiNgMjYS+8"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Turno marcado como atendido"}
\`\`\`

## PUT /api/v1/turnos/:id/atender success (admin)

- Request:

\`\`\`http
PUT /api/v1/turnos/12/atender
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-Qs9hjev8IGnxT23N+hiNgMjYS+8"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Turno marcado como atendido"}
\`\`\`

## PUT /api/v1/turnos/:id/atender error (rol paciente)

- Request:

\`\`\`http
PUT /api/v1/turnos/12/atender
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## GET /api/v1/estadisticas success (admin)

- Request:

\`\`\`http
GET /api/v1/estadisticas
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 43
ETag: W/"2b-0Fp7Lu/amVPmJLyGqeAiACjqfNE"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Error interno."}
\`\`\`

## GET /api/v1/estadisticas error (rol médico)

- Request:

\`\`\`http
GET /api/v1/estadisticas
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## GET /api/v1/estadisticas/medico success

- Request:

\`\`\`http
GET /api/v1/estadisticas/medico
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 275
ETag: W/"113-dMjW8W128auVPKOjFd8bARtSixI"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Estadísticas del médico.","resumen":{"total_turnos":8,"atendidos":"1","pendientes":"7","ingresos_totales":"63000.00"},"porPaciente":[{"apellido":"Lopez","nombres":"Jacinto","total_turnos":8,"atendidos":"1","pendientes":"7","ingresos":"63000.00"}]}
\`\`\`

## GET /api/v1/estadisticas/medico error (rol admin)

- Request:

\`\`\`http
GET /api/v1/estadisticas/medico
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## GET /api/v1/estadisticas/pdf success

- Request:

\`\`\`http
GET /api/v1/estadisticas/pdf
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-gnqoK9TPz6CkwxKxg6Ts2mdMK7Q"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Binary body omitted (50 bytes).

## GET /api/v1/estadisticas/pdf error (rol médico)

- Request:

\`\`\`http
GET /api/v1/estadisticas/pdf
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## GET /api/v1/estadisticas/medico/pdf success

- Request:

\`\`\`http
GET /api/v1/estadisticas/medico/pdf
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/pdf
Content-Disposition: attachment; filename=estadisticas_medico.pdf
Content-Length: 32715
ETag: W/"7fcb-8ZOsFlK8ACfiZrtqwWURqITEDM8"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Binary body omitted (32715 bytes).

## GET /api/v1/estadisticas/medico/pdf error (rol admin)

- Request:

\`\`\`http
GET /api/v1/estadisticas/medico/pdf
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## GET /api/v1/usuarios success

- Request:

\`\`\`http
GET /api/v1/usuarios
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 1623
ETag: W/"657-Volz+UjeZ0kzqnS89yX1kTJpUv4"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"usuarios":[{"id_usuario":1,"documento":"31000111","apellido":"Lopez","nombres":"Marcelo","email":"lopmar@correo.com","rol":1,"foto_path":"","activo":1},{"id_usuario":2,"documento":"31000112","apellido":"Diaz","nombres":"Juan","email":"diajua@correo.com","rol":1,"foto_path":"","activo":1},{"id_usuario":3,"documento":"31000113","apellido":"Benitez","nombres":"Horacio","email":"benhor@correo.com","rol":1,"foto_path":"","activo":1},{"id_usuario":4,"documento":"31000114","apellido":"Perez","nombres":"Luis","email":"perlui@correo.com","rol":1,"foto_path":"","activo":1},{"id_usuario":5,"documento":"41000111","apellido":"Lopez","nombres":"Jacinto","email":"lopjac@correo.com","rol":2,"foto_path":"","activo":1},{"id_usuario":6,"documento":"41000112","apellido":"Hunk","nombres":"Lorena","email":"hunlor@correo.com","rol":2,"foto_path":"","activo":1},{"id_usuario":7,"documento":"41000113","apellido":"Aguirre","nombres":"Brian","email":"agubri@correo.com","rol":2,"foto_path":"","activo":1},{"id_usuario":8,"documento":"51000111","apellido":"Fernandez","nombres":"Benito","email":"ferben@correo.com","rol":3,"foto_path":"","activo":1},{"id_usuario":10,"documento":"51000112","apellido":"Gomez","nombres":"Silvia","email":"gomsil@correo.com","rol":3,"foto_path":"","activo":1},{"id_usuario":14,"documento":"90001781627071","apellido":"Paciente","nombres":"Temporal","email":"pac.test.1781627071@correo.com","rol":2,"foto_path":"","activo":1},{"id_usuario":16,"documento":"90001781627090","apellido":"Paciente","nombres":"Temporal","email":"pac.test.1781627090@correo.com","rol":2,"foto_path":"","activo":1}]}
\`\`\`

## GET /api/v1/usuarios error (rol paciente)

- Request:

\`\`\`http
GET /api/v1/usuarios
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## GET /api/v1/usuarios/:id success

- Request:

\`\`\`http
GET /api/v1/usuarios/1
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 293
ETag: W/"125-6uOgS/r+o4zvw7I/hgxAxRF9JtU"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"usuario":{"id_usuario":1,"documento":"31000111","apellido":"Lopez","nombres":"Marcelo","email":"lopmar@correo.com","contrasenia":"5e8d3f0a22b4d79654cd7f4a0eefb54ab0b44ef20bae4b8d880994ccfc6ac7eb","foto_path":"","rol":1,"activo":1,"reset_token":null,"reset_token_expires":null}}
\`\`\`

## GET /api/v1/usuarios/:id error (id inválido)

- Request:

\`\`\`http
GET /api/v1/usuarios/abc
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 107
ETag: W/"6b-/DzdCwkRHn+7qajz1/dtoE5tCPQ"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"abc","msg":"Debe ser entero","path":"id_usuario","location":"params"}]}
\`\`\`

## POST /api/v1/usuarios success (admin crea admin)

- Request:

\`\`\`http
POST /api/v1/usuarios
Authorization: Bearer <token>
FORM documento=7627214
FORM apellido=Delete
FORM nombres=Me
FORM email=del.1781627214@correo.com
FORM contrasenia=DelPass#2026
FORM rol=3
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 69
ETag: W/"45-U5WdUhPlCOWLrduR19poYasVaGY"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Usuario creado.","datos":{"id_usuario":17}}
\`\`\`

## POST /api/v1/usuarios error (email inválido)

- Request:

\`\`\`http
POST /api/v1/usuarios
Authorization: Bearer <token>
FORM documento=8627214
FORM apellido=Bad
FORM nombres=User
FORM email=no-es-email
FORM contrasenia=abc
FORM rol=3
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 108
ETag: W/"6c-o0E9qiw/iNcqHyQg5NWA5WZ1mIg"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"no-es-email","msg":"Email inválido","path":"email","location":"body"}]}
\`\`\`

## PUT /api/v1/usuarios/:id success

- Request:

\`\`\`http
PUT /api/v1/usuarios/1
Authorization: Bearer <token>

{"apellido":"DoctorMod","email":"lopmar@correo.com"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 47
ETag: W/"2f-iTKPoV5mdp5jb/yCOv8I7d7WWtQ"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Usuario modificado."}
\`\`\`

## PUT /api/v1/usuarios/:id error (rol médico)

- Request:

\`\`\`http
PUT /api/v1/usuarios/1
Authorization: Bearer <token>

{"apellido":"Nope"}
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## DELETE /api/v1/usuarios/:id success

- Request:

\`\`\`http
DELETE /api/v1/usuarios/17
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 48
ETag: W/"30-4qvAgEwpUDaDlPfMLIlXCNfgMJc"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Usuario desactivado."}
\`\`\`

## DELETE /api/v1/usuarios/:id error (no existe)

- Request:

\`\`\`http
DELETE /api/v1/usuarios/999999
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 404 Not Found
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 51
ETag: W/"33-Y2Xpo44adb+ngdOKa4+B/Fk97WQ"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Usuario no encontrado."}
\`\`\`

## GET /api/v1/auditoria success

- Request:

\`\`\`http
GET /api/v1/auditoria?limit=2
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 613
ETag: W/"265-lHzKdom3Lc5LIcUuBGOa4FgzNMo"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Registros de auditoría encontrados.","auditorias":[{"id_auditoria":107,"id_usuario":8,"usuario":"Benito Fernandez","usuario_email":"ferben@correo.com","metodo":"DELETE","ruta":"/api/v1/usuarios/999999","accion":"ELIMINAR","entidad":"usuarios","id_entidad":999999,"status_code":404,"fecha_hora":"2026-06-16T16:26:56.000Z"},{"id_auditoria":106,"id_usuario":8,"usuario":"Benito Fernandez","usuario_email":"ferben@correo.com","metodo":"DELETE","ruta":"/api/v1/usuarios/17","accion":"ELIMINAR","entidad":"usuarios","id_entidad":17,"status_code":200,"fecha_hora":"2026-06-16T16:26:56.000Z"}]}
\`\`\`

## GET /api/v1/auditoria error (rol paciente)

- Request:

\`\`\`http
GET /api/v1/auditoria
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-8iCOOWOUwfKLAnrOIt2zkMnysoQ"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":false,"mensaje":"Acceso Denegado: Perfil no autorizado"}
\`\`\`

## GET /api/v1/auditoria/usuario/:id success

- Request:

\`\`\`http
GET /api/v1/auditoria/usuario/8?limit=2
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 613
ETag: W/"265-Anzju7t53wVaWQ3DR2a2WFuUYwQ"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Historial de acciones del usuario 8.","auditorias":[{"id_auditoria":107,"id_usuario":8,"usuario":"Benito Fernandez","usuario_email":"ferben@correo.com","metodo":"DELETE","ruta":"/api/v1/usuarios/999999","accion":"ELIMINAR","entidad":"usuarios","id_entidad":999999,"status_code":404,"fecha_hora":"2026-06-16T16:26:56.000Z"},{"id_auditoria":106,"id_usuario":8,"usuario":"Benito Fernandez","usuario_email":"ferben@correo.com","metodo":"DELETE","ruta":"/api/v1/usuarios/17","accion":"ELIMINAR","entidad":"usuarios","id_entidad":17,"status_code":200,"fecha_hora":"2026-06-16T16:26:56.000Z"}]}
\`\`\`

## GET /api/v1/auditoria/usuario/:id error (id inválido)

- Request:

\`\`\`http
GET /api/v1/auditoria/usuario/abc
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 124
ETag: W/"7c-V53cgke0q3pvUCifk3PpJlkChao"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"abc","msg":"El ID debe ser un número entero","path":"id_usuario","location":"params"}]}
\`\`\`

## GET /api/v1/auditoria/:id success

- Request:

\`\`\`http
GET /api/v1/auditoria/107
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 345
ETag: W/"159-SgAyCziH54zRT16852+oCxs61Qc"
Date: Tue, 16 Jun 2026 16:27:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"estado":true,"mensaje":"Registro de auditoría encontrado.","auditoria":{"id_auditoria":107,"id_usuario":8,"usuario":"Benito Fernandez","usuario_email":"ferben@correo.com","metodo":"DELETE","ruta":"/api/v1/usuarios/999999","accion":"ELIMINAR","entidad":"usuarios","id_entidad":999999,"status_code":404,"fecha_hora":"2026-06-16T16:26:56.000Z"}}
\`\`\`

## GET /api/v1/auditoria/:id error (id inválido)

- Request:

\`\`\`http
GET /api/v1/auditoria/abc
Authorization: Bearer <token>
\`\`\`

- Response headers:

\`\`\`
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 126
ETag: W/"7e-Ebny1yVY60I545Qn1fAMVIhz8gU"
Date: Tue, 16 Jun 2026 16:26:56 GMT
Connection: keep-alive
Keep-Alive: timeout=5

\`\`\`

- Response body:

\`\`\`json
{"errors":[{"type":"field","value":"abc","msg":"El ID debe ser un número entero","path":"id_auditoria","location":"params"}]}
\`\`\`


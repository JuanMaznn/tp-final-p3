#!/bin/zsh
set -euo pipefail
export PATH="/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:$PATH"
BASE='http://127.0.0.1:3000'
OUT='tmp/api_audit_report.md'
: > "$OUT"

echo '# API audit report' >> "$OUT"
echo '' >> "$OUT"
echo "Generated at: $(date -u '+%Y-%m-%dT%H:%M:%SZ')" >> "$OUT"
echo '' >> "$OUT"

json_get() {
  node -e "const obj=JSON.parse(process.argv[1]); const path=process.argv[2].split('.'); let cur=obj; for (const p of path){ if(!p) continue; cur=cur?.[p]; } if (cur===undefined || cur===null) process.stdout.write(''); else if (typeof cur === 'object') process.stdout.write(JSON.stringify(cur)); else process.stdout.write(String(cur));" "$1" "$2"
}

call_json() {
  local label="$1"; shift
  local method="$1"; shift
  local path="$1"; shift
  local token="$1"; shift
  local data="${1-}"
  local tmpBody=$(/usr/bin/mktemp)
  local tmpHead=$(/usr/bin/mktemp)
  local -a args
  args=(-s -D "$tmpHead" -o "$tmpBody" -X "$method" "$BASE$path")
  if [[ -n "$token" ]]; then
    args+=(-H "Authorization: Bearer $token")
  fi
  if [[ -n "$data" ]]; then
    args+=(-H 'Content-Type: application/json' -d "$data")
  fi
  /usr/bin/curl "${args[@]}"
  {
    echo "## $label"
    echo ''
    echo '- Request:'
    echo ''
    echo '\`\`\`http'
    echo "$method $path"
    if [[ -n "$token" ]]; then echo "Authorization: Bearer <token>"; fi
    if [[ -n "$data" ]]; then echo; echo "$data"; fi
    echo '\`\`\`'
    echo ''
    echo '- Response headers:'
    echo ''
    echo '\`\`\`'
    /usr/bin/sed 's/\r$//' "$tmpHead"
    echo '\`\`\`'
    echo ''
    echo '- Response body:'
    echo ''
    echo '\`\`\`json'
    /bin/cat "$tmpBody"
    echo
    echo '\`\`\`'
    echo
  } >> "$OUT"
  /bin/rm -f "$tmpBody" "$tmpHead"
}

call_form() {
  local label="$1"; shift
  local method="$1"; shift
  local path="$1"; shift
  local token="$1"; shift
  local formSpec="$1"
  local tmpBody=$(/usr/bin/mktemp)
  local tmpHead=$(/usr/bin/mktemp)
  local -a args
  args=(-s -D "$tmpHead" -o "$tmpBody" -X "$method" "$BASE$path")
  if [[ -n "$token" ]]; then
    args+=(-H "Authorization: Bearer $token")
  fi
  IFS='|' read -r -A forms <<< "$formSpec"
  for f in "${forms[@]}"; do
    args+=(-F "$f")
  done
  /usr/bin/curl "${args[@]}"
  {
    echo "## $label"
    echo ''
    echo '- Request:'
    echo ''
    echo '\`\`\`http'
    echo "$method $path"
    if [[ -n "$token" ]]; then echo "Authorization: Bearer <token>"; fi
    for f in "${forms[@]}"; do echo "FORM $f"; done
    echo '\`\`\`'
    echo ''
    echo '- Response headers:'
    echo ''
    echo '\`\`\`'
    /usr/bin/sed 's/\r$//' "$tmpHead"
    echo '\`\`\`'
    echo ''
    echo '- Response body:'
    echo ''
    echo '\`\`\`json'
    /bin/cat "$tmpBody"
    echo
    echo '\`\`\`'
    echo
  } >> "$OUT"
  /bin/rm -f "$tmpBody" "$tmpHead"
}

call_binary() {
  local label="$1"; shift
  local method="$1"; shift
  local path="$1"; shift
  local token="$1"; shift
  local tmpBody=$(/usr/bin/mktemp)
  local tmpHead=$(/usr/bin/mktemp)
  local -a args
  args=(-s -D "$tmpHead" -o "$tmpBody" -X "$method" "$BASE$path")
  if [[ -n "$token" ]]; then args+=(-H "Authorization: Bearer $token"); fi
  /usr/bin/curl "${args[@]}"
  local size=$(/usr/bin/wc -c < "$tmpBody" | /usr/bin/tr -d ' ')
  {
    echo "## $label"
    echo ''
    echo '- Request:'
    echo ''
    echo '\`\`\`http'
    echo "$method $path"
    if [[ -n "$token" ]]; then echo "Authorization: Bearer <token>"; fi
    echo '\`\`\`'
    echo ''
    echo '- Response headers:'
    echo ''
    echo '\`\`\`'
    /usr/bin/sed 's/\r$//' "$tmpHead"
    echo '\`\`\`'
    echo ''
    echo "- Binary body omitted (${size} bytes)."
    echo
  } >> "$OUT"
  /bin/rm -f "$tmpBody" "$tmpHead"
}

# Bootstrap admin via recovery
ADMIN_EMAIL='ferben@correo.com'
ADMIN_PASS='TempAdmin#2026'
REC_ADMIN=$(/usr/bin/curl -s -X POST "$BASE/api/v1/auth/recuperar" -H 'Content-Type: application/json' -d '{"email":"'$ADMIN_EMAIL'"}')
ADMIN_RESET_TOKEN=$(json_get "$REC_ADMIN" token)
ADMIN_RESET=$(/usr/bin/curl -s -X POST "$BASE/api/v1/auth/restablecer/$ADMIN_RESET_TOKEN" -H 'Content-Type: application/json' -d '{"contrasenia":"'$ADMIN_PASS'"}')
ADMIN_LOGIN=$(/usr/bin/curl -s -X POST "$BASE/api/v1/auth/login" -H 'Content-Type: application/json' -d '{"email":"'$ADMIN_EMAIL'","contrasenia":"'$ADMIN_PASS'"}')
ADMIN_JWT=$(json_get "$ADMIN_LOGIN" token)

# Create temp users/resources
TS=$(date +%s)
SUF=$((TS % 1000000))
DOC_EMAIL='lopmar@correo.com'
PAT_EMAIL='lopjac@correo.com'
DOC_PASS='TempDoc#2026'
PAT_PASS='TempPac#2026'
DEL_SPEC_NAME="ESP_TEST_$TS"
DEL_OS_NAME="OS_TEST_$TS"

MEDICOS=$(/usr/bin/curl -s "$BASE/api/v1/medicos" -H "Authorization: Bearer $ADMIN_JWT")
PACIENTES=$(/usr/bin/curl -s "$BASE/api/v1/pacientes" -H "Authorization: Bearer $ADMIN_JWT")
DOC_ID=$(node -e "const x=JSON.parse(process.argv[1]); const email=process.argv[2]; const m=(x.medicos||[]).find(v=>v.email===email); process.stdout.write(String(m?.id_medico||''));" "$MEDICOS" "$DOC_EMAIL")
PAT_ID=$(node -e "const x=JSON.parse(process.argv[1]); const email=process.argv[2]; const p=(x.pacientes||[]).find(v=>v.email===email); process.stdout.write(String(p?.id_paciente||''));" "$PACIENTES" "$PAT_EMAIL")
DOC_USER_ID=1
PAT_USER_ID=5

REC_DOC_BOOT=$(/usr/bin/curl -s -X POST "$BASE/api/v1/auth/recuperar" -H 'Content-Type: application/json' -d '{"email":"'$DOC_EMAIL'"}')
DOC_BOOT_TOKEN=$(json_get "$REC_DOC_BOOT" token)
/usr/bin/curl -s -X POST "$BASE/api/v1/auth/restablecer/$DOC_BOOT_TOKEN" -H 'Content-Type: application/json' -d '{"contrasenia":"'$DOC_PASS'"}' >/dev/null
REC_PAT_BOOT=$(/usr/bin/curl -s -X POST "$BASE/api/v1/auth/recuperar" -H 'Content-Type: application/json' -d '{"email":"'$PAT_EMAIL'"}')
PAT_BOOT_TOKEN=$(json_get "$REC_PAT_BOOT" token)
/usr/bin/curl -s -X POST "$BASE/api/v1/auth/restablecer/$PAT_BOOT_TOKEN" -H 'Content-Type: application/json' -d '{"contrasenia":"'$PAT_PASS'"}' >/dev/null

DOC_LOGIN=$(/usr/bin/curl -s -X POST "$BASE/api/v1/auth/login" -H 'Content-Type: application/json' -d '{"email":"'$DOC_EMAIL'","contrasenia":"'$DOC_PASS'"}')
PAT_LOGIN=$(/usr/bin/curl -s -X POST "$BASE/api/v1/auth/login" -H 'Content-Type: application/json' -d '{"email":"'$PAT_EMAIL'","contrasenia":"'$PAT_PASS'"}')
DOC_JWT=$(json_get "$DOC_LOGIN" token)
PAT_JWT=$(json_get "$PAT_LOGIN" token)

SPEC_CREATE=$(/usr/bin/curl -s -X POST "$BASE/api/v1/especialidades" -H "Authorization: Bearer $ADMIN_JWT" -H 'Content-Type: application/json' -d '{"nombre":"'$DEL_SPEC_NAME'"}')
SPEC_ID=$(printf '%s' "$SPEC_CREATE" | sed -n 's/.*ID Creado \([0-9][0-9]*\).*/\1/p')
OS_CREATE=$(/usr/bin/curl -s -X POST "$BASE/api/v1/obras-sociales" -H "Authorization: Bearer $ADMIN_JWT" -H 'Content-Type: application/json' -d '{"nombre":"'$DEL_OS_NAME'","descripcion":"Obra temporal","porcentajeDescuento":15,"esParticular":false}')
OS_ID=$(printf '%s' "$OS_CREATE" | sed -n 's/.*ID \([0-9][0-9]*\).*/\1/p')

# create and use temp turno
TURNO_CREATE=$(/usr/bin/curl -s -X POST "$BASE/api/v1/turnos" -H "Authorization: Bearer $PAT_JWT" -H 'Content-Type: application/json' -d "{\"id_medico\":$DOC_ID,\"id_paciente\":$PAT_ID,\"fecha_hora\":\"2026-12-31 10:00:00\"}")
TURNO_ID=$(json_get "$TURNO_CREATE" turno.id_turno_reserva)

# auditoria sample id
AUD_ALL=$(/usr/bin/curl -s "$BASE/api/v1/auditoria?limit=1" -H "Authorization: Bearer $ADMIN_JWT")
AUD_ID=$(node -e "const x=JSON.parse(process.argv[1]); const rows=x.registros||x.auditoria||x.data||[]; const id=rows[0]?.id_auditoria||rows[0]?.id||''; process.stdout.write(String(id));" "$AUD_ALL")

# Root and auth
call_json 'GET / success' GET '/' '' ''
call_json 'POST /api/v1/auth/login success (admin)' POST '/api/v1/auth/login' '' '{"email":"ferben@correo.com","contrasenia":"TempAdmin#2026"}'
call_json 'POST /api/v1/auth/login error (wrong password)' POST '/api/v1/auth/login' '' '{"email":"ferben@correo.com","contrasenia":"wrongpass"}'
call_json 'POST /api/v1/auth/recuperar success' POST '/api/v1/auth/recuperar' '' '{"email":"ferben@correo.com"}'
call_json 'POST /api/v1/auth/recuperar error (email inexistente)' POST '/api/v1/auth/recuperar' '' '{"email":"noexiste@correo.com"}'
REC_PAT=$(/usr/bin/curl -s -X POST "$BASE/api/v1/auth/recuperar" -H 'Content-Type: application/json' -d '{"email":"'$PAT_EMAIL'"}')
PAT_RESET_TOKEN=$(json_get "$REC_PAT" token)
call_json 'GET /api/v1/auth/validar-token/:token success' GET "/api/v1/auth/validar-token/$PAT_RESET_TOKEN" '' ''
call_json 'GET /api/v1/auth/validar-token/:token error' GET '/api/v1/auth/validar-token/token-invalido' '' ''
REC_DOC=$(/usr/bin/curl -s -X POST "$BASE/api/v1/auth/recuperar" -H 'Content-Type: application/json' -d '{"email":"'$DOC_EMAIL'"}')
DOC_RESET_TOKEN=$(json_get "$REC_DOC" token)
call_json 'POST /api/v1/auth/restablecer/:token success' POST "/api/v1/auth/restablecer/$DOC_RESET_TOKEN" '' '{"contrasenia":"DocPass#2026b"}'
call_json 'POST /api/v1/auth/restablecer/:token error (token inválido)' POST '/api/v1/auth/restablecer/token-invalido' '' '{"contrasenia":"123456"}'
DOC_LOGIN2=$(/usr/bin/curl -s -X POST "$BASE/api/v1/auth/login" -H 'Content-Type: application/json' -d '{"email":"'$DOC_EMAIL'","contrasenia":"DocPass#2026b"}')
DOC_JWT=$(json_get "$DOC_LOGIN2" token)

# Especialidades
call_json 'GET /api/v1/especialidades success' GET '/api/v1/especialidades' "$ADMIN_JWT" ''
call_json 'GET /api/v1/especialidades error (sin token)' GET '/api/v1/especialidades' '' ''
call_json 'GET /api/v1/especialidades/:id success' GET '/api/v1/especialidades/1' "$ADMIN_JWT" ''
call_json 'GET /api/v1/especialidades/:id error (id inválido)' GET '/api/v1/especialidades/abc' "$ADMIN_JWT" ''
call_json 'POST /api/v1/especialidades success' POST '/api/v1/especialidades' "$ADMIN_JWT" '{"nombre":"CARDIO_TEST_'$TS'"}'
call_json 'POST /api/v1/especialidades error (rol paciente)' POST '/api/v1/especialidades' "$PAT_JWT" '{"nombre":"NOPE"}'
call_json 'PUT /api/v1/especialidades/:id success' PUT "/api/v1/especialidades/$SPEC_ID" "$ADMIN_JWT" '{"nombre":"ESP_EDITADA_'$TS'"}'
call_json 'PUT /api/v1/especialidades/:id error (body inválido)' PUT "/api/v1/especialidades/$SPEC_ID" "$ADMIN_JWT" '{"nombre":""}'
call_json 'DELETE /api/v1/especialidades/:id success' DELETE "/api/v1/especialidades/$SPEC_ID" "$ADMIN_JWT" ''
call_json 'DELETE /api/v1/especialidades/:id error (id inválido)' DELETE '/api/v1/especialidades/abc' "$ADMIN_JWT" ''

# Obras sociales
call_json 'GET /api/v1/obras-sociales success' GET '/api/v1/obras-sociales' "$ADMIN_JWT" ''
call_json 'GET /api/v1/obras-sociales/:id success' GET '/api/v1/obras-sociales/1' "$ADMIN_JWT" ''
call_json 'GET /api/v1/obras-sociales/:id error (id inválido)' GET '/api/v1/obras-sociales/abc' "$ADMIN_JWT" ''
call_json 'POST /api/v1/obras-sociales success' POST '/api/v1/obras-sociales' "$ADMIN_JWT" '{"nombre":"OS_EXTRA_'$TS'","descripcion":"Alta temporal","porcentajeDescuento":12,"esParticular":false}'
call_json 'POST /api/v1/obras-sociales error (validación)' POST '/api/v1/obras-sociales' "$ADMIN_JWT" '{"nombre":"","descripcion":"x","porcentajeDescuento":999,"esParticular":"no"}'
call_json 'PUT /api/v1/obras-sociales/:id success' PUT "/api/v1/obras-sociales/$OS_ID" "$ADMIN_JWT" '{"nombre":"OS_EDITADA_'$TS'","descripcion":"Editada","porcentajeDescuento":10,"esParticular":false}'
call_json 'PUT /api/v1/obras-sociales/:id error (rol médico)' PUT "/api/v1/obras-sociales/$OS_ID" "$DOC_JWT" '{"nombre":"X","descripcion":"Y","porcentajeDescuento":10,"esParticular":false}'
call_json 'DELETE /api/v1/obras-sociales/:id success' DELETE "/api/v1/obras-sociales/$OS_ID" "$ADMIN_JWT" ''
call_json 'DELETE /api/v1/obras-sociales/:id error (id inválido)' DELETE '/api/v1/obras-sociales/abc' "$ADMIN_JWT" ''

# Médicos
call_json 'GET /api/v1/medicos success' GET '/api/v1/medicos' "$ADMIN_JWT" ''
call_json 'GET /api/v1/medicos/especialidad/:id success' GET '/api/v1/medicos/especialidad/1' "$ADMIN_JWT" ''
call_json 'GET /api/v1/medicos/especialidad/:id error (id inválido)' GET '/api/v1/medicos/especialidad/abc' "$ADMIN_JWT" ''
call_json 'GET /api/v1/medicos/:id success' GET "/api/v1/medicos/$DOC_ID" "$ADMIN_JWT" ''
call_json 'GET /api/v1/medicos/:id error (no existe)' GET '/api/v1/medicos/999999' "$ADMIN_JWT" ''
call_json 'PUT /api/v1/medicos/:id/obras-sociales success' PUT "/api/v1/medicos/$DOC_ID/obras-sociales" "$ADMIN_JWT" '{"obras_sociales":[{"id_obra_social":1},{"id_obra_social":2}]}'
call_json 'PUT /api/v1/medicos/:id/obras-sociales error (body inválido)' PUT "/api/v1/medicos/$DOC_ID/obras-sociales" "$ADMIN_JWT" '{"obras_sociales":[]}'
call_json 'PUT /api/v1/medicos/:id success' PUT "/api/v1/medicos/$DOC_ID" "$ADMIN_JWT" '{"id_especialidad":2,"descripcion":"Actualizado por test","matricula":123456,"valor_consulta":15000}'
call_json 'PUT /api/v1/medicos/:id error (rol paciente)' PUT "/api/v1/medicos/$DOC_ID" "$PAT_JWT" '{"id_especialidad":2,"descripcion":"x","matricula":123,"valor_consulta":1}'
call_json 'PUT /api/v1/medicos/:id/especialidad success' PUT "/api/v1/medicos/$DOC_ID/especialidad" "$ADMIN_JWT" '{"id_especialidad":1}'
call_json 'PUT /api/v1/medicos/:id/especialidad error (especialidad inválida)' PUT "/api/v1/medicos/$DOC_ID/especialidad" "$ADMIN_JWT" '{"id_especialidad":999999}'

# Pacientes
call_json 'GET /api/v1/pacientes success' GET '/api/v1/pacientes' "$ADMIN_JWT" ''
call_json 'GET /api/v1/pacientes error (rol paciente)' GET '/api/v1/pacientes' "$PAT_JWT" ''
call_json 'GET /api/v1/pacientes/:id success' GET "/api/v1/pacientes/$PAT_ID" "$ADMIN_JWT" ''
call_json 'GET /api/v1/pacientes/:id error (id inválido)' GET '/api/v1/pacientes/abc' "$ADMIN_JWT" ''
call_json 'PUT /api/v1/pacientes/:id/obra-social success' PUT "/api/v1/pacientes/$PAT_ID/obra-social" "$ADMIN_JWT" '{"id_obra_social":2}'
call_json 'PUT /api/v1/pacientes/:id/obra-social error (rol médico)' PUT "/api/v1/pacientes/$PAT_ID/obra-social" "$DOC_JWT" '{"id_obra_social":1}'

# Turnos
call_json 'GET /api/v1/turnos success (admin)' GET '/api/v1/turnos' "$ADMIN_JWT" ''
call_json 'GET /api/v1/turnos/:id success (admin)' GET "/api/v1/turnos/$TURNO_ID" "$ADMIN_JWT" ''
call_json 'GET /api/v1/turnos/:id error (id inválido)' GET '/api/v1/turnos/abc' "$ADMIN_JWT" ''
call_json 'POST /api/v1/turnos success (paciente propio)' POST '/api/v1/turnos' "$PAT_JWT" "{\"id_medico\":$DOC_ID,\"id_paciente\":$PAT_ID,\"fecha_hora\":\"2026-12-31 11:00:00\"}"
call_json 'POST /api/v1/turnos error (paciente ajeno)' POST '/api/v1/turnos' "$PAT_JWT" "{\"id_medico\":$DOC_ID,\"id_paciente\":1,\"fecha_hora\":\"2026-12-31 12:00:00\"}"
call_json 'PUT /api/v1/turnos/:id success (admin)' PUT "/api/v1/turnos/$TURNO_ID" "$ADMIN_JWT" "{\"id_medico\":$DOC_ID,\"id_paciente\":$PAT_ID,\"fecha_hora\":\"2027-01-01 09:00:00\"}"
call_json 'PUT /api/v1/turnos/:id error (rol paciente)' PUT "/api/v1/turnos/$TURNO_ID" "$PAT_JWT" "{\"id_medico\":$DOC_ID,\"id_paciente\":$PAT_ID,\"fecha_hora\":\"2027-01-01 09:00:00\"}"
call_json 'PUT /api/v1/turnos/:id/atender success (médico dueño)' PUT "/api/v1/turnos/$TURNO_ID/atender" "$DOC_JWT" ''
call_json 'PUT /api/v1/turnos/:id/atender success (admin)' PUT "/api/v1/turnos/$TURNO_ID/atender" "$ADMIN_JWT" ''
call_json 'PUT /api/v1/turnos/:id/atender error (rol paciente)' PUT "/api/v1/turnos/$TURNO_ID/atender" "$PAT_JWT" ''

# Estadísticas
call_json 'GET /api/v1/estadisticas success (admin)' GET '/api/v1/estadisticas' "$ADMIN_JWT" ''
call_json 'GET /api/v1/estadisticas error (rol médico)' GET '/api/v1/estadisticas' "$DOC_JWT" ''
call_json 'GET /api/v1/estadisticas/medico success' GET '/api/v1/estadisticas/medico' "$DOC_JWT" ''
call_json 'GET /api/v1/estadisticas/medico error (rol admin)' GET '/api/v1/estadisticas/medico' "$ADMIN_JWT" ''
call_binary 'GET /api/v1/estadisticas/pdf success' GET '/api/v1/estadisticas/pdf' "$ADMIN_JWT"
call_json 'GET /api/v1/estadisticas/pdf error (rol médico)' GET '/api/v1/estadisticas/pdf' "$DOC_JWT" ''
call_binary 'GET /api/v1/estadisticas/medico/pdf success' GET '/api/v1/estadisticas/medico/pdf' "$DOC_JWT"
call_json 'GET /api/v1/estadisticas/medico/pdf error (rol admin)' GET '/api/v1/estadisticas/medico/pdf' "$ADMIN_JWT" ''

# Usuarios
call_json 'GET /api/v1/usuarios success' GET '/api/v1/usuarios' "$ADMIN_JWT" ''
call_json 'GET /api/v1/usuarios error (rol paciente)' GET '/api/v1/usuarios' "$PAT_JWT" ''
call_json 'GET /api/v1/usuarios/:id success' GET "/api/v1/usuarios/$DOC_USER_ID" "$ADMIN_JWT" ''
call_json 'GET /api/v1/usuarios/:id error (id inválido)' GET '/api/v1/usuarios/abc' "$ADMIN_JWT" ''
call_form 'POST /api/v1/usuarios success (admin crea admin)' POST '/api/v1/usuarios' "$ADMIN_JWT" "documento=7$SUF|apellido=Delete|nombres=Me|email=del.$TS@correo.com|contrasenia=DelPass#2026|rol=3"
call_form 'POST /api/v1/usuarios error (email inválido)' POST '/api/v1/usuarios' "$ADMIN_JWT" "documento=8$SUF|apellido=Bad|nombres=User|email=no-es-email|contrasenia=abc|rol=3"
DEL_USER_LOOKUP=$(/usr/bin/curl -s "$BASE/api/v1/usuarios" -H "Authorization: Bearer $ADMIN_JWT")
DEL_USER_ID=$(node -e "const x=JSON.parse(process.argv[1]); const u=(x.usuarios||[]).find(v=>v.email===process.argv[2]); process.stdout.write(String(u?.id_usuario||''));" "$DEL_USER_LOOKUP" "del.$TS@correo.com")
call_json 'PUT /api/v1/usuarios/:id success' PUT "/api/v1/usuarios/$DOC_USER_ID" "$ADMIN_JWT" '{"apellido":"DoctorMod","email":"'$DOC_EMAIL'"}'
call_json 'PUT /api/v1/usuarios/:id error (rol médico)' PUT "/api/v1/usuarios/$DOC_USER_ID" "$DOC_JWT" '{"apellido":"Nope"}'
call_json 'DELETE /api/v1/usuarios/:id success' DELETE "/api/v1/usuarios/$DEL_USER_ID" "$ADMIN_JWT" ''
call_json 'DELETE /api/v1/usuarios/:id error (no existe)' DELETE '/api/v1/usuarios/999999' "$ADMIN_JWT" ''

# Auditoría
call_json 'GET /api/v1/auditoria success' GET '/api/v1/auditoria?limit=2' "$ADMIN_JWT" ''
call_json 'GET /api/v1/auditoria error (rol paciente)' GET '/api/v1/auditoria' "$PAT_JWT" ''
call_json 'GET /api/v1/auditoria/usuario/:id success' GET '/api/v1/auditoria/usuario/8?limit=2' "$ADMIN_JWT" ''
call_json 'GET /api/v1/auditoria/usuario/:id error (id inválido)' GET '/api/v1/auditoria/usuario/abc' "$ADMIN_JWT" ''
if [[ -n "$AUD_ID" ]]; then
  call_json 'GET /api/v1/auditoria/:id success' GET "/api/v1/auditoria/$AUD_ID" "$ADMIN_JWT" ''
else
  echo '## GET /api/v1/auditoria/:id success' >> "$OUT"
  echo '' >> "$OUT"
  echo 'No se pudo resolver un id_auditoria válido desde la respuesta real del servidor.' >> "$OUT"
  echo '' >> "$OUT"
fi
call_json 'GET /api/v1/auditoria/:id error (id inválido)' GET '/api/v1/auditoria/abc' "$ADMIN_JWT" ''

echo "REPORT=$OUT"

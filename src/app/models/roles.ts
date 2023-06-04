interface Roles {
  role: string;
  name: string;
}

export let roles: Roles[] = [
  {role: 'DOCTOR_MAIN', name: 'Dr. principal'},
  {role: 'DOCTOR_MEMBER', name: 'Dr. miembro'},
  {role: 'ASSISTANT', name: 'Asistente'},
  {role: 'SPONSOR', name: 'Patrocinador'},
  {role: 'ADMIN', name: 'Administrador'},
]

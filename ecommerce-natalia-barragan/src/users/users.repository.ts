 import { Injectable } from "@nestjs/common";

type User = {
    id:string
    email: string
    name: string
    password: string
    address: string
    phone: string
    country?: string | undefined
    city?: string | undefined
}

const users: User[] = [
  {
    id: "1",
    email: "juan.perez@example.com",
    name: "Juan Pérez",
    password: "Password123!",
    address: "Calle Falsa 123",
    phone: "+54 11 1234 5678",
    country: "Argentina",
    city: "Buenos Aires",
  },
  {
    id: "2",
    email: "maria.gomez@example.com",
    name: "María Gómez",
    password: "SecurePass456!",
    address: "Av. Libertador 456",
    phone: "+34 91 234 5678",
    country: "España",
    city: "Madrid",
  },  
  {
    id: "3",
    email: "carlos.lopez@example.com",
    name: "Carlos López",
    password: "MyPass789!",
    address: "Rua Augusta 789",
    phone: "+55 11 98765 4321",
    country: "Brasil",
    city: "São Paulo",
  },
  {
    id: "4",
    email: "sofia.martinez@example.com",
    name: "Sofía Martínez",
    password: "Qwerty123!",
    address: "5th Avenue 101",
    phone: "+1 555 123 4567",
    country: "Estados Unidos",
    city: "New York",
  },
  {
    id: "5",
    email: "luis.ramirez@example.com",
    name: "Luis Ramírez",
    password: "Abc!2345",
    address: "Calle Mayor 202",
    phone: "+52 55 1234 9876",
    country: "México",
    city: "Ciudad de México",
  },
  {
    id: "6",
    email: "ana.fernandez@example.com",
    name: "Ana Fernández",
    password: "StrongPass!89",
    address: "Via Roma 303",
    phone: "+39 06 1234 5678",
    // Sin country ni city (propiedades opcionales)
  },
   {
    id: "7",
    email: "luis.alvarez@example.com",
    name: "Luis Álvarez",
    password: "Abc!2345",
    address: "Calle Mayor 202",
    phone: "+52 55 1234 9876",
    country: "México",
    city: "Ciudad de México",
  },
   {
    id: "8",
    email: "Claudia.ramirez@example.com",
    name: "Claudia Ramírez",
    password: "Abc!2345",
    address: "Calle Mayor 202",
    phone: "+52 55 1234 9876",
    country: "México",
    city: "Ciudad de México",
  },
   {
    id: "9",
    email: "gastolopez@example.com",
    name: "Gastón López",
    password: "Abc!2345",
    address: "Calle Mayor 202",
    phone: "+52 55 1234 9876",
    country: "México",
    city: "Ciudad de México",
  },
   {
    id: "10",
    email: "nati@example.com",
    name: "Natalia Barragan",
    password: "Abc!2345",
    address: "Calle Mayor 202",
    phone: "+52 55 1234 9876",
    country: "México",
    city: "Ciudad de México",
  },
];

Injectable()
export class UsersRepository {
  async getAllUsers(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const usersList = users.slice(start, end);// el slice tiene en cuenta el primer elemento pero no el ultimo
    return await usersList.map(
      ({password, ...userNoPassword}) => userNoPassword
    ); 
  }

  getUserById(id: string) {
    const index = users.findIndex(user => user.id === id);
    if(index === -1) return `No se encontro al usuario con id ${id}`
    const {password,  ...userNoPassword} = users [index];
    return userNoPassword;
  }

  addUser(user: User){
    users.push({...user, id: user.email});
    const {password, ...userNoPassword} = user;
    return userNoPassword;
  }

  updateUser(id: string, user: User){
    const index = users.findIndex(user => user.id === id);
    if(index === -1) return `No se encontro al usuario con id ${id}`;
    users [index] = { ...users[index], ...user};
    //{le pongo todo lo que ya tiene, y le piso la nueva inforacion}
    return users[index].id;
  }

  deleteUser(id: string){
    const index = users.findIndex(user => user.id === id);
    if(index === -1) return `No se encontro al usuario con is ${id}`
    users.splice(index, 1); //splice saca solo un elemento (1) desde el indice encontrado
    return id;
  }

  getUserByEmail(email: string){
    return users.find((user) => user.email === email);
  }
}
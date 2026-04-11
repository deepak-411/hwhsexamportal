'use client';

export type User = {
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  faculty: 'Science' | 'Commerce' | 'Robotics' | 'Computer';
};

const USERS_STORAGE_KEY = 'hwhs_users_v2';
const CURRENT_USER_STORAGE_KEY = 'hwhs_currentUser';

const DEFAULT_USERS: User[] = [
  // Class 12 Commerce - Official List
  { name: 'VEDANT SHANKAR LIMBANI', rollNumber: '1', class: '12', section: 'Daffodils', faculty: 'Commerce' },
  { name: 'AYUSH ARUP CHATTARAJ', rollNumber: '2', class: '12', section: 'Daffodils', faculty: 'Commerce' },
  { name: 'RAYYAN IMRAN NAI', rollNumber: '3', class: '12', section: 'Daffodils', faculty: 'Commerce' },
  { name: 'VINAYAK SACHIN PANDEY', rollNumber: '4', class: '12', section: 'Daffodils', faculty: 'Commerce' },
  { name: 'T ROHIT RAO', rollNumber: '5', class: '12', section: 'Daffodils', faculty: 'Commerce' },
  { name: 'ARVIND MOTARAM CHOUDHARY', rollNumber: '6', class: '12', section: 'Daffodils', faculty: 'Commerce' },
  { name: 'YUKTA TEJAS PATIL', rollNumber: '7', class: '12', section: 'Daffodils', faculty: 'Commerce' },
  { name: 'SOHAIL SAMIM SHAIKH', rollNumber: '8', class: '12', section: 'Daffodils', faculty: 'Commerce' },

  // Class 12 Science (Placeholder)
  { name: 'Aman Deep', rollNumber: '101', class: '12', section: 'Daisies', faculty: 'Science' },
  { name: 'Neha Sharma', rollNumber: '102', class: '12', section: 'Daisies', faculty: 'Science' },

  // Class 6-9 (Existing)
  { name: 'Aarav jadhav', rollNumber: '1', class: '6', section: 'Daffodils', faculty: 'Robotics' },
  { name: 'Aarush PATIL', rollNumber: '2', class: '6', section: 'Daffodils', faculty: 'Robotics' },
  { name: 'Mishti Malviya', rollNumber: '19', class: '6', section: 'Daffodils', faculty: 'Robotics' },
  { name: 'Aarav ashok patel', rollNumber: '1', class: '9', section: 'Daffodils', faculty: 'Computer' },
  { name: 'Aayush patel', rollNumber: '2', class: '9', section: 'Daffodils', faculty: 'Computer' },
];

export function getStoredUsers(): User[] {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(USERS_STORAGE_KEY);
    const storedUsers = stored ? JSON.parse(stored) : [];
    const userMap = new Map<string, User>();
    DEFAULT_USERS.forEach(u => userMap.set(`${u.rollNumber}-${u.class}-${u.faculty}`, u));
    storedUsers.forEach((u: User) => userMap.set(`${u.rollNumber}-${u.class}-${u.faculty}`, u));
    return Array.from(userMap.values());
  }
  return DEFAULT_USERS;
}

export function storeNewUser(user: User): boolean {
  if (typeof window !== 'undefined') {
    let users = getStoredUsers();
    const exists = users.some(u => u.rollNumber === user.rollNumber && u.class === user.class && u.faculty === user.faculty);
    if (exists) return false;
    users.push(user);
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return true;
  }
  return false;
}

export function findUser(rollNumber: string, className: string, faculty: string): User | undefined {
    const users = getStoredUsers();
    return users.find(u => 
      u.rollNumber.trim() === rollNumber.trim() && 
      u.class.trim() === className.trim() && 
      u.faculty.toLowerCase() === faculty.toLowerCase()
    );
}

export function findUserByName(name: string, className: string, faculty: string): User | undefined {
    const users = getStoredUsers();
    return users.find(u => 
      u.name.trim().toLowerCase() === name.trim().toLowerCase() && 
      u.class.trim() === className.trim() && 
      u.faculty.toLowerCase() === faculty.toLowerCase()
    );
}

export function getUsersByClassAndFaculty(className: string, faculty: string): User[] {
    const users = getStoredUsers();
    return users.filter(u => u.class === className && u.faculty.toLowerCase() === faculty.toLowerCase());
}

export function setCurrentUser(user: User) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }
  return null;
}

export function clearCurrentUser() {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    }
}

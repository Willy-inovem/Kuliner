// lib/auth-client.js
'use client';

export function getToken() {
  return document.cookie.split(';').find(row => row.trim().startsWith('authToken='))?.split('=')[1];
}

export function getRole() {
  const roleCookie = document.cookie.split(';').find(row => row.trim().startsWith('userRole='));
  return roleCookie ? roleCookie.split('=')[1] : null;
}

export function isAuthenticated() {
  return !!getToken();
}

export function isAdmin() {
  return getRole() === 'admin';
}

export function logout() {
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  window.location.href = '/login';
}
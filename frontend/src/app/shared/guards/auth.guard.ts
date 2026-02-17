import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Guard de rota para proteção por autenticação.
 * Atualmente permite acesso a todas as rotas (placeholder para futura integração com login).
 * Quando houver auth: injetar AuthService, checar token/sessão e redirecionar para /login se não autenticado.
 */
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  // TODO: quando tiver AuthService: if (!authService.isAuthenticated()) { router.navigate(['/login']); return false; }
  return true;
};

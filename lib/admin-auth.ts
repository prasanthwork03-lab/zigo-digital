export const ADMIN_SESSION_COOKIE = "zigo_admin_session";

export function adminEmail() {
  return process.env.ADMIN_EMAIL || "";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export function adminSessionToken() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

export function isAdminCredentials(email: string, password: string) {
  const configuredEmail = adminEmail().trim().toLowerCase();
  const configuredPassword = adminPassword();

  return Boolean(configuredEmail && configuredPassword) && email.trim().toLowerCase() === configuredEmail && password === configuredPassword;
}

export function isAdminSessionToken(value?: string) {
  const configuredToken = adminSessionToken();

  return Boolean(configuredToken && value && value === configuredToken);
}

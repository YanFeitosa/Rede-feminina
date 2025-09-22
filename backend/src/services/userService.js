import User from '../models/User.js';
import {
  getUserByEmail as fsGetUserByEmail,
  createUser as fsCreateUser,
  updateUser as fsUpdateUser,
  comparePassword as fsComparePassword,
  changePassword as fsChangePassword,
  ensureDefaultAdmin as fsEnsureDefaultAdmin,
  sanitizeUser as fsSanitizeUser
} from '../storage/fileStore.js';

const useFile = process.env.USE_FILE_DB === 'true';

export async function findUserByEmail(email) {
  if (useFile) return fsGetUserByEmail(email);
  return User.findOne({ email });
}

export async function ensureDefaultAdmin() {
  if (useFile) return fsEnsureDefaultAdmin();
  // Mongo path handled in database.js createDefaultAdmin
}

export async function validatePassword(user, candidate) {
  if (!user) return false;
  if (useFile) return fsComparePassword(user, candidate);
  return user.comparePassword(candidate);
}

export async function updateLastLogin(user) {
  if (!user) return;
  if (useFile) {
    user.lastLogin = new Date().toISOString();
    await fsUpdateUser(user);
  } else {
    user.lastLogin = new Date();
    await user.save();
  }
}

export function sanitizeUser(user) {
  if (useFile) return fsSanitizeUser(user);
  if (!user) return null;
  const obj = user.toObject();
  delete obj.password;
  return obj;
}

export async function changeUserPassword(user, currentPassword, newPassword) {
  if (useFile) {
    const valid = await fsComparePassword(user, currentPassword);
    if (!valid) return false;
    await fsChangePassword(user, newPassword);
    return true;
  } else {
    const valid = await user.comparePassword(currentPassword);
    if (!valid) return false;
    user.password = newPassword;
    await user.save();
    return true;
  }
}

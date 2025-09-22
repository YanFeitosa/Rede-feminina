import 'dotenv/config';
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
import { getUserById as fsGetUserById } from '../storage/fileStore.js';

const isFileMode = () => process.env.USE_FILE_DB === 'true';

export async function findUserByEmail(email) {
  if (isFileMode()) return fsGetUserByEmail(email);
  return User.findOne({ email });
}

export async function findUserById(id) {
  if (isFileMode()) return fsGetUserById(id);
  return User.findById(id);
}

export async function ensureDefaultAdmin() {
  if (isFileMode()) return fsEnsureDefaultAdmin();
  // Mongo path handled in database.js createDefaultAdmin
}

export async function validatePassword(user, candidate) {
  if (!user) return false;
  if (isFileMode()) return fsComparePassword(user, candidate);
  return user.comparePassword(candidate);
}

export async function updateLastLogin(user) {
  if (!user) return;
  if (isFileMode()) {
    user.lastLogin = new Date().toISOString();
    await fsUpdateUser(user);
  } else {
    user.lastLogin = new Date();
    await user.save();
  }
}

export function sanitizeUser(user) {
  if (isFileMode()) return fsSanitizeUser(user);
  if (!user) return null;
  const obj = user.toObject();
  delete obj.password;
  return obj;
}

export async function changeUserPassword(user, currentPassword, newPassword) {
  if (isFileMode()) {
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

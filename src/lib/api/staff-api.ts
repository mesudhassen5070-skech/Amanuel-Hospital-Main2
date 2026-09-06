import { apiFetch, handleApiResponse } from "./client";
import { supabase } from "../supabase";

// ══════════════════════════════════════════════════════════════════════════════
// STAFF ACCOUNT TYPES
// ══════════════════════════════════════════════════════════════════════════════

export interface StaffAccount {
  id: string | number;
  username: string;
  role: string;
  displayName: string | null;
  isActive: boolean;
  isOnline: boolean;
  lastSeen: string | null;
  createdAt: string;
  updatedAt: string;
  specialty?: string;
  experience?: string;
  bio?: string;
}

export interface CreateStaffData {
  username: string;
  password: string;
  role: string;
  displayName: string;
  isActive: boolean;
  specialty?: string;
  experience?: string;
  bio?: string;
}

export interface UpdateStaffData {
  username: string;
  role: string;
  displayName: string;
  isActive: boolean;
  specialty?: string;
  experience?: string;
  bio?: string;
}

export interface ResetPasswordData {
  newPassword: string;
}

export interface ToggleStatusData {
  isActive?: boolean;
}

// ══════════════════════════════════════════════════════════════════════════════
// API FUNCTIONS WITH SUPABASE FALLBACK
// ══════════════════════════════════════════════════════════════════════════════

/**
 * GET /api/staff
 * Fetch all staff accounts
 */
export const getAllStaffAccounts = async (): Promise<StaffAccount[]> => {
  try {
    const response = await apiFetch("/api/staff", { method: "GET" });
    const result = await handleApiResponse<{ success: boolean; staff: StaffAccount[]; count: number }>(response);
    if (result.staff) return result.staff;
  } catch (apiErr) {
    console.warn("[Staff API] Express API getAllStaff failed, using Supabase fallback:", apiErr);
  }

  const { data, error } = await supabase
    .from("staff_accounts")
    .select("id, username, role, display_name, is_active, is_online, last_seen, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[Staff API] Supabase fallback error:", error);
    return [];
  }

  return (data || []).map((account: any) => ({
    id: account.id.toString(),
    username: account.username,
    role: account.role,
    displayName: account.display_name,
    isActive: Boolean(account.is_active),
    isOnline: Boolean(account.is_online),
    lastSeen: account.last_seen,
    createdAt: account.created_at,
    updatedAt: account.updated_at,
  }));
};

/**
 * POST /api/staff
 * Create a new staff account
 */
export const createStaffAccount = async (data: CreateStaffData): Promise<StaffAccount> => {
  try {
    const response = await apiFetch("/api/staff", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await handleApiResponse<{ success: boolean; data: StaffAccount; message: string }>(response);
    return result.data;
  } catch (apiErr) {
    console.warn("[Staff API] Express API createStaff failed, using Supabase fallback:", apiErr);
    const roleUpper = data.role.toUpperCase();
    const { data: created, error } = await supabase
      .from("staff_accounts")
      .insert({
        username: data.username.toLowerCase().trim(),
        password_hash: data.password,
        role: roleUpper,
        display_name: data.displayName.trim(),
        is_active: data.isActive !== undefined ? data.isActive : true,
      })
      .select()
      .single();

    if (error || !created) {
      throw apiErr;
    }

    if (roleUpper === "DOCTOR") {
      try {
        await supabase.from("doctors").upsert({
          username: created.username,
          specialty: data.specialty || "General Practice",
          experience: data.experience || "5+ years",
          bio: data.bio || "Specialist physician at Dr. Amanuel Hospital.",
          is_available: true,
        });
      } catch (docErr) {
        console.warn("[Staff API] Doctor profile upsert notice:", docErr);
      }
    }

    return {
      id: created.id.toString(),
      username: created.username,
      role: created.role,
      displayName: created.display_name,
      isActive: Boolean(created.is_active),
      isOnline: Boolean(created.is_online),
      lastSeen: created.last_seen,
      createdAt: created.created_at,
      updatedAt: created.updated_at,
    };
  }
};

/**
 * PUT /api/staff/:id
 * Update staff account details
 */
export const updateStaffAccount = async (id: string | number, data: UpdateStaffData): Promise<StaffAccount> => {
  try {
    const response = await apiFetch(`/api/staff/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const result = await handleApiResponse<{ success: boolean; data: StaffAccount; message: string }>(response);
    return result.data;
  } catch (apiErr) {
    console.warn("[Staff API] Express API updateStaff failed, using Supabase fallback:", apiErr);
    const numId = typeof id === "number" ? id : parseInt(String(id), 10);
    const filter = isNaN(numId) ? { username: String(id) } : { id: numId };

    const { data: updated, error } = await supabase
      .from("staff_accounts")
      .update({
        username: data.username.toLowerCase().trim(),
        role: data.role.toUpperCase(),
        display_name: data.displayName.trim(),
        is_active: data.isActive,
      })
      .match(filter)
      .select()
      .single();

    if (error || !updated) {
      throw apiErr;
    }

    return {
      id: updated.id.toString(),
      username: updated.username,
      role: updated.role,
      displayName: updated.display_name,
      isActive: Boolean(updated.is_active),
      isOnline: Boolean(updated.is_online),
      lastSeen: updated.last_seen,
      createdAt: updated.created_at,
      updatedAt: updated.updated_at,
    };
  }
};

/**
 * PUT /api/staff/:id/password
 * Reset staff password
 */
export const resetStaffPassword = async (id: string | number, data: ResetPasswordData): Promise<void> => {
  try {
    const response = await apiFetch(`/api/staff/${id}/password`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    await handleApiResponse<{ success: boolean; message: string }>(response);
  } catch (apiErr) {
    console.warn("[Staff API] Express API resetPassword failed, using Supabase fallback:", apiErr);
    const numId = typeof id === "number" ? id : parseInt(String(id), 10);
    const filter = isNaN(numId) ? { username: String(id) } : { id: numId };

    const { error } = await supabase
      .from("staff_accounts")
      .update({ password_hash: data.newPassword })
      .match(filter);

    if (error) throw apiErr;
  }
};

/**
 * PATCH /api/staff/:id/status
 * Toggle staff active status
 */
export const toggleStaffStatus = async (id: string | number, data?: ToggleStatusData): Promise<StaffAccount> => {
  try {
    const response = await apiFetch(`/api/staff/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(data || {}),
    });
    const result = await handleApiResponse<{ success: boolean; data: StaffAccount; message: string }>(response);
    return result.data;
  } catch (apiErr) {
    console.warn("[Staff API] Express API toggleStatus failed, using Supabase fallback:", apiErr);
    const numId = typeof id === "number" ? id : parseInt(String(id), 10);
    const filter = isNaN(numId) ? { username: String(id) } : { id: numId };

    let newStatus = data?.isActive;
    if (newStatus === undefined) {
      const { data: existing } = await supabase.from("staff_accounts").select("is_active").match(filter).single();
      newStatus = existing ? !existing.is_active : true;
    }

    const { data: updated, error } = await supabase
      .from("staff_accounts")
      .update({ is_active: newStatus })
      .match(filter)
      .select()
      .single();

    if (error || !updated) throw apiErr;

    return {
      id: updated.id.toString(),
      username: updated.username,
      role: updated.role,
      displayName: updated.display_name,
      isActive: Boolean(updated.is_active),
      isOnline: Boolean(updated.is_online),
      lastSeen: updated.last_seen,
      createdAt: updated.created_at,
      updatedAt: updated.updated_at,
    };
  }
};

/**
 * DELETE /api/staff/:id
 * Delete staff account with cascading cleanup
 */
export const deleteStaffAccount = async (id: string | number): Promise<void> => {
  try {
    const response = await apiFetch(`/api/staff/${id}`, {
      method: "DELETE",
    });
    await handleApiResponse<{ success: boolean; message: string }>(response);
  } catch (apiErr) {
    console.warn("[Staff API] Express API deleteStaff failed, using Supabase fallback:", apiErr);
    const numId = typeof id === "number" ? id : parseInt(String(id), 10);
    const filter = isNaN(numId) ? { username: String(id) } : { id: numId };

    const { error } = await supabase
      .from("staff_accounts")
      .delete()
      .match(filter);

    if (error) throw apiErr;
  }
};

// Donations API integrated with MercadoPago backend
import api from "@/lib/api";

// Fixed organizationId for Rede Feminina (you can make this dynamic later)
const REDE_FEMININA_ORG_ID = "507f1f77bcf86cd799439012";
const REDE_FEMININA_ORG_NAME = "Rede Feminina de Combate ao Câncer";

export interface SingleDonationData {
  amount: number;
  donorName?: string;
  donorEmail: string;
  donorPhone?: string;
  donorDocument?: string;
  message?: string;
}

export interface RecurringDonationData {
  amount: number;
  frequency?: "monthly" | "weekly" | "yearly";
  donorName?: string;
  donorEmail: string;
  donorPhone?: string;
  donorDocument?: string;
  message?: string;
}

export const createSingleDonation = async (data: SingleDonationData) => {
  return api.post("/api/donations/single", {
    organizationId: REDE_FEMININA_ORG_ID,
    organizationName: REDE_FEMININA_ORG_NAME,
    donorName: data.donorName || "Anônimo",
    ...data,
  });
};

export const createRecurringDonation = async (data: RecurringDonationData) => {
  return api.post("/api/donations/recurring", {
    organizationId: REDE_FEMININA_ORG_ID,
    organizationName: REDE_FEMININA_ORG_NAME,
    donorName: data.donorName || "Anônimo",
    frequency: "monthly",
    ...data,
  });
};

export const cancelRecurringDonation = async (subscriptionId: string) => {
  return api.delete(`/api/donations/recurring/${subscriptionId}`);
};

export const getSubscriptionStatus = async (subscriptionId: string) => {
  return api.get(`/api/donations/recurring/${subscriptionId}/status`);
};

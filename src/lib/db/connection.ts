// Database connection utility
// This is a basic implementation - you can replace with your preferred database solution

export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone?: string;
  email_verified: boolean;
  stripe_customer_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Address {
  id: string;
  user_id: string;
  type: 'shipping' | 'billing';
  first_name: string;
  last_name: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
  is_default: boolean;
  created_at: Date;
}

// Mock database for development - replace with your actual database
class MockDatabase {
  private users: Map<string, User> = new Map();
  private addresses: Map<string, Address> = new Map();

  // User methods
  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const user: User = {
      ...userData,
      id: this.generateId(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;

    const updatedUser = {
      ...user,
      ...updates,
      updated_at: new Date(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Address methods
  async createAddress(addressData: Omit<Address, 'id' | 'created_at'>): Promise<Address> {
    const address: Address = {
      ...addressData,
      id: this.generateId(),
      created_at: new Date(),
    };
    this.addresses.set(address.id, address);
    return address;
  }

  async findAddressesByUserId(userId: string): Promise<Address[]> {
    return Array.from(this.addresses.values()).filter(addr => addr.user_id === userId);
  }

  async updateAddress(id: string, updates: Partial<Address>): Promise<Address | null> {
    const address = this.addresses.get(id);
    if (!address) return null;

    const updatedAddress = { ...address, ...updates };
    this.addresses.set(id, updatedAddress);
    return updatedAddress;
  }

  async deleteAddress(id: string): Promise<boolean> {
    return this.addresses.delete(id);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

// Export singleton instance
export const db = new MockDatabase();

// For production, replace with actual database connection
// Example with Prisma:
/*
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
*/
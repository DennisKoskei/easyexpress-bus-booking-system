// @/types/auth.ts

export type SignupErrors = {
  firstName?: string[];
  lastName?: string[];
  phone?: string[];
  gender?: string[];
  age?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

// ✅ Custom OAuth profile types
export type GoogleProfile = {
  email: string;
  name?: string;
  picture?: string;
};

export type GithubProfile = {
  email: string;
  name?: string;
  login: string;
  avatar_url?: string;
};

export interface FacebookProfile {
  id: string;
  name: string;
  email: string;
  picture?: {
    data?: {
      url?: string;
    };
  };
}

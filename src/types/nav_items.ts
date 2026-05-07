export type Role = "admin" | "user";

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  allowed?: Role[];
  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
    allowed?: Role[];
  }[];
};

export type CollegeType = "PUBLIC" | "PRIVATE" | "COMMUNITY";

export type Program = {
  id: string;
  name: string;
  degree: string;
  collegeId: string;
};

export type College = {
  id: string;
  name: string;
  city: string;
  state: string;
  type: CollegeType;
  tuition: number;
  acceptanceRate: number;
  ranking: number | null;
  imageUrl: string | null;
  website: string | null;
  description: string;
  programs?: Program[];
  isSaved?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type PaginatedColleges = {
  colleges: College[];
  total: number;
  page: number;
  pageSize: number;
};

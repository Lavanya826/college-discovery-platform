import type { College, PaginatedColleges } from "@/types";

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Request failed");
  }

  return data;
}

export function getColleges(params: URLSearchParams) {
  return fetch(`/api/colleges?${params.toString()}`).then((response) => parseResponse<PaginatedColleges>(response));
}

export function getCollege(id: string) {
  return fetch(`/api/colleges/${id}`).then((response) => parseResponse<{ college: College }>(response));
}

export function getSavedColleges() {
  return fetch("/api/saved").then((response) => parseResponse<{ colleges: College[] }>(response));
}

export function saveCollege(collegeId: string) {
  return fetch(`/api/saved/${collegeId}`, { method: "POST" }).then((response) => parseResponse<{ saved: boolean }>(response));
}

export function removeSavedCollege(collegeId: string) {
  return fetch(`/api/saved/${collegeId}`, { method: "DELETE" }).then((response) => parseResponse<{ saved: boolean }>(response));
}

"use client";

import { useEffect, useState } from "react";
import type { College } from "@/types";
import { getSavedColleges, removeSavedCollege, saveCollege } from "@/services/collegeService";

export function useSavedColleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedColleges()
      .then((data) => setColleges(data.colleges))
      .finally(() => setLoading(false));
  }, []);

  async function toggleSaved(college: College) {
    if (college.isSaved) {
      await removeSavedCollege(college.id);
      setColleges((current) => current.filter((item) => item.id !== college.id));
      return;
    }

    await saveCollege(college.id);
    setColleges((current) => [{ ...college, isSaved: true }, ...current]);
  }

  return { colleges, loading, toggleSaved };
}

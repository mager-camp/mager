import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CourseHeader from "./components/CourseHeader";
import CourseStats from "./components/CourseStats";
import CourseTable from "./components/CourseTable";

import { getAdminCourses } from "@/services/adminCourseService";

const formatDate = (value) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
};

const mapTypeToLabel = (type) => {
  if (type === "free") return "Biasa";
  if (type === "premium") return "Premium";
  return type || "-";
};

const mapCourseToTable = (course) => {
  return {
    id: course.id,
    user: course.instructor?.user?.fullName || "Admin",
    name: course.title,
    category: course.activity?.name || "-",
    type: mapTypeToLabel(course.type),
    created: formatDate(course.createdAt),
    updated: formatDate(course.updatedAt),
    status: course.deletedAt ? "Selesai" : "Aktif",
    raw: course,
  };
};

export default function CourseManagementFeature() {
  const [activeCourseType, setActiveCourseType] = useState("Biasa");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const courseQuery = useQuery({
    queryKey: ["admin-courses"],
    queryFn: getAdminCourses,
  });

  const allCourses = useMemo(() => {
    return (courseQuery.data || []).map(mapCourseToTable);
  }, [courseQuery.data]);

  const totalBiasa = allCourses.filter((item) => item.type === "Biasa").length;
  const totalPremium = allCourses.filter((item) => item.type === "Premium").length;

  const categoryStats = useMemo(() => {
    const result = {};

    allCourses.forEach((course) => {
      const key = course.category || "-";
      result[key] = (result[key] || 0) + 1;
    });

    return result;
  }, [allCourses]);

  const filteredCourses = allCourses.filter((course) => {
    const matchType =
      course.type.toLowerCase() === activeCourseType.toLowerCase();

    const matchStatus =
      statusFilter === "Semua" ||
      course.status.toLowerCase() === statusFilter.toLowerCase();

    return matchType && matchStatus;
  });

  return (
    <main className="w-full min-h-screen bg-[#f8fafc] px-6 py-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <CourseHeader />

        {courseQuery.error && (
          <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            Data kursus gagal dimuat: {courseQuery.error.message}
          </div>
        )}

        <CourseStats
          activeType={activeCourseType}
          onChangeType={setActiveCourseType}
          totalBiasa={totalBiasa}
          totalPremium={totalPremium}
          categoryStats={categoryStats}
        />

        {courseQuery.isLoading ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 text-sm text-slate-400 font-semibold">
            Memuat data kursus...
          </div>
        ) : (
          <CourseTable
            courses={filteredCourses}
            currentStatusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            activeTypeLabel={activeCourseType}
          />
        )}
      </div>
    </main>
  );
}

import { useState } from "react";
import { SUMMARY_STATS, SESSIONS } from "../constants/rekapLatihanData";

export function useRekapFilter() {
  const [activeFilter, setActiveFilter] = useState("7 Hari Terakhir");

  const stats    = SUMMARY_STATS[activeFilter];
  const sessions = SESSIONS[activeFilter] ?? [];

  return { activeFilter, setActiveFilter, stats, sessions };
}
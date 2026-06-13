import { getUserPremiumStatusRepo, getRecoverySchedulesRepo } from "./premium.repository.js";

// Mapping activity recovery → icon & deskripsi tampilan (FE)
const RECOVERY_DISPLAY = {
  PIJAT:           { icon: "leaf",      title: "Pijat Jaringan Dalam", desc: "Fokus pada kelenturan dan pemulihan otot." },
  MANDI_ES:        { icon: "snowflake", title: "Protokol Mandi Es",    desc: "Ice bath untuk meredakan peradangan." },
  ISTIRAHAT_AKTIF: { icon: "activity",  title: "Hari Istirahat Aktif", desc: "Aktivitas ringan, jaga detak jantung < 110 bpm." },
};

export const getPremiumStatus = async (userId) => {
  const user = await getUserPremiumStatusRepo(userId);

  const isActive =
    user?.isPremium && (!user.premiumExpiredAt || new Date(user.premiumExpiredAt) > new Date());

  return {
    isPremium:        Boolean(isActive),
    premiumExpiredAt: user?.premiumExpiredAt ?? null,
  };
};

export const getPeriodisasi = async (userId) => {
  const schedules = await getRecoverySchedulesRepo(userId);

  return schedules.map((s) => {
    const display = RECOVERY_DISPLAY[s.activity?.name] ?? {
      icon: "activity", title: s.activity?.name ?? "Recovery", desc: "",
    };

    const startDate = new Date(s.startAt);
    const today     = new Date();
    const isToday   = startDate.toDateString() === today.toDateString();
    const tomorrow  = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isTomorrow = startDate.toDateString() === tomorrow.toDateString();

    let hariLabel;
    if (isToday)         hariLabel = "Hari Ini";
    else if (isTomorrow) hariLabel = "Besok";
    else hariLabel = startDate.toLocaleDateString("id-ID", { weekday: "long" });

    return {
      id:        s.id,
      icon:      display.icon,
      title:     display.title,
      desc:      s.notes || display.desc,
      hari:      hariLabel,
      waktu:     startDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      highlight: isToday,
    };
  });
};
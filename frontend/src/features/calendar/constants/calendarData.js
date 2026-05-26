export const INITIAL_EVENTS = [
  { id: 1,  date: "2025-10-01", title: "Anggar",    time: "09:00", color: "blue"   },
  { id: 2,  date: "2025-10-01", title: "Teknik",    time: "14:00", color: "orange" },
  { id: 3,  date: "2025-10-02", title: "Anggar",    time: "10:00", color: "blue"   },
  { id: 4,  date: "2025-10-04", title: "Run",       time: "07:00", color: "orange" },
  { id: 5,  date: "2025-10-05", title: "Free",      time: null,    color: "gray", isRestDay: true },
  { id: 6,  date: "2025-10-08", title: "Teknik",    time: "08:00", color: "blue"   },
  { id: 7,  date: "2025-10-08", title: "Sparring",  time: "14:00", color: "orange" },
  { id: 8,  date: "2025-10-08", title: "Laser-Run", time: "17:30", color: "red"    },
  { id: 9,  date: "2025-10-12", title: "Teknik",    time: "09:00", color: "blue"   },
  { id: 10, date: "2025-10-19", title: "Anggar",    time: "10:00", color: "blue"   },
  { id: 11, date: "2025-10-26", title: "Sparring",  time: "09:00", color: "orange" },
];

export const MACROCYCLE_INFO = {
  cycle: "MACROCYCLE 03",
  phase: "PERSIAPAN KOMPETISI",
};

export const JENIS_LATIHAN_OPTIONS = [
  { value: "anggar",    label: "Anggar",    color: "blue"   },
  { value: "laser-run", label: "Laser-Run", color: "red"    },
  { value: "sparring",  label: "Sparring",  color: "orange" },
  { value: "teknik",    label: "Teknik",    color: "blue"   },
  { value: "fisik",     label: "Fisik",     color: "orange" },
  { value: "recovery",  label: "Recovery",  color: "gray"   },
];

export const INTENSITY_OPTIONS = ["LOW", "MED", "HIGH"];
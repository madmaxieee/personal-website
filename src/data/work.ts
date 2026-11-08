// Facts follow the résumé (public/files/Tsng_Kahiok_Resume.pdf); keep them in sync.

export interface Link {
  label: string;
  href: string;
}

export interface WorkEntry {
  name: string;
  href: string;
  summary: string;
  /** Language or medium, shown as the entry's metadata. */
  stack: string;
  role: string;
  years: string;
  extra?: Link[];
  /** Language of `summary` when it is not plain English, e.g. contains Tâi-lô. */
  lang?: string;
}

export const work: WorkEntry[] = [
  {
    name: "loglit",
    href: "https://github.com/madmaxieee/loglit",
    summary: "A command-line log highlighter: regex rules, and it peeks at stderr even when the stream is piped.",
    stack: "Go",
    role: "author",
    years: "2024–",
  },
  {
    name: "fff-snacks.nvim",
    href: "https://github.com/madmaxieee/fff-snacks.nvim",
    summary: "Brings fff's file search into the snacks.nvim picker.",
    stack: "Lua",
    role: "author",
    years: "2024–",
  },
  {
    name: "unclash.nvim",
    href: "https://github.com/madmaxieee/unclash.nvim",
    summary: "A three-way merge conflict manager for Neovim.",
    stack: "Lua",
    role: "author",
    years: "2024–",
  },
  {
    name: "Upstream",
    href: "https://github.com/madmaxieee",
    summary: "Bug fixes and features contributed to other people's tools.",
    stack: "pull requests",
    role: "contributor",
    years: "2024–",
    extra: [
      { label: "fff", href: "https://github.com/dmtrKovalenko/fff" },
      { label: "snacks.nvim", href: "https://github.com/folke/snacks.nvim" },
      { label: "blink.pairs", href: "https://github.com/saghen/blink.pairs" },
    ],
  },
  {
    name: "TaigiKeyboard",
    href: "https://github.com/taigikeyboard/taigikeyboard",
    summary:
      "An open-source Taiwanese input method for iOS, Android, macOS, Windows and Linux. Type in Tâi-lô, Pe̍h-ōe-jī or TPS; write in Hanji or mixed script.",
    stack: "multi-platform",
    role: "maintainer",
    years: "now",
  },
  {
    name: "qsyn",
    href: "https://github.com/DVLab-NTU/qsyn",
    summary:
      "A quantum circuit synthesis framework: ZX-calculus reduction and SAT-based oracle synthesis. Co-authored its IEEE QCE ’24 paper.",
    stack: "C++20",
    role: "maintainer",
    years: "2023–24",
    extra: [{ label: "arXiv:2405.07197", href: "https://arxiv.org/abs/2405.07197" }],
  },
  {
    name: "Light Dance Editor",
    href: "https://github.com/NTUEELightDance/LightDance-Editor",
    summary:
      "Led a ten-person team building an LED choreography editor and a Three.js stage simulator with custom GLSL shaders.",
    stack: "TypeScript",
    role: "team lead",
    years: "2022–23",
    extra: [{ label: "the performance", href: "https://youtu.be/rN6hMTVfCt4" }],
  },
];

export interface ExperienceEntry {
  org: string;
  title: string;
  dates: string;
  note: string;
}

export const experience: ExperienceEntry[] = [
  {
    org: "Google",
    title: "Firmware / System Software Engineer",
    dates: "Aug 2024 – now",
    note: "Modem BSP for Pixel: Linux kernel drivers and PCIe power management, Android modem userspace in Rust, and the test platform around them.",
  },
  {
    org: "Appier",
    title: "Software Engineering Intern, Frontend",
    dates: "Nov 2023 – Mar 2024",
    note: "Built the LINE Beacon configuration UI in the marketing console.",
  },
  {
    org: "National Taiwan University",
    title: "BSc, Electrical Engineering",
    dates: "2020 – 2024",
    note: "Where qsyn and Light Dance happened.",
  },
];

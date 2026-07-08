"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Banknote,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  CreditCard,
  Database,
  LayoutDashboard,
  Download,
  ExternalLink,
  FileText,
  FolderOpen,
  History,
  Home,
  Loader2,
  Mail,
  MapPin,
  MessageSquareText,
  Minus,
  PauseCircle,
  Plus,
  Printer,
  QrCode,
  ReceiptText,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Signal,
  ShoppingCart,
  Smartphone,
  TableProperties,
  Star,
  Tag,
  Trash2,
  Truck,
  User,
  UserPlus,
  Video,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Screen =
  | "home"
  | "dashboard"
  | "student-search"
  | "student-profile"
  | "new-student"
  | "catalog"
  | "payment"
  | "success"
  | "transactions"
  | "transaction-detail"
  | "void-flow"
  | "refund-request"
  | "suspended-sales"
  | "suspended-detail"
  | "pending-payments"
  | "demo-tools"
  | "pos-strategy-presentation"
  | "internal-resources"
  | "order-summary"
  | "delivery-info"
  | "receipt-preview";

type ProductType = "Digital Course" | "Book" | "E-book" | "Live Class";
type PaymentMethod = "Cash" | "Credit Card" | "QR Payment";
type TransactionStatus =
  | "Paid"
  | "SMS sent"
  | "Voided"
  | "Pending Payment"
  | "Cancelled"
  | "Refund Requested"
  | "Refund Approved / Sent to Accounting";
type CompletedTransactionStatus = "Paid" | "SMS sent";
type RefundStatus = "Refund Requested" | "Refund Approved / Sent to Accounting" | "Refund Rejected";
type BadgeTone = "slate" | "sky" | "green" | "amber" | "red" | "violet";
type TransactionFilter =
  | "All"
  | "Completed"
  | "Pending Payment"
  | "Suspended"
  | "Voided"
  | "Refund Requested"
  | "Sent to Accounting"
  | "Refund Rejected";

type DeliveryAddress = {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  address: string;
  method: string;
  estimate: string;
  isDefault?: boolean;
};

type Student = {
  id: string;
  name: string;
  grade: string;
  phone: string;
  parent: string;
  parentPhone?: string;
  school: string;
  courses: string[];
  purchases: string[];
  promotions: string[];
  alerts: string[];
  deliveryAddresses: DeliveryAddress[];
  activity: string[];
  isNew?: boolean;
};

type Product = {
  id: string;
  name: string;
  type: ProductType;
  subject: string;
  grade: string;
  sku: string;
  price: number;
  availability: string;
  detail: string;
  warning?: string;
  imageTone: string;
};

type CartLine = {
  lineId: string;
  product: Product;
  quantity: number;
  discount: number;
};

type TransactionItem = {
  productId: string;
  name: string;
  type: ProductType;
  quantity: number;
  price: number;
  discount: number;
};

type DiscountApproval = {
  amount: number;
  reason: string;
  manager: string;
  approvedAt: string;
};

type RefundInfo = {
  status: RefundStatus;
  originalStatus: CompletedTransactionStatus;
  reason: string;
  note: string;
  requestedBy: string;
  managerApproval: string;
  requestedAt: string;
  amount: number;
  decisionBy?: string;
  decisionAt?: string;
  decisionNote?: string;
  activity: Array<{
    status: RefundStatus;
    time: string;
    staff: string;
    note?: string;
  }>;
};

type Transaction = {
  id: string;
  time: string;
  student: string;
  studentId?: string;
  grade?: string;
  phone: string;
  staff: string;
  method: PaymentMethod;
  status: TransactionStatus;
  total: number;
  items: TransactionItem[];
  discountApproval?: DiscountApproval;
  deliveryAddress?: DeliveryAddress | null;
  promotionNames?: string[];
  refund?: RefundInfo;
};

type SuspendedSale = {
  id: string;
  time: string;
  date: string;
  student: Student;
  cart: CartLine[];
  discountApproval: DiscountApproval | null;
  staff: string;
  reason: string;
  note: string;
  status: "Suspended";
};

const staffName = "Arisa K.";
const branchName = "Siam Branch";
const currentTime = "6 Jul 2026, 14:28";
const branchOptions = ["Siam Branch"];

const baseStudents: Student[] = [
  {
    id: "STU-2401829",
    name: "Pimchanok Wongsa",
    grade: "Grade 12",
    phone: "081-234-8891",
    parent: "Krit Wongsa",
    parentPhone: "089-111-7821",
    school: "Triam Udom Suksa",
    courses: ["A-Level Math Intensive", "Physics Entrance Booster"],
    purchases: ["RC-260706-0188", "RC-260618-0120", "RC-260510-0084"],
    promotions: ["Summer Bundle", "Student Member Discount", "Buy Course + Book Promotion"],
    alerts: ["Suspended sale exists", "Upcoming Live Class", "Course expires soon"],
    deliveryAddresses: [
      {
        id: "ADDR-001",
        label: "Default home",
        recipient: "Pimchanok Wongsa",
        phone: "081-234-8891",
        address: "88/12 Rama I Road, Pathum Wan, Bangkok 10330",
        method: "Central delivery service",
        estimate: "2-4 business days",
        isDefault: true,
      },
      {
        id: "ADDR-002",
        label: "Parent office",
        recipient: "Krit Wongsa",
        phone: "089-111-7821",
        address: "55 Wireless Road, Lumphini, Pathum Wan, Bangkok 10330",
        method: "Central delivery service",
        estimate: "2-4 business days",
      },
    ],
    activity: ["SMS verified today", "Profile updated 18 Jun 2026"],
  },
  {
    id: "STU-2300944",
    name: "Nattapong Srisai",
    grade: "Grade 10",
    phone: "086-778-1234",
    parent: "Mali Srisai",
    parentPhone: "081-555-9900",
    school: "Assumption College",
    courses: ["Chemistry Foundation"],
    purchases: ["RC-260706-0187"],
    promotions: ["Student Member Discount", "Buy Course + Book Promotion"],
    alerts: ["Parent requested callback"],
    deliveryAddresses: [
      {
        id: "ADDR-011",
        label: "Home",
        recipient: "Nattapong Srisai",
        phone: "086-778-1234",
        address: "24 Charoen Krung Road, Bang Rak, Bangkok 10500",
        method: "Central delivery service",
        estimate: "2-4 business days",
        isDefault: true,
      },
    ],
    activity: ["Bought Chemistry Formula Book today"],
  },
  {
    id: "STU-2207715",
    name: "Chanida Rattanakul",
    grade: "Grade 11",
    phone: "089-555-1200",
    parent: "Suda Rattanakul",
    parentPhone: "082-444-1000",
    school: "Satit Chula",
    courses: ["Biology Concept E-book"],
    purchases: ["RC-260702-0144", "RC-260601-0099"],
    promotions: ["SAT Package", "Student Member Discount"],
    alerts: ["SMS failed", "Outstanding balance"],
    deliveryAddresses: [
      {
        id: "ADDR-021",
        label: "Condo",
        recipient: "Chanida Rattanakul",
        phone: "089-555-1200",
        address: "199 Phaya Thai Road, Ratchathewi, Bangkok 10400",
        method: "Central delivery service",
        estimate: "2-4 business days",
        isDefault: true,
      },
    ],
    activity: ["Parent purchased by Student ID"],
  },
];

const baseProducts: Product[] = [
  {
    id: "P-101",
    name: "A-Level Math Intensive",
    type: "Digital Course",
    subject: "Math",
    grade: "Grade 12",
    sku: "DC-MATH-A12",
    price: 12900,
    availability: "Instant access",
    detail: "Best seller at this branch",
    imageTone: "from-sky-600 to-cyan-500",
  },
  {
    id: "P-207",
    name: "Physics Entrance Booster",
    type: "Live Class",
    subject: "Physics",
    grade: "Grade 11",
    sku: "LC-PHY-112",
    price: 18500,
    availability: "8 seats remaining",
    detail: "Starts 18 Jul 2026",
    warning: "Low seats",
    imageTone: "from-amber-500 to-orange-500",
  },
  {
    id: "P-318",
    name: "Chemistry Formula Book",
    type: "Book",
    subject: "Chemistry",
    grade: "Grade 10",
    sku: "BK-CHE-010",
    price: 690,
    availability: "Delivery required",
    detail: "Central delivery after purchase",
    warning: "Book delivery",
    imageTone: "from-emerald-600 to-teal-500",
  },
  {
    id: "P-404",
    name: "Biology Concept E-book",
    type: "E-book",
    subject: "Biology",
    grade: "Grade 12",
    sku: "EB-BIO-012",
    price: 1490,
    availability: "Instant access",
    detail: "Activation by SMS",
    imageTone: "from-violet-600 to-fuchsia-500",
  },
  {
    id: "P-511",
    name: "TGAT English Speed Prep",
    type: "Digital Course",
    subject: "English",
    grade: "Grade 12",
    sku: "DC-ENG-TGAT",
    price: 7900,
    availability: "Instant access",
    detail: "Popular with walk-ins",
    imageTone: "from-slate-700 to-slate-500",
  },
  {
    id: "P-612",
    name: "Math Workbook Set",
    type: "Book",
    subject: "Math",
    grade: "Grade 11",
    sku: "BK-MATH-W11",
    price: 1250,
    availability: "Delivery required",
    detail: "Central delivery after purchase",
    warning: "Book delivery",
    imageTone: "from-rose-600 to-pink-500",
  },
];

const demoScenarios = ["Normal Day", "Promotion Week", "Exam Season", "Open House", "Heavy Branch Traffic"] as const;
type DemoScenario = (typeof demoScenarios)[number];

const thaiFirstNames = [
  "Achiraya", "Anongnart", "Benjawan", "Chayanit", "Chananchida", "Darika", "Kanyarat", "Kittipat",
  "Kornkanok", "Lalita", "Methinee", "Naphat", "Narin", "Nattapong", "Nichakorn", "Pannawat",
  "Patteera", "Phakphum", "Pimchanok", "Ploypailin", "Ratchanon", "Sirawit", "Sirin", "Supitcha",
  "Tanakorn", "Thanawat", "Thitiporn", "Warangkana", "Worawit", "Yingyot",
];
const thaiLastNames = [
  "Ariyaphan", "Boonmee", "Chaiyapruk", "Dechakul", "Intarachot", "Jirawat", "Kanjanaporn",
  "Lertpanya", "Maneewan", "Nakornchai", "Phromsak", "Rattanakul", "Saengchan", "Srisai",
  "Sukhum", "Tangtrakul", "Teerawat", "Thanapaisal", "Vongvanich", "Wongsa",
];
const bangkokSchools = [
  "Triam Udom Suksa", "Satit Chula", "Assumption College", "Mater Dei School", "Bangkok Christian College",
  "Suankularb Wittayalai", "Saint Joseph Convent", "Debsirin School", "Bodindecha School",
  "Samsenwittayalai School", "Horwang School", "Yothinburana School", "St. Gabriel's College",
  "Triam Udom Suksa Pattanakarn", "Kasetsart University Laboratory School",
];

const products = createDemoProducts(baseProducts);
const students = createDemoStudents(baseStudents, products);

const baseTransactions: Transaction[] = [
  {
    id: "RC-260706-0188",
    time: "14:16",
    student: "Pimchanok Wongsa",
    studentId: "STU-2401829",
    grade: "Grade 12",
    phone: "081-234-8891",
    staff: "Arisa K.",
    method: "Credit Card",
    status: "Paid",
    total: 19890,
    deliveryAddress: students[0].deliveryAddresses[0],
    promotionNames: ["Buy Course + Book Promotion"],
    items: [
      {
        productId: "P-101",
        name: "A-Level Math Intensive",
        type: "Digital Course",
        quantity: 1,
        price: 12900,
        discount: 500,
      },
      {
        productId: "P-318",
        name: "Chemistry Formula Book",
        type: "Book",
        quantity: 1,
        price: 690,
        discount: 0,
      },
    ],
  },
  {
    id: "RC-260706-0189",
    time: "14:24",
    student: "Pimchanok Wongsa",
    studentId: "STU-2401829",
    grade: "Grade 12",
    phone: "081-234-8891",
    staff: "Arisa K.",
    method: "QR Payment",
    status: "Pending Payment",
    total: 20330,
    deliveryAddress: students[0].deliveryAddresses[0],
    promotionNames: ["Student Member Discount"],
    items: [
      {
        productId: "P-207",
        name: "Physics Entrance Booster",
        type: "Live Class",
        quantity: 1,
        price: 18500,
        discount: 500,
      },
      {
        productId: "P-612",
        name: "Math Workbook Set",
        type: "Book",
        quantity: 1,
        price: 1250,
        discount: 0,
      },
    ],
  },
  {
    id: "RC-260706-0187",
    time: "14:02",
    student: "Nattapong Srisai",
    studentId: "STU-2300944",
    grade: "Grade 10",
    phone: "086-778-1234",
    staff: "Arisa K.",
    method: "Cash",
    status: "Paid",
    total: 690,
    items: [
      {
        productId: "P-318",
        name: "Chemistry Formula Book",
        type: "Book",
        quantity: 1,
        price: 690,
        discount: 0,
      },
    ],
  },
  {
    id: "RC-260706-0186",
    time: "13:54",
    student: "Walk-in: Thanawat",
    grade: "Grade 12",
    phone: "082-991-3344",
    staff: "Arisa K.",
    method: "QR Payment",
    status: "SMS sent",
    total: 12900,
    items: [
      {
        productId: "P-101",
        name: "A-Level Math Intensive",
        type: "Digital Course",
        quantity: 1,
        price: 12900,
        discount: 0,
      },
    ],
  },
  {
    id: "RC-260706-0181",
    time: "12:40",
    student: "Chanida Rattanakul",
    studentId: "STU-2207715",
    grade: "Grade 11",
    phone: "089-555-1200",
    staff: "Narin P.",
    method: "QR Payment",
    status: "Voided",
    total: 18500,
    items: [
      {
        productId: "P-207",
        name: "Physics Entrance Booster",
        type: "Live Class",
        quantity: 1,
        price: 18500,
        discount: 0,
      },
    ],
  },
];

const initialTransactions = createDemoTransactions(baseTransactions, students, products, "Normal Day");

const filters = [
  "Favorites",
  "Recently Viewed",
  "Best Selling",
  "Recently Sold",
  "Digital Course",
  "Book",
  "E-book",
  "Live Class",
  "Grade 12",
  "Math",
];

const voidReasons = [
  "Wrong Course",
  "Wrong Student",
  "Duplicate",
  "Customer Changed Mind",
  "Payment Issue",
  "Other",
];

const discountReasons = [
  "Promotion exception",
  "Staff approved discount",
  "Customer service recovery",
  "Bundle adjustment",
  "Other",
];

const refundReasons = [
  "Customer changed mind",
  "Wrong course purchased",
  "Duplicate purchase",
  "Payment issue",
  "Course not suitable",
  "Other",
];

const suspendReasons = [
  "Waiting for parent confirmation",
  "Customer forgot wallet",
  "Waiting for payment",
  "Customer will come back later",
  "Staff needs manager confirmation",
  "Other",
];

const favoriteProductIds = ["P-101", "P-318", "P-207", "P-404"];

function createDemoProducts(seedProducts: Product[]) {
  const subjects = ["Math", "Physics", "Chemistry", "Biology", "English", "Thai", "Social", "TGAT", "TPAT", "A-Level"];
  const types: ProductType[] = ["Digital Course", "Book", "Live Class", "E-book"];
  const tones = [
    "from-sky-600 to-cyan-500", "from-emerald-600 to-teal-500", "from-amber-500 to-orange-500",
    "from-violet-600 to-fuchsia-500", "from-rose-600 to-pink-500", "from-slate-700 to-slate-500",
  ];
  const generated = Array.from({ length: 44 }, (_, index) => {
    const type = types[index % types.length];
    const subject = subjects[index % subjects.length];
    const gradeNumber = 4 + (index % 9);
    const grade = `Grade ${gradeNumber}`;
    const suffix =
      type === "Book"
        ? "Workbook"
        : type === "E-book"
          ? "Concept E-book"
          : type === "Live Class"
            ? "Weekend Live Class"
            : "OnDemand Course";
    const prefix = type === "Digital Course" ? "DC" : type === "Book" ? "BK" : type === "E-book" ? "EB" : "LC";
    const price =
      type === "Book"
        ? 590 + (index % 5) * 180
        : type === "E-book"
          ? 990 + (index % 6) * 250
          : type === "Live Class"
            ? 8500 + (index % 7) * 1700
            : 5900 + (index % 8) * 1200;
    return {
      id: `P-${700 + index}`,
      name: `${subject} ${grade} ${suffix}`,
      type,
      subject,
      grade,
      sku: `${prefix}-${subject.slice(0, 3).toUpperCase()}-${String(gradeNumber).padStart(2, "0")}-${index + 1}`,
      price,
      availability: type === "Book" ? "Delivery required" : type === "Live Class" ? `${4 + (index % 12)} seats remaining` : "Instant access",
      detail: type === "Book" ? "Central delivery after purchase" : type === "Live Class" ? `Starts ${18 + (index % 10)} Jul 2026` : "SMS activation after payment",
      warning: type === "Book" ? "Book delivery" : type === "Live Class" && index % 5 === 0 ? "Low seats" : undefined,
      imageTone: tones[index % tones.length],
    } satisfies Product;
  });
  return [...seedProducts, ...generated];
}

function createDemoStudents(seedStudents: Student[], catalog: Product[]) {
  const generated = Array.from({ length: 97 }, (_, index) => {
    const name = `${thaiFirstNames[index % thaiFirstNames.length]} ${thaiLastNames[(index * 3) % thaiLastNames.length]}`;
    const grade = `Grade ${4 + (index % 9)}`;
    const studentProducts = catalog.filter((product) => product.grade === grade).slice(0, 2);
    const alerts = [
      ...(index % 11 === 0 ? ["Suspended sale exists"] : []),
      ...(index % 13 === 0 ? ["SMS failed"] : []),
      ...(index % 17 === 0 ? ["Parent requested callback"] : []),
      ...(index % 19 === 0 ? ["Outstanding balance"] : []),
      ...(index % 23 === 0 ? ["Upcoming Live Class"] : []),
      ...(index % 29 === 0 ? ["Course expires soon"] : []),
    ];
    const promotions = [
      "Student Member Discount",
      ...(Number(grade.replace("Grade ", "")) >= 10 ? ["Exam Season Booster"] : ["Foundation Course Bundle"]),
      ...(index % 3 === 0 ? ["Buy Course + Book Promotion"] : []),
      ...(index % 5 === 0 ? ["Siam Branch Family Offer"] : []),
      ...(grade === "Grade 12" ? ["A-Level Final Sprint"] : []),
    ];
    return {
      id: `STU-${String(2600000 + index * 37).padStart(7, "0")}`,
      name,
      grade,
      phone: `08${index % 10}-${String(120 + index).padStart(3, "0")}-${String(4300 + index * 23).slice(-4)}`,
      parent: index % 4 === 0 ? `${thaiFirstNames[(index + 5) % thaiFirstNames.length]} ${thaiLastNames[(index * 3) % thaiLastNames.length]}` : "Not provided",
      parentPhone: index % 4 === 0 ? `09${index % 10}-${String(220 + index).padStart(3, "0")}-${String(5100 + index * 19).slice(-4)}` : undefined,
      school: bangkokSchools[index % bangkokSchools.length],
      courses: studentProducts.map((product) => product.name),
      purchases: index % 7 === 0 ? [`RC-260705-${String(900 + index).padStart(4, "0")}`] : [],
      promotions,
      alerts,
      deliveryAddresses: [
        {
          id: `ADDR-${String(1000 + index)}`,
          label: "Default home",
          recipient: name,
          phone: `08${index % 10}-${String(120 + index).padStart(3, "0")}-${String(4300 + index * 23).slice(-4)}`,
          address: `${20 + index}/${2 + (index % 40)} ${["Rama I Road", "Phaya Thai Road", "Sukhumvit Road", "Phetchaburi Road", "Silom Road"][index % 5]}, Bangkok 10${String(300 + (index % 50)).slice(-3)}`,
          method: "Central delivery service",
          estimate: "2-4 business days",
          isDefault: true,
        },
      ],
      activity: [
        index % 6 === 0 ? "Returning student at Siam Branch" : "Active Siam Branch student",
        index % 10 === 0 ? "High-value parent purchase history" : "Profile verified",
      ],
      isNew: index % 31 === 0,
    } satisfies Student;
  });
  return [...seedStudents, ...generated];
}

function createTransactionFromSeed(index: number, student: Student, catalog: Product[], scenario: DemoScenario): Transaction {
  const matching = catalog.filter((product) => product.grade === student.grade);
  const first = matching[index % Math.max(matching.length, 1)] ?? catalog[index % catalog.length];
  const second = catalog[(index * 7) % catalog.length];
  const items = [first, ...(index % 4 === 0 ? [second] : [])].map((product) => ({
    productId: product.id,
    name: product.name,
    type: product.type,
    quantity: 1,
    price: product.price,
    discount: product.price >= 8000 || scenario === "Promotion Week" ? 500 : 0,
  }));
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity - item.discount, 0);
  const status: TransactionStatus =
    index % 23 === 0
      ? "Pending Payment"
      : index % 37 === 0
        ? "Voided"
        : index % 41 === 0
          ? "Cancelled"
          : student.isNew
            ? "SMS sent"
            : "Paid";
  const method: PaymentMethod = index % 3 === 0 ? "QR Payment" : index % 3 === 1 ? "Credit Card" : "Cash";
  const day = 6 - (index % 8);
  const hour = 10 + (index % 8);
  const minute = (index * 7) % 60;
  return {
    id: `RC-2607${String(Math.max(day, 1)).padStart(2, "0")}-${String(2000 + index).padStart(4, "0")}`,
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    student: student.isNew ? `Walk-in: ${student.name.split(" ")[0]}` : student.name,
    studentId: student.isNew ? undefined : student.id,
    grade: student.grade,
    phone: student.phone,
    staff: ["Arisa K.", "Narin P.", "Supaporn M.", "Krit S."][index % 4],
    method,
    status,
    total: Math.round(subtotal * 1.07),
    items,
    deliveryAddress: items.some((item) => item.type === "Book") && !student.isNew ? student.deliveryAddresses[0] : undefined,
    promotionNames: scenario === "Promotion Week" || index % 5 === 0 ? student.promotions.slice(0, 2) : undefined,
  };
}

function createDemoTransactions(seedTransactions: Transaction[], roster: Student[], catalog: Product[], scenario: DemoScenario) {
  const scenarioVolume: Record<DemoScenario, number> = {
    "Normal Day": 300,
    "Promotion Week": 330,
    "Exam Season": 360,
    "Open House": 285,
    "Heavy Branch Traffic": 420,
  };
  const target = scenarioVolume[scenario] - seedTransactions.length;
  const generated = Array.from({ length: Math.max(target, 0) }, (_, index) =>
    createTransactionFromSeed(index, roster[index % roster.length], catalog, scenario),
  );
  return applyDemoRefundCases([...seedTransactions, ...generated]);
}

function applyDemoRefundCases(transactions: Transaction[]) {
  const refundCases: Array<{
    receipt: string;
    status: RefundStatus;
    reason: string;
    note: string;
    requestedAt: string;
    decisionAt?: string;
    decisionBy?: string;
    decisionNote?: string;
  }> = [
    {
      receipt: "RC-260706-0188",
      status: "Refund Requested",
      reason: "Wrong course purchased",
      note: "Parent requested change after reviewing syllabus.",
      requestedAt: "6 Jul 2026, 14:42",
    },
    {
      receipt: "RC-260706-0187",
      status: "Refund Requested",
      reason: "Customer changed mind",
      note: "Student decided to wait for the next course cycle.",
      requestedAt: "6 Jul 2026, 13:35",
    },
    {
      receipt: "RC-260706-0186",
      status: "Refund Requested",
      reason: "Duplicate purchase",
      note: "Walk-in later found an existing active course on another account.",
      requestedAt: "6 Jul 2026, 12:58",
    },
    {
      receipt: "RC-260706-2001",
      status: "Refund Approved / Sent to Accounting",
      reason: "Payment issue",
      note: "Duplicate card authorization confirmed by terminal report.",
      requestedAt: "6 Jul 2026, 11:30",
      decisionAt: "6 Jul 2026, 11:46",
      decisionBy: "Demo Approver",
      decisionNote: "Refund request approved and handed over to Accounting.",
    },
    {
      receipt: "RC-260706-2002",
      status: "Refund Approved / Sent to Accounting",
      reason: "Wrong course purchased",
      note: "Grade level mismatch confirmed by branch manager.",
      requestedAt: "6 Jul 2026, 10:40",
      decisionAt: "6 Jul 2026, 11:02",
      decisionBy: "Demo Approver",
      decisionNote: "Refund request approved and handed over to Accounting.",
    },
    {
      receipt: "RC-260706-2003",
      status: "Refund Approved / Sent to Accounting",
      reason: "Course not suitable",
      note: "Counselor confirmed replacement is not available this cycle.",
      requestedAt: "6 Jul 2026, 10:15",
      decisionAt: "6 Jul 2026, 10:33",
      decisionBy: "Demo Approver",
      decisionNote: "Refund request approved and handed over to Accounting.",
    },
    {
      receipt: "RC-260706-2004",
      status: "Refund Approved / Sent to Accounting",
      reason: "Customer changed mind",
      note: "Approved as exception during promotion week.",
      requestedAt: "6 Jul 2026, 09:52",
      decisionAt: "6 Jul 2026, 10:12",
      decisionBy: "Demo Approver",
      decisionNote: "Refund request approved and handed over to Accounting.",
    },
    {
      receipt: "RC-260706-2005",
      status: "Refund Rejected",
      reason: "Customer changed mind",
      note: "Digital course already activated and viewed.",
      requestedAt: "6 Jul 2026, 09:20",
      decisionAt: "6 Jul 2026, 09:40",
      decisionBy: "Demo Approver",
      decisionNote: "Rejected because activation and first lesson usage were already confirmed.",
    },
    {
      receipt: "RC-260706-2006",
      status: "Refund Rejected",
      reason: "Duplicate purchase",
      note: "Branch verified this is a different sibling account.",
      requestedAt: "5 Jul 2026, 17:18",
      decisionAt: "5 Jul 2026, 17:35",
      decisionBy: "Demo Approver",
      decisionNote: "Rejected after student account ownership review.",
    },
    {
      receipt: "RC-260706-2007",
      status: "Refund Rejected",
      reason: "Course not suitable",
      note: "Refund window not eligible for this demo case.",
      requestedAt: "5 Jul 2026, 16:42",
      decisionAt: "5 Jul 2026, 16:58",
      decisionBy: "Demo Approver",
      decisionNote: "Rejected by manager review.",
    },
  ];

  const casesByReceipt = new Map(refundCases.map((item) => [item.receipt, item]));
  return transactions.map((transaction) => {
    const refundCase = casesByReceipt.get(transaction.id);
    if (!refundCase || (transaction.status !== "Paid" && transaction.status !== "SMS sent")) return transaction;
    const originalStatus = transaction.status as CompletedTransactionStatus;
    const activity: RefundInfo["activity"] = [
      {
        status: "Refund Requested" as RefundStatus,
        time: refundCase.requestedAt,
        staff: staffName,
        note: refundCase.note,
      },
    ];
    if (refundCase.status !== "Refund Requested" && refundCase.decisionAt) {
      activity.push({
        status: refundCase.status,
        time: refundCase.decisionAt,
        staff: refundCase.decisionBy ?? "Demo Approver",
        note: refundCase.decisionNote,
      });
    }
    return {
      ...transaction,
      status: refundCase.status === "Refund Rejected" ? originalStatus : refundCase.status,
      refund: {
        status: refundCase.status,
        originalStatus,
        reason: refundCase.reason,
        note: refundCase.note,
        requestedBy: staffName,
        managerApproval: "PIN **34",
        requestedAt: refundCase.requestedAt,
        amount: transaction.total,
        decisionBy: refundCase.decisionBy,
        decisionAt: refundCase.decisionAt,
        decisionNote: refundCase.decisionNote,
        activity,
      },
    };
  });
}

function createDemoSuspendedSales(seedSales: SuspendedSale[], roster: Student[], catalog: Product[], scenario: DemoScenario) {
  const countByScenario: Record<DemoScenario, number> = {
    "Normal Day": 9,
    "Promotion Week": 14,
    "Exam Season": 16,
    "Open House": 11,
    "Heavy Branch Traffic": 22,
  };
  const reasons = suspendReasons;
  const generated = Array.from({ length: countByScenario[scenario] }, (_, index) => {
    const student = roster[(index * 11 + 4) % roster.length];
    const product = catalog[(index * 5 + 2) % catalog.length];
    const addOn = catalog[(index * 7 + 8) % catalog.length];
    return {
      id: `SUS-260706-${String(100 + index)}`,
      date: "6 Jul 2026",
      time: `${String(10 + (index % 7)).padStart(2, "0")}:${String((index * 9) % 60).padStart(2, "0")}`,
      student,
      cart: [makeDemoCartLine(product, index), ...(index % 3 === 0 ? [makeDemoCartLine(addOn, index + 50)] : [])],
      discountApproval: index % 4 === 0 ? {
        amount: 1000,
        reason: "Bundle adjustment",
        manager: "Manager PIN verified",
        approvedAt: "13:20",
      } : null,
      staff: ["Arisa K.", "Narin P.", "Supaporn M."][index % 3],
      reason: reasons[index % reasons.length],
      note: [
        "Parent will confirm schedule by phone.",
        "Customer is checking QR payment limit.",
        "Waiting for manager confirmation.",
        "Customer will return after school.",
      ][index % 4],
      status: "Suspended" as const,
    };
  });
  return [...seedSales, ...generated];
}

function buildDemoDataset(scenario: DemoScenario) {
  return {
    transactions: createDemoTransactions(baseTransactions, students, products, scenario),
    suspendedSales: createDemoSuspendedSales(baseSuspendedSales, students, products, scenario),
  };
}

function makeDemoCartLine(product: Product, salt: number, quantity = 1): CartLine {
  return {
    lineId: `${product.id}-demo-${salt}`,
    product,
    quantity,
    discount: product.price >= 10000 ? 500 : 0,
  };
}

function makeCartLine(product: Product, quantity = 1, discount?: number): CartLine {
  return {
    lineId: `${product.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    product,
    quantity,
    discount: discount ?? (product.price >= 10000 ? 500 : 0),
  };
}

function calculateTotals(cart: CartLine[], manualDiscount = 0) {
  const subtotal = cart.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );
  const lineDiscount = cart.reduce(
    (sum, line) => sum + line.discount * line.quantity,
    0,
  );
  const discount = lineDiscount + manualDiscount;
  const taxable = Math.max(subtotal - discount, 0);
  const tax = Math.round(taxable * 0.07);
  const total = taxable + tax;
  return { subtotal, discount, lineDiscount, manualDiscount, tax, total };
}

function cartItemCount(cart: CartLine[]) {
  return cart.reduce((sum, line) => sum + line.quantity, 0);
}

function cartProductSummary(cart: CartLine[]) {
  return cart
    .map((line) => `${line.product.name}${line.quantity > 1 ? ` x${line.quantity}` : ""}`)
    .join(", ");
}

function suspendedSaleTotal(sale: SuspendedSale) {
  return calculateTotals(sale.cart, sale.discountApproval?.amount ?? 0).total;
}

function isSaleForStudent(sale: SuspendedSale, student: Student) {
  return sale.student.id === student.id || sale.student.phone === student.phone;
}

function transactionsForStudent(transactions: Transaction[], student: Student) {
  return transactions.filter((transaction) => {
    if (student.isNew) {
      return transaction.phone === student.phone;
    }
    return transaction.studentId === student.id || transaction.phone === student.phone;
  });
}

function studentFromTransaction(transaction: Transaction): Student {
  const existing = students.find(
    (student) => student.id === transaction.studentId || student.phone === transaction.phone,
  );
  if (existing) return existing;
  return {
    id: transaction.studentId ?? `NEW-${transaction.id}`,
    name: transaction.student.replace("Walk-in: ", ""),
    grade: transaction.grade ?? "Grade 12",
    phone: transaction.phone,
    parent: "Not provided",
    school: "Not provided",
    courses: [],
    purchases: [],
    promotions: ["New student: SMS activation after payment"],
    alerts: transaction.status === "SMS sent" ? ["SMS activation sent"] : [],
    deliveryAddresses: [],
    activity: [`Created from ${transaction.id}`],
    isNew: !transaction.studentId,
  };
}

function cartHasPhysicalBooks(cart: CartLine[]) {
  return cart.some((line) => line.product.type === "Book");
}

function physicalBookCount(cart: CartLine[]) {
  return cart
    .filter((line) => line.product.type === "Book")
    .reduce((sum, line) => sum + line.quantity, 0);
}

function defaultDeliveryAddress(student: Student | null) {
  if (!student || student.isNew) return null;
  return (
    student.deliveryAddresses.find((address) => address.isDefault) ??
    student.deliveryAddresses[0] ??
    null
  );
}

function eligiblePromotions(student: Student | null, cart: CartLine[]) {
  if (!student) return [];
  const hasBook = cartHasPhysicalBooks(cart);
  const hasCourse = cart.some((line) => line.product.type === "Digital Course" || line.product.type === "Live Class");
  return student.promotions.filter((promotion) => {
    if (promotion.includes("Book")) return hasBook || hasCourse;
    if (promotion.includes("SAT")) return student.grade === "Grade 12";
    return true;
  });
}

function duplicatePurchaseForStudent(
  transactions: Transaction[],
  student: Student | null,
  product: Product,
) {
  if (!student) return null;
  const transaction = transactionsForStudent(transactions, student)
    .filter((item) => item.status !== "Voided" && item.status !== "Cancelled")
    .find((item) => item.items.some((purchased) => purchased.productId === product.id));
  if (!transaction) return null;
  return {
    productName: product.name,
    purchaseDate: `6 Jul 2026, ${transaction.time}`,
    receiptId: transaction.id,
  };
}

function studentTimeline(
  student: Student,
  transactions: Transaction[],
  suspendedSales: SuspendedSale[],
) {
  const events = [
    ...transactionsForStudent(transactions, student).flatMap((transaction) => {
      const transactionEvents = transaction.items.map((item, index) => ({
        id: `${transaction.id}-${item.productId}-${index}`,
        time: `6 Jul 2026, ${transaction.time}`,
        title:
          item.type === "Book"
            ? "Book purchased"
            : item.type === "Live Class"
              ? "Upcoming Live Class"
              : "Course purchased",
        detail: `${item.name} | ${transaction.id}`,
        status:
          transaction.status.startsWith("Refund")
            ? transaction.status
            : transaction.status === "Voided"
            ? "Transaction voided"
            : transaction.status === "Pending Payment"
              ? "Pending Payment"
              : item.type === "Book"
                ? "Delivered"
                : item.type === "Live Class"
                  ? "Upcoming Live Class"
                  : transaction.status === "SMS sent"
                    ? "SMS Sent"
                  : "Active",
      }));
      const refundEvents = transaction.refund?.activity.map((event) => ({
        id: `${transaction.id}-${event.status}`,
        time: event.time,
        title:
          event.status === "Refund Requested"
            ? "Refund requested"
            : event.status === "Refund Approved / Sent to Accounting"
              ? "Refund approved and sent to Accounting"
              : "Refund rejected",
        detail: `${transaction.id} | ${money(transaction.refund?.amount ?? transaction.total)} | ${transaction.refund?.reason ?? "Refund"}`,
        status: event.status,
      })) ?? [];
      return [
        {
          id: `${transaction.id}-payment`,
          time: `6 Jul 2026, ${transaction.time}`,
          title:
            transaction.status === "Pending Payment"
              ? "QR payment pending"
              : transaction.status === "Cancelled"
                ? "Payment cancelled"
                : transaction.status === "Voided"
                  ? "Transaction voided"
                  : "Payment completed",
          detail: `${money(transaction.total)} | ${transaction.method}`,
          status: transaction.status,
        },
        ...refundEvents,
        ...(transaction.status === "SMS sent"
          ? [
              {
                id: `${transaction.id}-sms`,
                time: `6 Jul 2026, ${transaction.time}`,
                title: "SMS activation sent",
                detail: maskPhone(transaction.phone),
                status: "SMS Sent",
              },
            ]
          : []),
        ...transactionEvents,
      ];
    }),
    ...suspendedSales
      .filter((sale) => isSaleForStudent(sale, student))
      .map((sale) => ({
        id: sale.id,
        time: `${sale.date}, ${sale.time}`,
        title: "Suspended Sale created",
        detail: `${cartProductSummary(sale.cart)} | ${sale.reason}`,
        status: sale.status,
      })),
    ...student.alerts
      .filter((alert) => alert === "SMS failed")
      .map((alert) => ({
        id: `${student.id}-${alert}`,
        time: "6 Jul 2026, 11:42",
        title: "SMS failed",
        detail: "Activation SMS needs resend confirmation.",
        status: "SMS failed",
      })),
  ];

  return events.sort((a, b) => (a.time < b.time ? 1 : -1));
}

function cartToTransactionItems(cart: CartLine[]): TransactionItem[] {
  return cart.map((line) => ({
    productId: line.product.id,
    name: line.product.name,
    type: line.product.type,
    quantity: line.quantity,
    price: line.product.price,
    discount: line.discount,
  }));
}

function productFromItem(item: TransactionItem) {
  return products.find((product) => product.id === item.productId);
}

function recentSoldProducts(transactions: Transaction[]) {
  const seen = new Set<string>();
  return transactions
    .filter((transaction) => transaction.status !== "Voided" && transaction.status !== "Cancelled")
    .flatMap((transaction) => transaction.items)
    .map(productFromItem)
    .filter((product): product is Product => Boolean(product))
    .filter((product) => {
      if (seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    })
    .slice(0, 4);
}

const baseSuspendedSales: SuspendedSale[] = [
  {
    id: "SUS-260706-004",
    date: "6 Jul 2026",
    time: "14:21",
    student: students[0],
    cart: [
      makeCartLine(products[1], 1, 500),
      makeCartLine(products[5], 1, 0),
    ],
    discountApproval: {
      amount: 1000,
      reason: "Bundle adjustment",
      manager: "Manager PIN verified",
      approvedAt: "14:18",
    },
    staff: "Arisa K.",
    reason: "Waiting for parent confirmation",
    note: "Parent asked to confirm live class schedule before paying.",
    status: "Suspended",
  },
  {
    id: "SUS-260706-003",
    date: "6 Jul 2026",
    time: "13:48",
    student: students[2],
    cart: [makeCartLine(products[3], 1, 0)],
    discountApproval: null,
    staff: "Narin P.",
    reason: "Waiting for payment",
    note: "Customer will return after bank transfer issue is resolved.",
    status: "Suspended",
  },
  {
    id: "SUS-260706-002",
    date: "6 Jul 2026",
    time: "12:55",
    student: {
      id: "NEW-260706-006",
      name: "Thanawat K.",
      grade: "Grade 12",
      phone: "082-991-3344",
      parent: "Not provided",
      school: "Not provided",
      courses: [],
      purchases: [],
      promotions: ["New student: SMS activation after payment"],
      alerts: [],
      deliveryAddresses: [],
      activity: ["Created at Siam Branch"],
      isNew: true,
    },
    cart: [makeCartLine(products[0], 1, 0)],
    discountApproval: null,
    staff: "Arisa K.",
    reason: "Customer forgot wallet",
    note: "Will come back after lunch.",
    status: "Suspended",
  },
];

const initialSuspendedSales = createDemoSuspendedSales(baseSuspendedSales, students, products, "Normal Day");

function money(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
}

function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 ? `${digits.slice(0, 3)}-xxx-${digits.slice(-4)}` : phone;
}

function transactionStatusTone(status: TransactionStatus): BadgeTone {
  if (status === "Voided" || status === "Cancelled") return "red";
  if (status === "Refund Approved / Sent to Accounting") return "green";
  if (status.startsWith("Refund")) return "amber";
  if (status === "Pending Payment") return "amber";
  if (status === "SMS sent") return "sky";
  return "green";
}

function transactionDisplayStatus(transaction: Transaction): TransactionStatus | RefundStatus {
  return transaction.refund?.status ?? transaction.status;
}

function isRefundEligible(transaction: Transaction) {
  return (transaction.status === "Paid" || transaction.status === "SMS sent") && !transaction.refund;
}

function refundStatusTone(status: RefundStatus): BadgeTone {
  if (status === "Refund Approved / Sent to Accounting") return "green";
  if (status === "Refund Rejected") return "red";
  return "amber";
}

function isCompletedTransaction(transaction: Transaction) {
  return transaction.status === "Paid" || transaction.status === "SMS sent";
}

function dashboardMetrics(transactions: Transaction[], suspendedSales: SuspendedSale[]) {
  const completed = transactions.filter(isCompletedTransaction);
  const refundRequested = transactions.filter((transaction) => transaction.status === "Refund Requested");
  const refundApproved = transactions.filter((transaction) => transaction.refund?.status === "Refund Approved / Sent to Accounting");
  const refundRejected = transactions.filter((transaction) => transaction.refund?.status === "Refund Rejected");
  const revenue = completed.reduce((sum, transaction) => sum + transaction.total, 0);
  const topProductCounts = new Map<string, { name: string; count: number }>();
  const productMixCounts = new Map<ProductType, number>([
    ["Digital Course", 0],
    ["Book", 0],
    ["E-book", 0],
    ["Live Class", 0],
  ]);

  completed.forEach((transaction) => {
    transaction.items.forEach((item) => {
      const current = topProductCounts.get(item.productId) ?? { name: item.name, count: 0 };
      topProductCounts.set(item.productId, {
        name: item.name,
        count: current.count + item.quantity,
      });
      productMixCounts.set(item.type, (productMixCounts.get(item.type) ?? 0) + item.quantity);
    });
  });

  const events: Array<{ id: string; time: string; title: string; detail: string; tone: BadgeTone }> = [
    ...transactions.slice(0, 80).flatMap((transaction) => {
      const transactionEvents: Array<{ id: string; time: string; title: string; detail: string; tone: BadgeTone }> = [];
      if (isCompletedTransaction(transaction)) {
        transactionEvents.push({
          id: `${transaction.id}-completed`,
          time: transaction.time,
          title: transaction.status === "SMS sent" ? "SMS sent" : "Payment completed",
          detail: `${transaction.student} | ${money(transaction.total)}`,
          tone: transaction.status === "SMS sent" ? "sky" : "green",
        });
      }
      if (transaction.status === "Voided") {
        transactionEvents.push({
          id: `${transaction.id}-voided`,
          time: transaction.time,
          title: "Transaction voided",
          detail: `${transaction.id} | ${transaction.student}`,
          tone: "red",
        });
      }
      transaction.refund?.activity.forEach((event) => {
        transactionEvents.push({
          id: `${transaction.id}-${event.status}`,
          time: event.time.split(", ").pop() ?? event.time,
          title:
            event.status === "Refund Requested"
              ? "Refund requested"
              : event.status === "Refund Approved / Sent to Accounting"
                ? "Refund approved and sent to Accounting"
                : "Refund rejected",
          detail: `${transaction.id} | ${money(transaction.refund?.amount ?? transaction.total)}`,
          tone: refundStatusTone(event.status),
        });
      });
      return transactionEvents;
    }),
    ...suspendedSales.slice(0, 20).map((sale) => ({
      id: `${sale.id}-suspended`,
      time: sale.time,
      title: "Sale suspended",
      detail: `${sale.student.name} | ${cartItemCount(sale.cart)} items`,
      tone: "amber" as BadgeTone,
    })),
    ...students
      .filter((student) => student.alerts.includes("SMS failed"))
      .slice(0, 8)
      .map((student, index) => ({
        id: `${student.id}-sms-failed`,
        time: `11:${String(40 + index).padStart(2, "0")}`,
        title: "SMS failed",
        detail: `${student.name} | ${maskPhone(student.phone)}`,
        tone: "red" as BadgeTone,
      })),
  ].sort((a, b) => (a.time < b.time ? 1 : -1)).slice(0, 10);

  return {
    revenue,
    completedCount: completed.length,
    averageOrderValue: completed.length ? Math.round(revenue / completed.length) : 0,
    statuses: {
      completed: completed.length,
      pending: transactions.filter((transaction) => transaction.status === "Pending Payment").length,
      suspended: suspendedSales.length,
      voided: transactions.filter((transaction) => transaction.status === "Voided").length,
      refundRequested: refundRequested.length,
      refundApproved: refundApproved.length,
      refundRejected: refundRejected.length,
    },
    pendingActions: {
      pendingPayments: transactions.filter((transaction) => transaction.status === "Pending Payment"),
      suspendedSales,
      refundRequests: refundRequested,
      smsFailed: students.filter((student) => student.alerts.includes("SMS failed")),
    },
    topProducts: Array.from(topProductCounts.values()).sort((a, b) => b.count - a.count).slice(0, 5),
    productMix: Array.from(productMixCounts.entries()).map(([type, count]) => ({ type, count })),
    recentActivity: events,
    refundSummary: {
      requestedCount: refundRequested.length,
      approvedCount: refundApproved.length,
      rejectedCount: refundRejected.length,
      latestRequest: refundRequested[0] ?? transactions.find((transaction) => transaction.refund),
    },
  };
}

function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
}) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    sky: "bg-sky-50 text-sky-800",
    green: "bg-emerald-50 text-emerald-800",
    amber: "bg-amber-50 text-amber-800",
    red: "bg-red-50 text-red-800",
    violet: "bg-violet-50 text-violet-800",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function IconButton({
  label,
  icon,
  onClick,
  disabled,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 hover:border-[#028FC1] disabled:cursor-not-allowed disabled:opacity-40"
      disabled={disabled}
      onClick={onClick}
      title={label}
    >
      {icon}
    </button>
  );
}

function PrimaryButton({
  children,
  icon,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#028FC1] px-4 text-sm font-semibold text-white hover:bg-[#027da9] disabled:cursor-not-allowed disabled:bg-slate-300 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  icon,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:border-[#028FC1] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <input
        className={`mt-1 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100 ${
          error ? "border-red-300 bg-red-50" : "border-slate-300 bg-white"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <span className="mt-1 block text-xs font-medium text-red-700">{error}</span>}
    </label>
  );
}

function ProductImage({ product }: { product: Product }) {
  return (
    <div
      className={`flex h-28 w-28 shrink-0 flex-col justify-between rounded-md bg-gradient-to-br ${product.imageTone} p-3 text-white`}
    >
      <span className="text-xs font-semibold uppercase opacity-80">{product.type}</span>
      <span className="text-2xl font-semibold">{product.subject.slice(0, 2).toUpperCase()}</span>
      <span className="text-xs font-medium opacity-90">{product.grade}</span>
    </div>
  );
}

function GlobalSearch({
  transactions,
  suspendedSales,
  onStudentSelect,
  onProductSelect,
  onSuspendedSaleSelect,
  onTransactionSelect,
}: {
  transactions: Transaction[];
  suspendedSales: SuspendedSale[];
  onStudentSelect: (student: Student) => void;
  onProductSelect: (product: Product) => void;
  onSuspendedSaleSelect: (sale: SuspendedSale) => void;
  onTransactionSelect: (transaction: Transaction) => void;
}) {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const normalized = query.trim().toLowerCase();
  const studentResults = normalized
    ? students
        .filter((student) =>
          `${student.name} ${student.id} ${student.phone} ${student.parent} ${student.parentPhone ?? ""}`.toLowerCase().includes(normalized),
        )
        .slice(0, 3)
    : [];
  const productResults = normalized
    ? products
        .filter((product) =>
          `${product.name} ${product.type} ${product.subject} ${product.sku}`.toLowerCase().includes(normalized),
        )
        .slice(0, 3)
    : [];
  const transactionResults = normalized
    ? transactions
        .filter((transaction) =>
          `${transaction.id} ${transaction.student} ${transaction.phone}`.toLowerCase().includes(normalized),
        )
        .slice(0, 3)
    : [];
  const suspendedResults = normalized
    ? suspendedSales
        .filter((sale) =>
          `${sale.id} ${sale.student.name} ${sale.student.id} ${sale.student.phone} ${sale.reason} ${sale.note} ${cartProductSummary(sale.cart)}`.toLowerCase().includes(normalized),
        )
        .slice(0, 3)
    : [];
  const hasResults =
    studentResults.length + productResults.length + transactionResults.length + suspendedResults.length > 0;

  function clear() {
    setQuery("");
  }

  function chooseFirstResult() {
    const firstStudent = studentResults[0];
    const firstProduct = productResults[0];
    const firstTransaction = transactionResults[0];
    const firstSuspended = suspendedResults[0];
    if (firstStudent) {
      onStudentSelect(firstStudent);
    } else if (firstProduct) {
      onProductSelect(firstProduct);
    } else if (firstTransaction) {
      onTransactionSelect(firstTransaction);
    } else if (firstSuspended) {
      onSuspendedSaleSelect(firstSuspended);
    } else {
      return;
    }
    clear();
  }

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <div className="relative hidden min-w-0 max-w-xl flex-1 px-8 lg:block">
      <label className="relative block">
        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        <input
          ref={searchInputRef}
          className="h-10 w-full rounded-md border border-slate-300 bg-slate-50 pl-9 pr-20 text-sm outline-none focus:border-[#028FC1] focus:bg-white focus:ring-2 focus:ring-sky-100"
          placeholder="Search student, product, or receipt"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              chooseFirstResult();
            }
            if (event.key === "Escape") {
              setQuery("");
              searchInputRef.current?.blur();
            }
          }}
        />
        <span className="absolute right-2 top-2 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold text-slate-500">
          Cmd K
        </span>
      </label>
      {normalized && (
        <div className="absolute left-8 right-8 top-12 z-30 max-h-[420px] overflow-auto rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
          {normalized && (
            <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500">
              <Loader2 size={13} className="animate-spin" />
              Searching student, parent phone, product, receipt, and suspended sale...
            </div>
          )}
          {!hasResults && (
            <div className="p-3 text-sm text-slate-500">No matching command or record.</div>
          )}
          {studentResults.length > 0 && (
            <SearchGroup title="Students">
              {studentResults.map((student) => (
                <button
                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-sky-50"
                  key={student.id}
                  onClick={() => {
                    onStudentSelect(student);
                    clear();
                  }}
                >
                  <span className="block font-semibold">{student.name}</span>
                  <span className="text-xs text-slate-500">{student.id} | {student.phone}</span>
                </button>
              ))}
            </SearchGroup>
          )}
          {productResults.length > 0 && (
            <SearchGroup title="Products">
              {productResults.map((product) => (
                <button
                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-sky-50"
                  key={product.id}
                  onClick={() => {
                    onProductSelect(product);
                    clear();
                  }}
                >
                  <span className="block font-semibold">{product.name}</span>
                  <span className="text-xs text-slate-500">{product.type} | {product.sku}</span>
                </button>
              ))}
            </SearchGroup>
          )}
          {transactionResults.length > 0 && (
            <SearchGroup title="Receipts">
              {transactionResults.map((transaction) => (
                <button
                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-sky-50"
                  key={transaction.id}
                  onClick={() => {
                    onTransactionSelect(transaction);
                    clear();
                  }}
                >
                  <span className="block font-mono font-semibold">{transaction.id}</span>
                  <span className="text-xs text-slate-500">{transaction.student} | {money(transaction.total)}</span>
                </button>
              ))}
            </SearchGroup>
          )}
          {suspendedResults.length > 0 && (
            <SearchGroup title="Suspended Sales">
              {suspendedResults.map((sale) => (
                <button
                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-sky-50"
                  key={sale.id}
                  onClick={() => {
                    onSuspendedSaleSelect(sale);
                    clear();
                  }}
                >
                  <span className="block font-semibold">{sale.student.name}</span>
                  <span className="text-xs text-slate-500">{sale.reason} | {money(suspendedSaleTotal(sale))}</span>
                </button>
              ))}
            </SearchGroup>
          )}
        </div>
      )}
    </div>
  );
}

function SearchGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-1">
      <p className="px-3 py-1 text-xs font-semibold uppercase text-slate-500">{title}</p>
      {children}
    </div>
  );
}

function StudentBanner({ student }: { student: Student }) {
  return (
    <div className="border-b border-slate-200 bg-white/95 backdrop-blur md:sticky md:top-[65px] md:z-10">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-base font-semibold">{student.name}</h2>
            <Badge tone={student.isNew ? "violet" : "sky"}>
              {student.isNew ? "New Student" : "Existing Student"}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            {student.isNew ? "Draft profile" : student.id} | {student.grade} | {student.phone}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {student.alerts.slice(0, 2).map((alert) => (
            <Badge key={alert} tone="amber">{alert}</Badge>
          ))}
          <Badge tone="green">{student.promotions.length} eligible promos</Badge>
          <Badge>{student.courses.length} active courses</Badge>
        </div>
      </div>
    </div>
  );
}

function SystemStatus({ branch }: { branch: string }) {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 sm:px-6 md:fixed md:bottom-0 md:left-0 md:right-0 md:z-20">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4">
          <StatusItem icon={<Wifi size={14} />} label="Branch online" />
          <StatusItem icon={<Signal size={14} />} label="Payment gateway online" />
          <StatusItem icon={<Smartphone size={14} />} label="SMS service online" />
        </div>
        <span>{branch} | Shift: Afternoon | Staff: {staffName}</span>
      </div>
    </footer>
  );
}

function StatusItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-emerald-600">{icon}</span>
      {label}
    </span>
  );
}

function Header({
  activeStudent,
  branch,
  cartCount,
  suspendedCount,
  pendingCount,
  transactions,
  suspendedSales,
  onHome,
  onBranchChange,
  onDashboard,
  onPendingPayments,
  onDemoTools,
  onSuspendedSales,
  onSuspendedSaleSelect,
  onTransactions,
  onStudentSelect,
  onProductSelect,
  onTransactionSelect,
}: {
  activeStudent: Student | null;
  branch: string;
  cartCount: number;
  suspendedCount: number;
  pendingCount: number;
  transactions: Transaction[];
  suspendedSales: SuspendedSale[];
  onHome: () => void;
  onBranchChange: (branch: string) => void;
  onDashboard: () => void;
  onPendingPayments: () => void;
  onDemoTools: () => void;
  onSuspendedSales: () => void;
  onSuspendedSaleSelect: (sale: SuspendedSale) => void;
  onTransactions: () => void;
  onStudentSelect: (student: Student) => void;
  onProductSelect: (product: Product) => void;
  onTransactionSelect: (transaction: Transaction) => void;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md bg-[#028FC1] text-white"
            onClick={onHome}
            title="Home"
          >
            <Home size={20} />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase text-[#028FC1]">OnDemand Education POS</p>
            <label className="sr-only" htmlFor="branch-select">Current branch</label>
            <select
              id="branch-select"
              className="mt-0.5 max-w-[220px] rounded-md border border-transparent bg-white text-lg font-semibold tracking-tight outline-none hover:border-slate-200 focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100 sm:max-w-none sm:text-xl"
              value={branch}
              onChange={(event) => onBranchChange(event.target.value)}
            >
              {branchOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <GlobalSearch
          suspendedSales={suspendedSales}
          transactions={transactions}
          onProductSelect={onProductSelect}
          onStudentSelect={onStudentSelect}
          onSuspendedSaleSelect={onSuspendedSaleSelect}
          onTransactionSelect={onTransactionSelect}
        />

        <div className="flex w-full flex-wrap items-center gap-2 text-sm text-slate-600 sm:w-auto sm:gap-3 sm:justify-end">
          {activeStudent && (
            <span className="hidden max-w-[180px] truncate font-semibold text-slate-900 xl:inline">
              {activeStudent.name}
            </span>
          )}
          <button
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 font-semibold text-amber-900"
            onClick={onSuspendedSales}
          >
            <PauseCircle size={16} />
            Suspended
            <span className="rounded-full bg-amber-200 px-1.5 py-0.5 text-xs">
              {suspendedCount}
            </span>
          </button>
          <button
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-sky-300 bg-sky-50 px-3 font-semibold text-sky-900"
            onClick={onPendingPayments}
          >
            <QrCode size={16} />
            Pending
            <span className="rounded-full bg-sky-200 px-1.5 py-0.5 text-xs">
              {pendingCount}
            </span>
          </button>
          <button
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 font-semibold text-slate-800"
            onClick={onDashboard}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>
          <button
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 font-semibold text-slate-800"
            onClick={onTransactions}
          >
            <History size={16} />
            Transactions
          </button>
          <IconButton icon={<Settings size={15} />} label="Demo Tools" onClick={onDemoTools} />
          <span className="hidden md:inline">Staff: {staffName}</span>
          <span className="hidden h-5 w-px bg-slate-200 md:inline" />
          <span className="hidden md:inline">{currentTime}</span>
          <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-slate-100 px-2 font-semibold text-slate-900">
            {cartCount}
          </span>
        </div>
      </div>
    </header>
  );
}

function CartPanel({
  activeStudent,
  cart,
  discountApproval,
  duplicateWarning,
  recommendations,
  promotions,
  onAdd,
  onRemove,
  onQty,
  onPayment,
  onSuspend,
  onRequestDiscount,
  onClearDiscount,
}: {
  activeStudent: Student | null;
  cart: CartLine[];
  discountApproval: DiscountApproval | null;
  duplicateWarning: { productName: string; purchaseDate: string; receiptId: string } | null;
  recommendations: Product[];
  promotions: string[];
  onAdd: (product: Product) => void;
  onRemove: (lineId: string) => void;
  onQty: (lineId: string, direction: 1 | -1) => void;
  onPayment: () => void;
  onSuspend: () => void;
  onRequestDiscount: () => void;
  onClearDiscount: () => void;
}) {
  const totals = calculateTotals(cart, discountApproval?.amount ?? 0);

  return (
    <aside className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white xl:sticky xl:top-[118px] xl:h-[calc(100vh-142px)] xl:min-h-[520px]">
      <div className="shrink-0 border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Current sale</h2>
          <Badge>{cart.length} lines</Badge>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Assigned to {activeStudent?.name ?? "selected student"} by default.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4">
        {cartHasPhysicalBooks(cart) && (
          <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            <div className="flex items-start gap-2">
              <Truck size={17} className="mt-0.5 shrink-0" />
              <span>
                <span className="block font-semibold">Book Delivery Required</span>
                {physicalBookCount(cart)} physical item requires delivery. {activeStudent?.isNew ? "Address will be collected during SMS activation." : "Delivery information will be collected before payment."}
              </span>
            </div>
          </div>
        )}
        {duplicateWarning && (
          <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            <div className="flex items-start gap-2">
              <AlertTriangle size={17} className="mt-0.5 shrink-0" />
              <span>
                <span className="block font-semibold">Duplicate Purchase Warning</span>
                This student already purchased {duplicateWarning.productName} on {duplicateWarning.purchaseDate}.
              </span>
            </div>
          </div>
        )}

        <div className="mt-3">
          {cart.length === 0 ? (
            <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 py-10 text-center text-sm text-slate-500">
              Add a product to start the sale.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {cart.map((line) => (
                <div className="border-b border-slate-100 py-4 last:border-0" key={line.lineId}>
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{line.product.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {line.product.type} | {activeStudent?.id ?? "No student"}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">{money(line.product.price * line.quantity)}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconButton
                        disabled={line.quantity === 1}
                        icon={<Minus size={15} />}
                        label="Decrease quantity"
                        onClick={() => onQty(line.lineId, -1)}
                      />
                      <span className="w-7 text-center text-sm font-semibold">{line.quantity}</span>
                      <IconButton
                        icon={<Plus size={15} />}
                        label="Increase quantity"
                        onClick={() => onQty(line.lineId, 1)}
                      />
                    </div>
                    <IconButton
                      icon={<Trash2 size={15} />}
                      label="Remove item"
                      onClick={() => onRemove(line.lineId)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-[#028FC1]" />
            <h3 className="text-sm font-semibold">Recommended add-ons</h3>
          </div>
          {recommendations.length > 0 ? (
            <div className="mt-3 space-y-2">
              {recommendations.slice(0, 2).map((product) => (
                <button
                  className="flex w-full items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-2 text-left text-sm hover:border-[#028FC1]"
                  key={product.id}
                  onClick={() => onAdd(product)}
                >
                  <span>
                    <span className="block font-semibold">{product.name}</span>
                    <span className="text-xs text-slate-500">{product.detail}</span>
                  </span>
                  <Plus size={15} className="shrink-0 text-[#028FC1]" />
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
              Add a course or book to see relevant add-ons.
            </p>
          )}
        </div>

        <div className="mt-4 border-t border-slate-200 pb-4 pt-4">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-[#028FC1]" />
            <h3 className="text-sm font-semibold">Eligible Promotions</h3>
          </div>
          {promotions.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {promotions.map((promotion) => (
                <Badge key={promotion} tone="sky">{promotion}</Badge>
              ))}
            </div>
          ) : (
            <p className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
              No eligible promotions for this cart yet.
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-slate-200 bg-white p-4 text-sm shadow-[0_-10px_24px_rgba(15,23,42,0.06)]">
        <div className="flex justify-between py-1">
          <span>Subtotal</span>
          <span>{money(totals.subtotal)}</span>
        </div>
        <div className="flex justify-between py-1 text-emerald-700">
          <span>Discount</span>
          <span>-{money(totals.discount)}</span>
        </div>
        {discountApproval && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
            <div className="flex items-center justify-between gap-2">
              <span>
                Manager approved {money(discountApproval.amount)} | {discountApproval.reason}
              </span>
              <button className="font-semibold text-emerald-800" onClick={onClearDiscount}>
                Clear
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-between py-1">
          <span>Tax</span>
          <span>{money(totals.tax)}</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-lg font-semibold">
          <span>Grand total</span>
          <span>{money(totals.total)}</span>
        </div>
        <PrimaryButton
          className="mt-4 w-full"
          disabled={!activeStudent || cart.length === 0}
          icon={<CreditCard size={17} />}
          onClick={onPayment}
        >
          Review Order
        </PrimaryButton>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <SecondaryButton
            className="w-full"
            disabled={!activeStudent || cart.length === 0}
            icon={<PauseCircle size={16} />}
            onClick={onSuspend}
          >
            Suspend
          </SecondaryButton>
          <SecondaryButton className="w-full" icon={<Tag size={16} />} onClick={onRequestDiscount}>
            Discount
          </SecondaryButton>
        </div>
      </div>
    </aside>
  );
}

function HomeScreen({
  branch,
  transactions,
  suspendedSales,
  pendingPayments,
  saleNotice,
  onExisting,
  onDashboard,
  onNew,
  onPendingPayments,
  onSuspendedSales,
  onTransactions,
  onResumeSale,
}: {
  branch: string;
  transactions: Transaction[];
  suspendedSales: SuspendedSale[];
  pendingPayments: Transaction[];
  saleNotice: string;
  onExisting: () => void;
  onDashboard: () => void;
  onNew: () => void;
  onPendingPayments: () => void;
  onSuspendedSales: () => void;
  onTransactions: () => void;
  onResumeSale: (sale: SuspendedSale) => void;
}) {
  return (
    <div className="mx-auto grid max-w-[1180px] gap-5 px-4 py-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-5">
        {saleNotice && (
          <div className="rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm font-medium text-sky-900">
            {saleNotice}
          </div>
        )}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-[#028FC1]">{branch} | {staffName}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Start a sale</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Choose the customer type to begin the transaction.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            className="rounded-lg border-2 border-[#028FC1] bg-white p-6 text-left hover:bg-sky-50"
            onClick={onExisting}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#028FC1] text-white">
              <User size={24} />
            </div>
            <h3 className="mt-5 text-2xl font-semibold">Existing Student</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Search by Student ID, student name, or phone number. Parent purchases use the child Student ID.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#028FC1]">
              Search student <ChevronRight size={16} />
            </span>
          </button>

          <button
            className="rounded-lg border border-slate-200 bg-white p-6 text-left hover:border-[#028FC1]"
            onClick={onNew}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-900 text-white">
              <UserPlus size={24} />
            </div>
            <h3 className="mt-5 text-2xl font-semibold">New Student / Walk-in</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Capture phone number before checkout so the activation code can be sent after payment.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              Create sale profile <ChevronRight size={16} />
            </span>
          </button>
        </div>
        <button
          className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left hover:border-[#028FC1]"
          onClick={onDashboard}
        >
          <span>
            <span className="block font-semibold">Siam Branch Dashboard</span>
            <span className="mt-1 block text-sm text-slate-500">
              View today&apos;s sales, queues, product mix, and refund experiment status.
            </span>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-sky-50 text-[#028FC1]">
            <LayoutDashboard size={20} />
          </span>
        </button>
      </section>

      <section className="space-y-4">
        <div className="rounded-lg border border-amber-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Suspended Sales</h2>
                <p className="mt-1 text-sm text-slate-500">Operational queue for unfinished sales.</p>
              </div>
              <Badge tone="amber">{suspendedSales.length} suspended</Badge>
            </div>
            <SecondaryButton
              className="mt-4 w-full"
              icon={<PauseCircle size={16} />}
              onClick={onSuspendedSales}
            >
              Open Suspended Sales
            </SecondaryButton>
            {suspendedSales.length > 0 ? (
            <div className="mt-4 space-y-2">
              {suspendedSales.slice(0, 2).map((sale) => (
                <div
                  className="rounded-md border border-amber-200 bg-amber-50 p-3"
                  key={sale.id}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{sale.student.name}</span>
                    <span className="text-xs text-amber-800">{sale.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {cartItemCount(sale.cart)} items | {money(suspendedSaleTotal(sale))}
                  </p>
                  <div className="mt-2 flex justify-end">
                    <button
                      className="text-sm font-semibold text-[#028FC1]"
                      onClick={() => onResumeSale(sale)}
                    >
                      Resume Sale
                    </button>
                  </div>
                </div>
              ))}
            </div>
            ) : (
              <p className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
                No suspended sales right now.
              </p>
            )}
          </div>

        <div className="rounded-lg border border-sky-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Pending Payments</h2>
              <p className="mt-1 text-sm text-slate-500">QR payments waiting for customer confirmation.</p>
            </div>
            <Badge tone="sky">{pendingPayments.length} pending</Badge>
          </div>
          <SecondaryButton
            className="mt-4 w-full"
            icon={<QrCode size={16} />}
            onClick={onPendingPayments}
          >
            Open Pending Payments
          </SecondaryButton>
          {pendingPayments.length === 0 && (
            <p className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
              No pending QR payments right now.
            </p>
          )}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Transactions</h2>
            <SecondaryButton icon={<History size={16} />} onClick={onTransactions}>
              Open Transactions
            </SecondaryButton>
          </div>
          <div className="mt-4 space-y-2">
            {transactions.slice(0, 4).map((transaction) => (
              <button
                className="w-full rounded-md border border-slate-200 p-3 text-left hover:border-[#028FC1]"
                key={transaction.id}
                onClick={onTransactions}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-mono text-sm font-semibold">{transaction.id}</span>
                  <Badge tone={transactionStatusTone(transaction.status)}>{transaction.status}</Badge>
                </span>
                <span className="mt-2 flex justify-between text-sm text-slate-600">
                  <span>{transaction.student}</span>
                  <span className="font-semibold text-slate-900">{money(transaction.total)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StudentSearchScreen({
  onSelect,
  onBack,
}: {
  onSelect: (student: Student) => void;
  onBack: () => void;
}) {
  const [query, setQuery] = useState("");
  const results = students.filter((student) => {
    const normalized = `${student.id} ${student.name} ${student.phone}`.toLowerCase();
    return normalized.includes(query.toLowerCase());
  });
  const isSearching = query.trim().length > 0;

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back</SecondaryButton>}
        eyebrow="Existing student"
        title="Find student account"
      />
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <label className="relative block">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input
            autoFocus
            className="h-12 w-full rounded-md border border-slate-300 pl-10 pr-3 text-base outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
            placeholder="Search Student ID, student name, or phone number"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && results[0]) {
                event.preventDefault();
                onSelect(results[0]);
              }
              if (event.key === "Escape") {
                setQuery("");
              }
            }}
          />
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {["STU-2401829", "Pimchanok", "0812348891"].map((sample) => (
            <button
              className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold hover:border-[#028FC1]"
              key={sample}
              onClick={() => setQuery(sample)}
            >
              {sample}
            </button>
          ))}
        </div>
        {isSearching && (
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <Loader2 size={15} className="animate-spin" />
            Searching student...
          </div>
        )}
      </div>

      <div className="mt-5 grid gap-3">
        {results.map((student) => (
          <button
            className="rounded-lg border border-slate-200 bg-white p-4 text-left hover:border-[#028FC1]"
            key={student.id}
            onClick={() => onSelect(student)}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{student.name}</h3>
                  <Badge tone="sky">{student.grade}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {student.id} | {student.phone} | Parent: {student.parent}
                </p>
                <p className="mt-1 text-sm text-slate-500">{student.school}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#028FC1]">
                Open profile <ChevronRight size={16} />
              </span>
            </div>
          </button>
        ))}
        {results.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            No student found. Check Student ID, phone number, or create a New Student / Walk-in sale.
          </div>
        )}
      </div>
    </div>
  );
}

function StudentProfileScreen({
  student,
  suspendedSales,
  transactions,
  onCatalog,
  onBack,
  onResumeSale,
}: {
  student: Student;
  suspendedSales: SuspendedSale[];
  transactions: Transaction[];
  onCatalog: () => void;
  onBack: () => void;
  onResumeSale: (sale: SuspendedSale) => void;
}) {
  const suspendedSale = suspendedSales.find((sale) => isSaleForStudent(sale, student));
  const studentTransactions = transactionsForStudent(transactions, student);
  const timeline = studentTimeline(student, transactions, suspendedSales);
  const purchasedItems = studentTransactions
    .filter((transaction) => transaction.status !== "Voided" && transaction.status !== "Cancelled" && transaction.status !== "Pending Payment")
    .flatMap((transaction) =>
      transaction.items.map((item) => ({
        ...item,
        purchaseDate: `6 Jul 2026, ${transaction.time}`,
        receiptId: transaction.id,
        status:
          transaction.status.startsWith("Refund")
              ? transaction.status
              : item.type === "Live Class"
            ? "Upcoming Live Class"
            : item.type === "Book"
              ? "Delivered"
              : student.isNew
                ? "SMS Sent"
                : item.type === "E-book"
                  ? "Activated"
                  : "Active",
      })),
    );

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6">
      <ScreenTitle
        action={
          <div className="flex gap-2">
            <SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back</SecondaryButton>
            <PrimaryButton icon={<ShoppingCart size={17} />} onClick={onCatalog}>Go to Catalog</PrimaryButton>
          </div>
        }
        eyebrow="Student profile"
        title={student.name}
      />
      <StudentAlerts alerts={student.alerts} />
      {suspendedSale && (
        <section className="mb-5 rounded-lg border border-amber-300 bg-amber-50 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-amber-700" size={20} />
                <h3 className="text-lg font-semibold text-amber-950">Suspended Sale Found</h3>
              </div>
              <p className="mt-2 text-sm text-amber-900">
                {cartProductSummary(suspendedSale.cart)}
              </p>
              <p className="mt-1 text-sm text-amber-900">
                {money(suspendedSaleTotal(suspendedSale))} | {suspendedSale.date}, {suspendedSale.time} | {suspendedSale.staff}
              </p>
            </div>
            <PrimaryButton icon={<RotateCcw size={17} />} onClick={() => onResumeSale(suspendedSale)}>
              Resume Sale
            </PrimaryButton>
          </div>
        </section>
      )}
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Info label="Student ID" value={student.isNew ? "New profile" : student.id} />
              <Info label="Grade" value={student.grade} />
              <Info label="Phone Number" value={student.phone} />
              <Info label="School" value={student.school} />
              <Info label="Parent Name" value={student.parent} />
              <Info label="Current Courses" value={student.courses.join(", ") || "No active courses before this sale"} />
            </div>
          </div>
          <PurchaseSection
            items={purchasedItems.filter((item) => item.type === "Digital Course")}
            title="Active Digital Courses"
          />
          <PurchaseSection
            items={purchasedItems.filter((item) => item.type === "Book")}
            title="Purchased Books"
          />
          <PurchaseSection
            items={purchasedItems.filter((item) => item.type === "E-book")}
            title="E-books"
          />
          <PurchaseSection
            items={purchasedItems.filter((item) => item.type === "Live Class")}
            title="Live Classes"
          />
          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="font-semibold">Purchase History</h3>
            <div className="mt-3 space-y-2">
              {studentTransactions.length > 0 ? (
                studentTransactions.map((transaction) => (
                  <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm" key={transaction.id}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono font-semibold">{transaction.id}</span>
                      <Badge tone={transactionStatusTone(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-slate-600">
                      {transaction.items.map((item) => item.name).join(", ")} | {money(transaction.total)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                  No purchase history yet.
                </div>
              )}
            </div>
          </section>
          <StudentTimeline events={timeline} />
        </section>
        <section className="space-y-4">
          <PromotionPanel promotions={student.promotions} />
          <ProfileList title="Recent Activity" items={student.activity} />
        </section>
      </div>
    </div>
  );
}

function NewStudentScreen({
  onCreate,
  onBack,
}: {
  onCreate: (student: Student) => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    grade: "Grade 12",
    parent: "",
    parentPhone: "",
    school: "",
    email: "",
  });
  const phoneError =
    form.phone.length > 0 && !/^0\d{9}$/.test(form.phone.replace(/\D/g, ""))
      ? "Enter a valid Thai mobile number, 10 digits starting with 0."
      : "";
  const canCreate = form.name.trim().length > 1 && /^0\d{9}$/.test(form.phone.replace(/\D/g, ""));

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back</SecondaryButton>}
        eyebrow="New student / walk-in"
        title="Create sale profile"
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Student Name" required value={form.name} onChange={(value) => update("name", value)} />
            <Field
              error={phoneError}
              label="Phone Number"
              placeholder="0812345678"
              required
              value={form.phone}
              onChange={(value) => update("phone", value)}
            />
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Grade <span className="text-red-600">*</span></span>
              <select
                className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
                value={form.grade}
                onChange={(event) => update("grade", event.target.value)}
              >
                {["Grade 10", "Grade 11", "Grade 12", "Gap Year"].map((grade) => (
                  <option key={grade}>{grade}</option>
                ))}
              </select>
            </label>
            <Field label="Parent Name" value={form.parent} onChange={(value) => update("parent", value)} />
            <Field label="Parent Phone" value={form.parentPhone} onChange={(value) => update("parentPhone", value)} />
            <Field label="School" value={form.school} onChange={(value) => update("school", value)} />
            <Field label="Email" value={form.email} onChange={(value) => update("email", value)} />
          </div>
          <div className="mt-5 flex justify-end">
            <PrimaryButton
              disabled={!canCreate}
              icon={<Check size={17} />}
              onClick={() =>
                onCreate({
                  id: "NEW-260706-009",
                  name: form.name,
                  grade: form.grade,
                  phone: form.phone,
                  parent: form.parent || "Not provided",
                  school: form.school || "Not provided",
                  courses: [],
                  purchases: [],
                  promotions: ["New student: SMS activation after payment"],
                  alerts: [],
                  deliveryAddresses: [],
                  activity: ["Created at Siam Branch"],
                  isNew: true,
                })
              }
            >
              Continue to Catalog
            </PrimaryButton>
          </div>
        </section>

        <aside className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 shrink-0 text-amber-700" size={20} />
            <div>
              <h3 className="font-semibold text-amber-950">Phone is mandatory</h3>
              <p className="mt-2 text-sm leading-6 text-amber-900">
                New students receive the activation code by SMS after payment.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function CatalogScreen({
  activeStudent,
  cart,
  discountApproval,
  duplicateWarning,
  favoriteIds,
  lastFilter,
  recentlyViewedProducts,
  recentlySold,
  recommendations,
  promotions,
  onAdd,
  onFilterChange,
  onRemove,
  onQty,
  onPayment,
  onProfile,
  onToggleFavorite,
  onSuspend,
  onRequestDiscount,
  onClearDiscount,
}: {
  activeStudent: Student | null;
  cart: CartLine[];
  discountApproval: DiscountApproval | null;
  duplicateWarning: { productName: string; purchaseDate: string; receiptId: string } | null;
  favoriteIds: string[];
  lastFilter: string;
  recentlyViewedProducts: Product[];
  recentlySold: Product[];
  recommendations: Product[];
  promotions: string[];
  onAdd: (product: Product) => void;
  onFilterChange: (filter: string) => void;
  onRemove: (lineId: string) => void;
  onQty: (lineId: string, direction: 1 | -1) => void;
  onPayment: () => void;
  onProfile: () => void;
  onToggleFavorite: (productId: string) => void;
  onSuspend: () => void;
  onRequestDiscount: () => void;
  onClearDiscount: () => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(lastFilter);
  const isLoadingProducts = query.trim().length > 0;
  const sourceProducts =
    filter === "Favorites"
      ? products.filter((product) => favoriteIds.includes(product.id))
      : filter === "Recently Viewed"
        ? recentlyViewedProducts
      : filter === "Recently Sold"
        ? recentlySold
        : products;
  const filtered = sourceProducts.filter((product) => {
    const search = `${product.name} ${product.subject} ${product.grade} ${product.sku}`.toLowerCase();
    const matchesQuery = search.includes(query.toLowerCase());
    const matchesFilter =
      filter === "Favorites" ||
      filter === "Best Selling" ||
      filter === "Recently Sold" ||
      product.type === filter ||
      product.grade === filter ||
      product.subject === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="mx-auto grid max-w-[1480px] grid-cols-1 gap-5 px-4 py-5 xl:grid-cols-[1fr_380px]">
      <section className="min-w-0 space-y-5">
        {activeStudent && (
          <div className="flex justify-end">
            <SecondaryButton icon={<User size={16} />} onClick={onProfile}>View Profile</SecondaryButton>
          </div>
        )}

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap gap-3">
            <label className="relative min-w-[280px] flex-1">
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                className="h-11 w-full rounded-md border border-slate-300 pl-9 pr-3 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
                placeholder="Search course, subject, grade, or SKU"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            {filters.map((item) => (
              <button
                className={`h-11 rounded-md border px-3 text-sm font-semibold ${
                  filter === item
                    ? "border-[#028FC1] bg-sky-50 text-[#027da9]"
                    : "border-slate-300 bg-white text-slate-700"
                }`}
                key={item}
                onClick={() => {
                  setFilter(item);
                  onFilterChange(item);
                }}
              >
                {item}
              </button>
            ))}
            </div>
          {isLoadingProducts && (
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <Loader2 size={15} className="animate-spin" />
              Loading products...
            </div>
          )}
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                {filter === "Best Selling" ? "Best Selling Courses" : filter}
              </h2>
              <p className="text-sm text-slate-500">
                Fast access to commonly sold items at this branch.
              </p>
            </div>
            <Badge tone="sky">{filtered.length} results</Badge>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {filtered.map((product) => (
              <article className="rounded-lg border border-slate-200 bg-white p-4" key={product.id}>
                <div className="flex gap-4">
                  <ProductImage product={product} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Badge tone={product.type === "Live Class" ? "amber" : product.type === "Book" ? "green" : "sky"}>
                          {product.type}
                        </Badge>
                        <h3 className="mt-2 font-semibold leading-snug">{product.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{money(product.price)}</p>
                        <IconButton
                          icon={
                            <Star
                              fill={favoriteIds.includes(product.id) ? "currentColor" : "none"}
                              size={15}
                            />
                          }
                          label={favoriteIds.includes(product.id) ? "Remove favorite" : "Add favorite"}
                          onClick={() => onToggleFavorite(product.id)}
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {product.grade} | {product.subject} | {product.sku}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-slate-800">{product.availability}</span>
                      {product.warning && <Badge tone="amber">{product.warning}</Badge>}
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-xs text-slate-500">{product.detail}</span>
                      <PrimaryButton icon={<Plus size={16} />} onClick={() => onAdd(product)}>
                        Add
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 lg:col-span-2">
                No products match this search. Try SKU, subject, grade, or another category.
              </div>
            )}
          </div>
        </div>
      </section>

      <CartPanel
        activeStudent={activeStudent}
        cart={cart}
        discountApproval={discountApproval}
        duplicateWarning={duplicateWarning}
        promotions={promotions}
        recommendations={recommendations}
        onAdd={onAdd}
        onClearDiscount={onClearDiscount}
        onPayment={onPayment}
        onQty={onQty}
        onRequestDiscount={onRequestDiscount}
        onRemove={onRemove}
        onSuspend={onSuspend}
      />
    </div>
  );
}

function PaymentScreen({
  activeStudent,
  cart,
  discountApproval,
  deliveryAddress,
  lastPaymentMethod,
  onBack,
  onPendingPayment,
  onPaymentMethodChange,
  onSuccess,
}: {
  activeStudent: Student | null;
  cart: CartLine[];
  discountApproval: DiscountApproval | null;
  deliveryAddress: DeliveryAddress | null;
  lastPaymentMethod: PaymentMethod;
  onBack: () => void;
  onPendingPayment: (method: PaymentMethod) => void;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onSuccess: (method: PaymentMethod) => void;
}) {
  const [method, setMethod] = useState<PaymentMethod>(lastPaymentMethod);
  const [received, setReceived] = useState("25000");
  const [processing, setProcessing] = useState(false);
  const totals = calculateTotals(cart, discountApproval?.amount ?? 0);
  const receivedNumber = Number(received || 0);
  const change = method === "Cash" ? Math.max(receivedNumber - totals.total, 0) : 0;
  const canPay = method !== "Cash" || receivedNumber >= totals.total;

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back to Cart</SecondaryButton>}
        eyebrow="Payment"
        title="Collect payment"
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <section className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="font-semibold">Payment method</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                { name: "Cash" as PaymentMethod, icon: <Banknote size={20} /> },
                { name: "Credit Card" as PaymentMethod, icon: <CreditCard size={20} /> },
                { name: "QR Payment" as PaymentMethod, icon: <QrCode size={20} /> },
              ].map((option) => (
                <button
                  className={`rounded-lg border p-4 text-left ${
                    method === option.name
                      ? "border-[#028FC1] bg-sky-50"
                      : "border-slate-200 bg-white"
                  }`}
                  key={option.name}
                  onClick={() => {
                    setMethod(option.name);
                    onPaymentMethodChange(option.name);
                  }}
                >
                  <span className="flex items-center gap-2 font-semibold">
                    {option.icon}
                    {option.name}
                  </span>
                  <span className="mt-2 block text-sm text-slate-600">
                    {option.name === "Cash"
                      ? "Auto-calculate received and change."
                      : option.name === "Credit Card"
                        ? "Mark paid after terminal approval."
                        : "Show pending until QR confirms."}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Payment status</h2>
              <Badge tone={method === "QR Payment" ? "amber" : "green"}>
                {method === "QR Payment" ? "Awaiting QR confirmation" : "Ready"}
              </Badge>
            </div>
            {method === "Cash" ? (
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Info label="Amount" value={money(totals.total)} />
                <Field label="Received" value={received} onChange={setReceived} />
                <Info label="Change" value={money(change)} />
              </div>
            ) : (
              <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Confirm {method.toLowerCase()} approval before completing the sale.
              </div>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="font-semibold">Items</h2>
            <div className="mt-3 divide-y divide-slate-100">
              {cart.map((line) => (
                <div className="flex justify-between gap-4 py-3 text-sm" key={line.lineId}>
                  <div>
                    <p className="font-semibold">{line.product.name}</p>
                    <p className="mt-1 text-slate-500">{line.product.type} | Qty {line.quantity}</p>
                  </div>
                  <p className="font-semibold">{money(line.product.price * line.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="font-semibold">Summary</h2>
          <div className="mt-3 text-sm">
            <InfoRow label="Student" value={activeStudent?.name ?? "No student"} />
            <InfoRow label="Subtotal" value={money(totals.subtotal)} />
            <InfoRow label="Discount" value={`-${money(totals.discount)}`} />
            {discountApproval && (
              <InfoRow label="Discount Reason" value={discountApproval.reason} />
            )}
            {deliveryAddress && (
              <InfoRow label="Delivery" value={deliveryAddress.label} />
            )}
            <InfoRow label="Tax" value={money(totals.tax)} />
            <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-xl font-semibold">
              <span>Grand Total</span>
              <span>{money(totals.total)}</span>
            </div>
          </div>
          {!canPay && (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">
              Cash received is less than the amount due.
            </div>
          )}
          <PrimaryButton
            className="mt-4 w-full"
            disabled={!canPay || processing}
            icon={processing ? <Loader2 className="animate-spin" size={18} /> : method === "QR Payment" ? <QrCode size={18} /> : <CheckCircle2 size={18} />}
            onClick={() => {
              setProcessing(true);
              window.setTimeout(() => {
                if (method === "QR Payment") {
                  onPendingPayment(method);
                } else {
                  onSuccess(method);
                }
              }, 650);
            }}
          >
            {processing ? "Processing payment..." : method === "QR Payment" ? "Generate QR Payment" : "Complete Payment"}
          </PrimaryButton>
        </aside>
      </div>
    </div>
  );
}

function SuccessScreen({
  activeStudent,
  cart,
  receiptId,
  total,
  onNewSale,
  onProfile,
  onReceiptPreview,
}: {
  activeStudent: Student | null;
  cart: CartLine[];
  receiptId: string;
  total: number;
  onNewSale: () => void;
  onProfile: () => void;
  onReceiptPreview: () => void;
}) {
  const [successNotice, setSuccessNotice] = useState("");

  return (
    <div className="mx-auto max-w-[980px] px-4 py-8">
      <section className="rounded-lg border border-emerald-200 bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <CheckCircle2 size={30} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-emerald-700">Payment success</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight">{receiptId}</h2>
            <p className="mt-2 text-slate-600">
              {activeStudent?.isNew
                ? `SMS activation code has been sent to ${maskPhone(activeStudent.phone)}.`
                : "Activation status is updated on the student account."}
            </p>
          </div>
          <Badge tone="green">{money(total)}</Badge>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200">
          {cart.map((line) => (
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-sm last:border-0" key={line.lineId}>
              <div>
                <p className="font-semibold">{line.product.name}</p>
                <p className="mt-1 text-slate-500">{line.product.type} | Activation: Ready</p>
              </div>
              <span>{money(line.product.price * line.quantity)}</span>
            </div>
          ))}
        </div>
        {successNotice && (
          <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-900">
            {successNotice}
          </div>
        )}

        <div className="mt-6 grid gap-3 md:grid-cols-5">
          <SecondaryButton icon={<Printer size={17} />} onClick={onReceiptPreview}>Print Receipt</SecondaryButton>
          <SecondaryButton icon={<FileText size={17} />} onClick={onReceiptPreview}>Receipt Preview</SecondaryButton>
          <SecondaryButton icon={<MessageSquareText size={17} />} onClick={() => setSuccessNotice(`SMS resend queued for ${maskPhone(activeStudent?.phone ?? "")}.`)}>Send SMS Again</SecondaryButton>
          <SecondaryButton icon={<User size={17} />} onClick={onProfile}>View Profile</SecondaryButton>
          <PrimaryButton icon={<RotateCcw size={17} />} onClick={onNewSale}>Start New Sale</PrimaryButton>
        </div>
      </section>
    </div>
  );
}

function SuspendedSalesScreen({
  suspendedSales,
  onBack,
  onCancelSale,
  onOpenDetail,
  onResumeSale,
}: {
  suspendedSales: SuspendedSale[];
  onBack: () => void;
  onCancelSale: (sale: SuspendedSale) => void;
  onOpenDetail: (sale: SuspendedSale) => void;
  onResumeSale: (sale: SuspendedSale) => void;
}) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const filtered = suspendedSales.filter((sale) =>
    `${sale.student.name} ${sale.student.id} ${sale.student.phone} ${cartProductSummary(sale.cart)} ${sale.reason} ${sale.note} ${sale.staff}`
      .toLowerCase()
      .includes(normalized),
  );

  return (
    <div className="mx-auto max-w-[1380px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back</SecondaryButton>}
        eyebrow="Operations queue"
        title="Suspended Sales"
      />
      <div className="mb-5 grid gap-4 md:grid-cols-[1fr_220px]">
        <label className="relative block">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            autoFocus
            className="h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
            placeholder="Search student, phone, item, reason, note, or staff"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          {suspendedSales.length} suspended cases
        </div>
      </div>

      <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <div className="grid min-w-[1180px] grid-cols-[1.1fr_130px_140px_90px_1.2fr_130px_140px_1fr_110px_230px] border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Student</span>
          <span>Student ID</span>
          <span>Phone</span>
          <span>Items</span>
          <span>Products</span>
          <span>Total</span>
          <span>Suspended</span>
          <span>Reason / Note</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {filtered.map((sale) => (
          <div
            className="grid min-w-[1180px] grid-cols-[1.1fr_130px_140px_90px_1.2fr_130px_140px_1fr_110px_230px] items-center border-b border-slate-100 px-4 py-3 text-sm last:border-0"
            key={sale.id}
          >
            <span>
              <span className="block font-semibold">{sale.student.name}</span>
              <span className="text-xs text-slate-500">{sale.staff}</span>
            </span>
            <span>{sale.student.isNew ? "New" : sale.student.id}</span>
            <span>{sale.student.phone}</span>
            <span>{cartItemCount(sale.cart)}</span>
            <span className="truncate pr-3">{cartProductSummary(sale.cart)}</span>
            <span className="font-semibold">{money(suspendedSaleTotal(sale))}</span>
            <span>
              <span className="block">{sale.date}</span>
              <span className="text-xs text-slate-500">{sale.time}</span>
            </span>
            <span>
              <span className="block font-medium">{sale.reason}</span>
              {sale.note && <span className="text-xs text-slate-500">{sale.note}</span>}
            </span>
            <span><Badge tone="amber">{sale.status}</Badge></span>
            <span className="flex flex-wrap gap-2">
              <PrimaryButton className="min-h-9 px-3" icon={<RotateCcw size={15} />} onClick={() => onResumeSale(sale)}>
                Resume
              </PrimaryButton>
              <IconButton icon={<ReceiptText size={15} />} label="View Detail" onClick={() => onOpenDetail(sale)} />
              <IconButton icon={<X size={15} />} label="Cancel Suspended Sale" onClick={() => onCancelSale(sale)} />
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500">
            No suspended sales match this search.
          </div>
        )}
      </section>
    </div>
  );
}

function SuspendedSaleDetailScreen({
  sale,
  onBack,
  onCancelSale,
  onResumeSale,
}: {
  sale: SuspendedSale;
  onBack: () => void;
  onCancelSale: (sale: SuspendedSale) => void;
  onResumeSale: (sale: SuspendedSale) => void;
}) {
  const totals = calculateTotals(sale.cart, sale.discountApproval?.amount ?? 0);

  return (
    <div className="mx-auto max-w-[980px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back to Queue</SecondaryButton>}
        eyebrow="Suspended sale detail"
        title={sale.student.name}
      />
      <section className="rounded-lg border border-amber-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge tone="amber">{sale.status}</Badge>
            <p className="mt-3 text-sm text-slate-600">
              {sale.student.isNew ? "New Student / Walk-in" : sale.student.id} | {sale.student.phone}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold">{money(totals.total)}</p>
            <p className="mt-1 text-sm text-slate-500">{sale.date}, {sale.time}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Info label="Staff who suspended" value={sale.staff} />
          <Info label="Reason" value={sale.reason} />
          <Info label="Note" value={sale.note || "No note"} />
          <Info label="Item Count" value={`${cartItemCount(sale.cart)} items`} />
        </div>
        <div className="mt-5 rounded-lg border border-slate-200">
          {sale.cart.map((line) => (
            <div className="flex justify-between gap-4 border-b border-slate-100 px-4 py-3 text-sm last:border-0" key={line.lineId}>
              <span>
                <span className="block font-semibold">{line.product.name}</span>
                <span className="text-xs text-slate-500">{line.product.type} | Qty {line.quantity}</span>
              </span>
              <span className="font-semibold">{money(line.product.price * line.quantity)}</span>
            </div>
          ))}
        </div>
        {sale.discountApproval && (
          <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
            Restores manager discount: {money(sale.discountApproval.amount)} | {sale.discountApproval.reason}
          </div>
        )}
        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <SecondaryButton icon={<X size={17} />} onClick={() => onCancelSale(sale)}>
            Cancel Suspended Sale
          </SecondaryButton>
          <PrimaryButton icon={<RotateCcw size={17} />} onClick={() => onResumeSale(sale)}>
            Resume Sale
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
}

function DeliveryInfoScreen({
  student,
  selectedAddress,
  onBack,
  onContinue,
  onSelectAddress,
}: {
  student: Student;
  selectedAddress: DeliveryAddress | null;
  onBack: () => void;
  onContinue: () => void;
  onSelectAddress: (address: DeliveryAddress) => void;
}) {
  const [addresses, setAddresses] = useState(student.deliveryAddresses);
  const [editing, setEditing] = useState(false);
  const [editAddressId, setEditAddressId] = useState<string | null>(null);
  const [newRecipient, setNewRecipient] = useState(student.name);
  const [newPhone, setNewPhone] = useState(student.phone);
  const [newAddress, setNewAddress] = useState("");
  const activeAddress = selectedAddress ?? defaultDeliveryAddress(student);

  function addAddress() {
    if (!newAddress.trim()) return;
    if (editAddressId) {
      const updatedAddress: DeliveryAddress = {
        id: editAddressId,
        label: addresses.find((address) => address.id === editAddressId)?.label ?? "Edited address",
        recipient: newRecipient,
        phone: newPhone,
        address: newAddress,
        method: "Central delivery service",
        estimate: "2-4 business days",
      };
      setAddresses((current) =>
        current.map((address) => (address.id === editAddressId ? updatedAddress : address)),
      );
      onSelectAddress(updatedAddress);
      setEditing(false);
      setEditAddressId(null);
      setNewAddress("");
      return;
    }
    const address: DeliveryAddress = {
      id: `ADDR-${Date.now()}`,
      label: "New address",
      recipient: newRecipient,
      phone: newPhone,
      address: newAddress,
      method: "Central delivery service",
      estimate: "2-4 business days",
    };
    setAddresses((current) => [...current, address]);
    onSelectAddress(address);
    setEditing(false);
    setNewAddress("");
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back</SecondaryButton>}
        eyebrow="Checkout"
        title="Delivery Information"
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <div className="flex gap-3">
              <Truck className="shrink-0" size={20} />
              <div>
                <p className="font-semibold">Book Delivery Required</p>
                <p className="mt-1">Physical books are fulfilled through the central delivery service after purchase.</p>
              </div>
            </div>
          </div>
          {addresses.map((address) => (
            <article
              className={`w-full rounded-lg border p-4 text-left ${activeAddress?.id === address.id ? "border-[#028FC1] bg-sky-50" : "border-slate-200 bg-white"}`}
              key={address.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{address.label}</h3>
                    {address.isDefault && <Badge tone="green">Default</Badge>}
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{address.recipient} | {address.phone}</p>
                  <p className="mt-1 text-sm text-slate-600">{address.address}</p>
                  <p className="mt-1 text-sm text-slate-500">{address.method} | {address.estimate}</p>
                </div>
                <div className="flex gap-2">
                  <SecondaryButton icon={<MapPin size={16} />} onClick={() => onSelectAddress(address)}>Select</SecondaryButton>
                  <SecondaryButton
                    icon={<FileText size={16} />}
                    onClick={() => {
                      setEditAddressId(address.id);
                      setNewRecipient(address.recipient);
                      setNewPhone(address.phone);
                      setNewAddress(address.address);
                      setEditing(true);
                    }}
                  >
                    Edit
                  </SecondaryButton>
                </div>
              </div>
            </article>
          ))}
          {editing ? (
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Recipient Name" value={newRecipient} onChange={setNewRecipient} />
                <Field label="Phone Number" value={newPhone} onChange={setNewPhone} />
              </div>
              <label className="mt-4 block">
                <span className="text-sm font-semibold text-slate-700">Delivery Address</span>
                <textarea
                  className="mt-1 min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
                  value={newAddress}
                  onChange={(event) => setNewAddress(event.target.value)}
                />
              </label>
              <div className="mt-4 flex justify-end gap-3">
                <SecondaryButton onClick={() => {
                  setEditing(false);
                  setEditAddressId(null);
                  setNewAddress("");
                }}>Cancel</SecondaryButton>
                <PrimaryButton icon={<Check size={17} />} onClick={addAddress}>
                  {editAddressId ? "Update Address" : "Save Address"}
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <SecondaryButton
              className="w-full"
              icon={<Plus size={16} />}
              onClick={() => {
                setEditAddressId(null);
                setNewRecipient(student.name);
                setNewPhone(student.phone);
                setNewAddress("");
                setEditing(true);
              }}
            >
              Add New Address
            </SecondaryButton>
          )}
        </section>
        <aside className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="font-semibold">Selected Delivery</h2>
          {activeAddress ? (
            <div className="mt-4 space-y-3 text-sm">
              <Info label="Recipient Name" value={activeAddress.recipient} />
              <Info label="Phone Number" value={activeAddress.phone} />
              <Info label="Delivery Address" value={activeAddress.address} />
              <Info label="Delivery Method" value={activeAddress.method} />
              <Info label="Estimated Delivery" value={activeAddress.estimate} />
              <Badge tone="amber">Book Delivery Required</Badge>
            </div>
          ) : (
            <p className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
              Select or add a delivery address to continue.
            </p>
          )}
          <PrimaryButton
            className="mt-5 w-full"
            disabled={!activeAddress}
            icon={<ChevronRight size={17} />}
            onClick={() => {
              if (activeAddress) onSelectAddress(activeAddress);
              onContinue();
            }}
          >
            Continue to Order Summary
          </PrimaryButton>
        </aside>
      </div>
    </div>
  );
}

function OrderSummaryScreen({
  activeStudent,
  cart,
  discountApproval,
  deliveryAddress,
  promotions,
  onBack,
  onContinue,
}: {
  activeStudent: Student | null;
  cart: CartLine[];
  discountApproval: DiscountApproval | null;
  deliveryAddress: DeliveryAddress | null;
  promotions: string[];
  onBack: () => void;
  onContinue: () => void;
}) {
  const totals = calculateTotals(cart, discountApproval?.amount ?? 0);

  return (
    <div className="mx-auto max-w-[980px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back</SecondaryButton>}
        eyebrow="Pre-payment"
        title="Order Summary"
      />
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">Customer</p>
            <h3 className="mt-1 text-lg font-semibold">{activeStudent?.name ?? "No student"}</h3>
            <p className="mt-1 text-sm text-slate-600">{activeStudent?.id} | {activeStudent?.phone}</p>
          </div>
          <Badge tone="sky">Quotation</Badge>
        </div>
        <div className="mt-4 rounded-lg border border-slate-200">
          {cart.map((line) => (
            <div className="flex justify-between gap-4 border-b border-slate-100 px-4 py-3 text-sm last:border-0" key={line.lineId}>
              <span>
                <span className="block font-semibold">{line.product.name}</span>
                <span className="text-xs text-slate-500">{line.product.type} | Qty {line.quantity}</span>
              </span>
              <span className="font-semibold">{money(line.product.price * line.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <section className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <h4 className="text-sm font-semibold">Promotions</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {promotions.length > 0 ? promotions.map((promotion) => <Badge key={promotion} tone="sky">{promotion}</Badge>) : <span className="text-sm text-slate-500">No promotion selected.</span>}
            </div>
          </section>
          <section className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <h4 className="text-sm font-semibold">Delivery requirement</h4>
            {deliveryAddress ? (
              <p className="mt-2 text-sm text-slate-600">{deliveryAddress.recipient} | {deliveryAddress.estimate}</p>
            ) : cartHasPhysicalBooks(cart) && activeStudent && !activeStudent.isNew ? (
              <p className="mt-2 text-sm text-amber-700">Book delivery information required before payment.</p>
            ) : cartHasPhysicalBooks(cart) ? (
              <p className="mt-2 text-sm text-slate-600">Student enters delivery address during SMS activation.</p>
            ) : (
              <p className="mt-2 text-sm text-slate-500">No delivery required.</p>
            )}
          </section>
        </div>
        <div className="mt-5 ml-auto max-w-sm text-sm">
          <InfoRow label="Subtotal" value={money(totals.subtotal)} />
          <InfoRow label="Discounts" value={`-${money(totals.discount)}`} />
          <InfoRow label="Tax" value={money(totals.tax)} />
          <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-xl font-semibold">
            <span>Total</span>
            <span>{money(totals.total)}</span>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <PrimaryButton icon={<CreditCard size={17} />} onClick={onContinue}>Continue to Payment</PrimaryButton>
        </div>
      </section>
    </div>
  );
}

function ReceiptPreviewScreen({
  activeStudent,
  cart,
  deliveryAddress,
  receiptId,
  transaction,
  total,
  onBack,
  onStartNewSale,
}: {
  activeStudent: Student | null;
  cart: CartLine[];
  deliveryAddress: DeliveryAddress | null;
  receiptId: string;
  transaction?: Transaction;
  total: number;
  onBack: () => void;
  onStartNewSale?: () => void;
}) {
  const [receiptNotice, setReceiptNotice] = useState("");
  function mockReceiptAction(action: string) {
    setReceiptNotice(`${action} queued for ${receiptId}.`);
  }
  const receiptStudent = transaction ? studentFromTransaction(transaction) : activeStudent;
  const receiptItems = transaction
    ? transaction.items.map((item) => ({
        id: item.productId,
        name: item.name,
        type: item.type,
        group: productFromItem(item)?.subject ?? item.type,
        quantity: item.quantity,
        unitPrice: item.price,
        discount: item.discount,
        total: item.price * item.quantity - item.discount * item.quantity,
      }))
    : cart.map((line) => ({
        id: line.lineId,
        name: line.product.name,
        type: line.product.type,
        group: line.product.subject,
        quantity: line.quantity,
        unitPrice: line.product.price,
        discount: line.discount,
        total: line.product.price * line.quantity - line.discount * line.quantity,
      }));
  const subtotal = receiptItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discount = receiptItems.reduce((sum, item) => sum + item.discount * item.quantity, 0);
  const grandTotal = transaction?.total ?? total;
  const tax = Math.max(grandTotal - Math.max(subtotal - discount, 0), 0);
  const receiptDeliveryAddress = transaction?.deliveryAddress ?? deliveryAddress;
  const paymentMethod = transaction?.method ?? "Completed payment";
  const paymentStatus = transaction?.status ?? (receiptStudent?.isNew ? "SMS sent" : "Paid");
  const receiptDate = transaction ? `6 Jul 2026, ${transaction.time}` : "6 Jul 2026, 14:33";
  const receiptStaff = transaction?.staff ?? staffName;
  const hasPhysicalBook = receiptItems.some((item) => item.type === "Book");

  return (
    <div className="receipt-preview-page mx-auto max-w-[980px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back</SecondaryButton>}
        eyebrow="Receipt"
        title="Receipt Preview"
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
        <section className="printable-receipt rounded-lg border border-slate-300 bg-white p-8 font-mono text-sm">
          <div className="text-center">
            <p className="text-lg font-bold">OnDemand Thailand</p>
            <p>Business Unit: OnDemand Education</p>
            <p>Siam Branch</p>
            <p>{receiptId}</p>
            <p>{receiptDate}</p>
          </div>
          <div className="my-5 border-t border-dashed border-slate-300" />
          <p>Staff: {receiptStaff}</p>
          <p>Student: {receiptStudent?.name ?? transaction?.student ?? "No student"}</p>
          {receiptStudent && !receiptStudent.isNew && <p>Student ID: {receiptStudent.id}</p>}
          <p>Phone: {receiptStudent?.phone ?? transaction?.phone}</p>
          <div className="my-5 border-t border-dashed border-slate-300" />
          {receiptItems.map((item, index) => (
            <div className="mb-3" key={`${item.id}-${index}`}>
              <div className="flex justify-between gap-4">
                <span>{item.name}</span>
                <span>{money(item.total)}</span>
              </div>
              <p className="text-xs text-slate-500">
                {item.type} | BU/Product Group: {item.group} | Qty {item.quantity} | Unit {money(item.unitPrice)} | Discount {money(item.discount * item.quantity)}
              </p>
            </div>
          ))}
          {receiptDeliveryAddress && (
            <>
              <div className="my-5 border-t border-dashed border-slate-300" />
              <p>Delivery: {receiptDeliveryAddress.recipient}</p>
              <p>{receiptDeliveryAddress.phone}</p>
              <p>{receiptDeliveryAddress.address}</p>
              <p>{receiptDeliveryAddress.method}</p>
              <p>{receiptDeliveryAddress.estimate}</p>
            </>
          )}
          <div className="my-5 border-t border-dashed border-slate-300" />
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>Discount</span>
            <span>-{money(discount)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>Tax</span>
            <span>{money(tax)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>GRAND TOTAL</span>
            <span>{money(grandTotal)}</span>
          </div>
          <div className="my-5 border-t border-dashed border-slate-300" />
          <p>Payment Method: {paymentMethod}</p>
          <p>Payment Status: {paymentStatus}</p>
          {transaction?.refund && <p>Refund Status: {transaction.refund.status}</p>}
          {hasPhysicalBook && !receiptDeliveryAddress && <p>Delivery Note: Address will be collected during activation.</p>}
          {receiptStudent?.isNew && <p>SMS Activation: Activation link sent to {maskPhone(receiptStudent.phone)}.</p>}
          <p className="mt-5 text-center">Thank you</p>
        </section>
        <aside className="receipt-actions rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="font-semibold">Receipt Actions</h2>
          {receiptNotice && (
            <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-900">
              {receiptNotice}
            </div>
          )}
          <div className="mt-4 grid gap-3">
            <PrimaryButton icon={<Printer size={17} />} onClick={() => window.print()}>Print Receipt</PrimaryButton>
            <SecondaryButton icon={<ArrowLeft size={17} />} onClick={onBack}>Back to Transaction</SecondaryButton>
            {onStartNewSale && <SecondaryButton icon={<Home size={17} />} onClick={onStartNewSale}>Start New Sale</SecondaryButton>}
            <SecondaryButton icon={<Download size={17} />} onClick={() => mockReceiptAction("PDF download")}>Download PDF</SecondaryButton>
            <SecondaryButton icon={<Mail size={17} />} onClick={() => mockReceiptAction("Email receipt")}>Email Receipt</SecondaryButton>
            <SecondaryButton icon={<MessageSquareText size={17} />} onClick={() => mockReceiptAction("SMS resend")}>Send SMS Again</SecondaryButton>
          </div>
        </aside>
      </div>
    </div>
  );
}

function DashboardScreen({
  transactions,
  suspendedSales,
  onBack,
  onPendingPayments,
  onSuspendedSales,
  onTransactions,
}: {
  transactions: Transaction[];
  suspendedSales: SuspendedSale[];
  onBack: () => void;
  onPendingPayments: () => void;
  onSuspendedSales: () => void;
  onTransactions: () => void;
}) {
  const metrics = dashboardMetrics(transactions, suspendedSales);
  const productMixTotal = metrics.productMix.reduce((sum, item) => sum + item.count, 0) || 1;

  return (
    <div className="mx-auto max-w-[1480px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back Home</SecondaryButton>}
        eyebrow="Experimental branch feature"
        title="Siam Branch Dashboard"
      />

      <section className="grid gap-4 lg:grid-cols-3">
        <DashboardMetric title="Today's Sales" value={money(metrics.revenue)} detail="Completed transaction revenue" />
        <DashboardMetric title="Completed Transactions" value={String(metrics.completedCount)} detail="Paid and SMS-sent orders" />
        <DashboardMetric title="Average Order Value" value={money(metrics.averageOrderValue)} detail="Revenue divided by completed orders" />
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold">Transaction Status Summary</h3>
              <Badge tone="sky">Siam Branch only</Badge>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <StatusCount label="Completed" count={metrics.statuses.completed} tone="green" />
              <StatusCount label="Pending Payment" count={metrics.statuses.pending} tone="amber" />
              <StatusCount label="Suspended" count={metrics.statuses.suspended} tone="amber" />
              <StatusCount label="Voided" count={metrics.statuses.voided} tone="red" />
              <StatusCount label="Refund Requested" count={metrics.statuses.refundRequested} tone="amber" />
              <StatusCount label="Sent to Accounting" count={metrics.statuses.refundApproved} tone="green" />
              <StatusCount label="Refund Rejected" count={metrics.statuses.refundRejected} tone="red" />
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">Top Selling Products</h3>
              <div className="mt-4 space-y-3">
                {metrics.topProducts.map((product, index) => (
                  <div className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm" key={product.name}>
                    <span className="min-w-0">
                      <span className="mr-2 font-mono text-xs text-slate-500">#{index + 1}</span>
                      <span className="font-semibold">{product.name}</span>
                    </span>
                    <Badge>{product.count} sold</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-semibold">Product Mix</h3>
              <div className="mt-4 space-y-4">
                {metrics.productMix.map((item) => {
                  const percent = Math.round((item.count / productMixTotal) * 100);
                  return (
                    <div key={item.type}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-semibold">{item.type}</span>
                        <span className="text-slate-500">{item.count} items | {percent}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-[#028FC1]" style={{ width: `${Math.max(percent, 3)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="font-semibold">Recent Activity</h3>
            <div className="mt-4 space-y-3">
              {metrics.recentActivity.map((event) => (
                <div className="grid gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm md:grid-cols-[80px_1fr_auto]" key={event.id}>
                  <span className="font-mono text-xs font-semibold text-slate-500">{event.time}</span>
                  <span>
                    <span className="block font-semibold">{event.title}</span>
                    <span className="mt-1 block text-slate-600">{event.detail}</span>
                  </span>
                  <Badge tone={event.tone}>{event.title}</Badge>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="font-semibold">Pending Actions</h3>
            <div className="mt-4 grid gap-3">
              <QueueButton count={metrics.pendingActions.pendingPayments.length} label="Pending Payments" onClick={onPendingPayments} tone="sky" />
              <QueueButton count={metrics.pendingActions.suspendedSales.length} label="Suspended Sales" onClick={onSuspendedSales} tone="amber" />
              <QueueButton count={metrics.pendingActions.refundRequests.length} label="Refund Requests" onClick={onTransactions} tone="amber" />
              <QueueButton count={metrics.pendingActions.smsFailed.length} label="SMS Failed Cases" onClick={onTransactions} tone="red" />
            </div>
          </section>

          <section className="rounded-lg border border-amber-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <RotateCcw size={17} className="text-amber-700" />
              <h3 className="font-semibold">Refund Summary</h3>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <Info label="Refund Requested" value={`${metrics.refundSummary.requestedCount} transactions`} />
              <Info label="Sent to Accounting" value={`${metrics.refundSummary.approvedCount} transactions`} />
              <Info label="Refund Rejected" value={`${metrics.refundSummary.rejectedCount} transactions`} />
              <Info
                label="Latest Refund Request"
                value={
                  metrics.refundSummary.latestRequest
                    ? `${metrics.refundSummary.latestRequest.id} | ${metrics.refundSummary.latestRequest.student}`
                    : "No refund activity yet"
                }
              />
            </div>
          </section>

          <section className="rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-950">
            <h3 className="font-semibold">Read-only prototype dashboard</h3>
            <p className="mt-2 leading-6">
              Metrics are calculated from current mock/live state. No backend, database, or BI layer is connected.
            </p>
          </section>
        </aside>
      </section>
    </div>
  );
}

function DashboardMetric({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
    </section>
  );
}

function StatusCount({
  label,
  count,
  tone,
}: {
  label: string;
  count: number;
  tone: BadgeTone;
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">{label}</span>
        <Badge tone={tone}>{count}</Badge>
      </div>
    </div>
  );
}

function QueueButton({
  label,
  count,
  tone,
  onClick,
}: {
  label: string;
  count: number;
  tone: BadgeTone;
  onClick: () => void;
}) {
  return (
    <button
      className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm hover:border-[#028FC1]"
      onClick={onClick}
    >
      <span className="font-semibold">{label}</span>
      <Badge tone={tone}>{count}</Badge>
    </button>
  );
}

function PendingPaymentsScreen({
  transactions,
  onBack,
  onCancelPayment,
  onCompletePayment,
  onResumePayment,
}: {
  transactions: Transaction[];
  onBack: () => void;
  onCancelPayment: (transaction: Transaction) => void;
  onCompletePayment: (transaction: Transaction) => void;
  onResumePayment: (transaction: Transaction) => void;
}) {
  const pending = transactions.filter((transaction) => transaction.status === "Pending Payment");
  const [query, setQuery] = useState("");
  const isLoadingPending = query.trim().length > 0;
  const filtered = pending.filter((transaction) =>
    `${transaction.id} ${transaction.student} ${transaction.phone} ${transaction.items.map((item) => item.name).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back</SecondaryButton>}
        eyebrow="Operations queue"
        title="Pending Payments"
      />
      <label className="relative mb-5 block">
        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
        <input
          className="h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
          placeholder="Search pending payment, receipt, student, phone, or item"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      {isLoadingPending && (
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Loader2 size={15} className="animate-spin" />
          Loading pending payments...
        </div>
      )}
      {filtered.length > 0 ? (
        <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <div className="grid min-w-[980px] grid-cols-[1.1fr_1fr_1.4fr_130px_130px_260px] border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
            <span>Receipt</span>
            <span>Student</span>
            <span>Products</span>
            <span>Total</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {filtered.map((transaction) => (
            <div className="grid min-w-[980px] grid-cols-[1.1fr_1fr_1.4fr_130px_130px_260px] items-center border-b border-slate-100 px-4 py-3 text-sm last:border-0" key={transaction.id}>
              <span>
                <span className="block font-mono font-semibold">{transaction.id}</span>
                <span className="text-xs text-slate-500">{transaction.time} | QR generated</span>
              </span>
              <span>{transaction.student}</span>
              <span className="truncate pr-4">{transaction.items.map((item) => item.name).join(", ")}</span>
              <span className="font-semibold">{money(transaction.total)}</span>
              <span><Badge tone="amber">Pending Payment</Badge></span>
              <span className="flex flex-wrap gap-2">
                <PrimaryButton className="min-h-9 px-3" icon={<CheckCircle2 size={15} />} onClick={() => onCompletePayment(transaction)}>Complete</PrimaryButton>
                <IconButton icon={<CreditCard size={15} />} label="Resume Payment" onClick={() => onResumePayment(transaction)} />
                <IconButton icon={<X size={15} />} label="Cancel Payment" onClick={() => onCancelPayment(transaction)} />
              </span>
            </div>
          ))}
        </section>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <QrCode className="mx-auto text-slate-400" size={32} />
          <h3 className="mt-3 font-semibold">No Pending Payments</h3>
          <p className="mt-1 text-sm text-slate-500">
            QR payments waiting for customer confirmation will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

function TransactionsScreen({
  transactions,
  suspendedSales,
  onBack,
  onOpen,
  onReceiptPreview,
  onOpenSuspended,
}: {
  transactions: Transaction[];
  suspendedSales: SuspendedSale[];
  onBack: () => void;
  onOpen: (transaction: Transaction) => void;
  onReceiptPreview: (transaction: Transaction) => void;
  onOpenSuspended: (sale: SuspendedSale) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<TransactionFilter>("All");
  const isLoadingTransactions = query.trim().length > 0;
  const transactionMatchesFilter = (transaction: Transaction) => {
    if (filter === "All") return true;
    if (filter === "Completed") return isCompletedTransaction(transaction);
    if (filter === "Pending Payment") return transaction.status === "Pending Payment";
    if (filter === "Voided") return transaction.status === "Voided";
    if (filter === "Refund Requested") return transaction.refund?.status === "Refund Requested";
    if (filter === "Sent to Accounting") return transaction.refund?.status === "Refund Approved / Sent to Accounting";
    if (filter === "Refund Rejected") return transaction.refund?.status === "Refund Rejected";
    return false;
  };
  const filteredTransactions = filter === "Suspended" ? [] : transactions.filter((transaction) =>
    transactionMatchesFilter(transaction) &&
    `${transaction.id} ${transaction.student} ${transaction.phone} ${transaction.items.map((item) => item.name).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const filteredSuspendedSales = filter === "Suspended"
    ? suspendedSales.filter((sale) =>
        `${sale.id} ${sale.student.name} ${sale.student.phone} ${sale.student.id} ${cartProductSummary(sale.cart)} ${sale.reason}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
    : [];
  const filters: TransactionFilter[] = [
    "All",
    "Completed",
    "Pending Payment",
    "Suspended",
    "Voided",
    "Refund Requested",
    "Sent to Accounting",
    "Refund Rejected",
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back</SecondaryButton>}
        eyebrow="Operations"
        title="Transactions"
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            className={`h-10 rounded-md border px-3 text-sm font-semibold ${
              filter === item
                ? "border-[#028FC1] bg-sky-50 text-[#027da9]"
                : "border-slate-300 bg-white text-slate-700 hover:border-[#028FC1]"
            }`}
            key={item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <label className="relative mb-5 block">
        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
        <input
          className="h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
          placeholder="Search receipt, student, phone, or product"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      {isLoadingTransactions && (
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Loader2 size={15} className="animate-spin" />
          Loading transaction history...
        </div>
      )}
      {filter === "Suspended" ? (
        <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          {filteredSuspendedSales.length === 0 ? (
            <div className="p-8 text-center">
              <PauseCircle className="mx-auto text-slate-400" size={32} />
              <h3 className="mt-3 font-semibold">No Suspended Sales</h3>
              <p className="mt-1 text-sm text-slate-500">Suspended sale cases will appear here when this filter is selected.</p>
            </div>
          ) : (
            <>
              <div className="grid min-w-[920px] grid-cols-[1.1fr_1fr_1.5fr_140px_130px_150px] border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
                <span>Case</span>
                <span>Student</span>
                <span>Products</span>
                <span>Total</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              {filteredSuspendedSales.map((sale) => (
                <div
                  className="grid min-w-[920px] grid-cols-[1.1fr_1fr_1.5fr_140px_130px_150px] items-center border-b border-slate-100 px-4 py-3 text-sm last:border-0"
                  key={sale.id}
                >
                  <span>
                    <span className="block font-mono font-semibold">{sale.id}</span>
                    <span className="text-xs text-slate-500">{sale.date}, {sale.time}</span>
                  </span>
                  <span>{sale.student.name}</span>
                  <span className="truncate pr-4">{cartProductSummary(sale.cart)}</span>
                  <span className="font-semibold">{money(suspendedSaleTotal(sale))}</span>
                  <span><Badge tone="amber">Suspended</Badge></span>
                  <span>
                    <IconButton icon={<ReceiptText size={15} />} label="View" onClick={() => onOpenSuspended(sale)} />
                  </span>
                </div>
              ))}
            </>
          )}
        </section>
      ) : (
      <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <ReceiptText className="mx-auto text-slate-400" size={32} />
            <h3 className="mt-3 font-semibold">
              {query ? "No Matching Transactions" : "No Transactions"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {query ? "Try receipt number, student name, phone, or product." : "Transactions will appear here after checkout."}
            </p>
          </div>
        ) : (
          <>
        <div className="grid min-w-[920px] grid-cols-[1.1fr_1fr_140px_120px_120px_150px] border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
          <span>Receipt</span>
          <span>Student</span>
          <span>Total</span>
          <span>Method</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {filteredTransactions.map((transaction) => (
          <div
            className="grid min-w-[920px] grid-cols-[1.1fr_1fr_140px_120px_120px_150px] items-center border-b border-slate-100 px-4 py-3 text-sm last:border-0"
            key={transaction.id}
          >
            <span>
              <span className="block font-mono font-semibold">{transaction.id}</span>
              <span className="text-xs text-slate-500">{transaction.time} | {transaction.staff}</span>
            </span>
            <span>{transaction.student}</span>
            <span className="font-semibold">{money(transaction.total)}</span>
            <span>{transaction.method}</span>
            <span>
              <Badge tone={transaction.refund ? refundStatusTone(transaction.refund.status) : transactionStatusTone(transaction.status)}>
                {transactionDisplayStatus(transaction)}
              </Badge>
            </span>
            <span className="flex gap-2">
              <IconButton icon={<ReceiptText size={15} />} label="View" onClick={() => onOpen(transaction)} />
              <IconButton icon={<Printer size={15} />} label="Receipt Preview" onClick={() => onReceiptPreview(transaction)} />
              <IconButton
                disabled={transaction.status !== "Paid" && transaction.status !== "SMS sent"}
                icon={<X size={15} />}
                label="Void"
                onClick={() => onOpen(transaction)}
              />
            </span>
          </div>
        ))}
          </>
        )}
      </section>
      )}
    </div>
  );
}

function TransactionDetailScreen({
  transaction,
  onBack,
  onDuplicate,
  onRefund,
  onReceiptPreview,
  onVoid,
}: {
  transaction: Transaction;
  onBack: () => void;
  onDuplicate: () => void;
  onRefund: () => void;
  onReceiptPreview: () => void;
  onVoid: () => void;
}) {
  return (
    <div className="mx-auto max-w-[980px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back</SecondaryButton>}
        eyebrow="Transaction detail"
        title={transaction.id}
      />
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Info label="Student" value={transaction.student} />
          <Info label="Phone" value={transaction.phone} />
          <Info label="Staff" value={transaction.staff} />
          <Info label="Payment Method" value={transaction.method} />
          <Info label="Status" value={transaction.status} />
          <Info label="Total" value={money(transaction.total)} />
          {transaction.deliveryAddress && (
            <Info label="Delivery Address" value={`${transaction.deliveryAddress.recipient} | ${transaction.deliveryAddress.address}`} />
          )}
        </div>
        <div className="mt-5 rounded-lg border border-slate-200">
          {transaction.items.map((item, index) => (
            <div className="flex justify-between border-b border-slate-100 px-4 py-3 text-sm last:border-0" key={`${transaction.id}-${item.productId}-${index}`}>
              <span>
                <span className="block font-semibold">{item.name}</span>
                <span className="text-xs text-slate-500">{item.type} | Qty {item.quantity}</span>
              </span>
              <span>{money(item.price * item.quantity - item.discount * item.quantity)}</span>
            </div>
          ))}
        </div>
        {transaction.discountApproval && (
          <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
            Manager discount: {money(transaction.discountApproval.amount)} | {transaction.discountApproval.reason} | Approved by {transaction.discountApproval.manager}
          </div>
        )}
        {transaction.refund && (
          <section className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-amber-700" size={18} />
                  <h3 className="font-semibold text-amber-950">Experimental Refund</h3>
                  <Badge tone={refundStatusTone(transaction.refund.status)}>{transaction.refund.status}</Badge>
                </div>
                <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                  <Info label="Refund Reason" value={transaction.refund.reason} />
                  <Info label="Refund Note" value={transaction.refund.note || "No note"} />
                  <Info label="Requested By" value={transaction.refund.requestedBy} />
                  <Info label="Manager Approval" value={transaction.refund.managerApproval} />
                  <Info label="Requested Date/Time" value={transaction.refund.requestedAt} />
                  <Info label="Refund Amount" value={money(transaction.refund.amount)} />
                  <Info label="Demo Approver" value={transaction.refund.decisionBy ?? "Waiting for demo approval"} />
                  <Info label="Approval/Rejection Time" value={transaction.refund.decisionAt ?? "Not decided yet"} />
                  <Info label="Approval/Rejection Note" value={transaction.refund.decisionNote ?? "No decision note"} />
                </div>
              </div>
            </div>
            {transaction.refund.status === "Refund Approved / Sent to Accounting" && (
              <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-900">
                Refund request approved and handed over to Accounting.
              </div>
            )}
            <div className="mt-4 rounded-md border border-amber-200 bg-white p-3">
              <h4 className="text-sm font-semibold text-amber-950">Refund Activity</h4>
              <div className="mt-2 space-y-2">
                {transaction.refund.activity.map((event) => (
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm" key={`${transaction.id}-${event.status}`}>
                    <span>{event.status}</span>
                    <span className="text-slate-500">{event.time} | {event.staff}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <SecondaryButton icon={<Printer size={17} />} onClick={onReceiptPreview}>Receipt Preview</SecondaryButton>
          <SecondaryButton icon={<Copy size={17} />} onClick={onDuplicate}>Duplicate Sale</SecondaryButton>
          <SecondaryButton
            disabled={!isRefundEligible(transaction)}
            icon={<RotateCcw size={17} />}
            onClick={onRefund}
          >
            Request Refund
          </SecondaryButton>
          <PrimaryButton
            className="bg-red-600 hover:bg-red-700"
            disabled={transaction.status !== "Paid" && transaction.status !== "SMS sent"}
            icon={<ShieldCheck size={17} />}
            onClick={onVoid}
          >
            Void Transaction
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
}

function VoidFlowScreen({
  transaction,
  onCancel,
  onComplete,
}: {
  transaction: Transaction;
  onCancel: () => void;
  onComplete: () => void;
}) {
  const [managerCode, setManagerCode] = useState("");
  const [reason, setReason] = useState("Wrong Course");
  const [confirm, setConfirm] = useState(false);
  const canVoid = managerCode.trim().length >= 4 && reason && confirm;

  return (
    <div className="mx-auto max-w-[860px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onCancel}>Cancel</SecondaryButton>}
        eyebrow="Manager approval"
        title="Void transaction"
      />
      <section className="rounded-lg border border-red-200 bg-white p-5">
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <div className="flex gap-3">
            <AlertTriangle className="shrink-0" size={20} />
            <p>
              Voiding receipt {transaction.id} reverses the sale and should only be done with manager approval.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field
            label="Manager Approval Code"
            placeholder="Enter manager code"
            required
            value={managerCode}
            onChange={setManagerCode}
          />
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Reason <span className="text-red-600">*</span></span>
            <select
              className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            >
              {voidReasons.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="mt-5 flex items-start gap-3 rounded-md border border-slate-200 p-4 text-sm">
          <input
            className="mt-1 h-4 w-4 accent-[#028FC1]"
            checked={confirm}
            type="checkbox"
            onChange={(event) => setConfirm(event.target.checked)}
          />
          <span>
            I confirm the student, products, payment, and reason have been reviewed with a manager.
          </span>
        </label>
        <div className="mt-5 flex justify-end gap-3">
          <SecondaryButton onClick={onCancel}>Keep Transaction</SecondaryButton>
          <PrimaryButton
            className="bg-red-600 hover:bg-red-700"
            disabled={!canVoid}
            icon={<ShieldCheck size={17} />}
            onClick={onComplete}
          >
            Confirm Void
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
}

function RefundRequestScreen({
  transaction,
  onCancel,
  onSubmit,
}: {
  transaction: Transaction;
  onCancel: () => void;
  onSubmit: (reason: string, note: string, managerPin: string) => void;
}) {
  const [reason, setReason] = useState(refundReasons[0]);
  const [note, setNote] = useState("");
  const [managerPin, setManagerPin] = useState("");
  const [confirm, setConfirm] = useState(false);
  const canSubmit = isRefundEligible(transaction) && reason && managerPin.trim().length >= 4 && confirm;

  return (
    <div className="mx-auto max-w-[900px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onCancel}>Cancel</SecondaryButton>}
        eyebrow="Experimental branch feature"
        title="Request Full Refund"
      />
      {!isRefundEligible(transaction) && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-900">
          Refund is only available for completed transactions. This transaction is {transaction.status}.
        </div>
      )}
      <section className="rounded-lg border border-amber-200 bg-white p-5">
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <div className="flex gap-3">
            <AlertTriangle className="shrink-0 text-amber-700" size={20} />
            <p>
              This will request a full refund for the entire order. Refund is separate from same-day Void.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Info label="Receipt Number" value={transaction.id} />
          <Info label="Student" value={transaction.student} />
          <Info label="Payment Method" value={transaction.method} />
          <Info label="Paid Amount" value={money(transaction.total)} />
          <Info label="Refund Amount" value={money(transaction.total)} />
          <Info label="Requested By" value={staffName} />
        </div>

        <div className="mt-5 rounded-lg border border-slate-200">
          {transaction.items.map((item, index) => (
            <div className="flex justify-between gap-4 border-b border-slate-100 px-4 py-3 text-sm last:border-0" key={`${transaction.id}-refund-${item.productId}-${index}`}>
              <span>
                <span className="block font-semibold">{item.name}</span>
                <span className="text-xs text-slate-500">{item.type} | Qty {item.quantity}</span>
              </span>
              <span className="font-semibold">{money(item.price * item.quantity - item.discount * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Refund Reason <span className="text-red-600">*</span></span>
            <select
              className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            >
              {refundReasons.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <Field
            label="Manager PIN"
            placeholder="Enter manager PIN"
            required
            value={managerPin}
            onChange={setManagerPin}
          />
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-700">Refund Note</span>
          <textarea
            className="mt-1 min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
            placeholder="Optional note for manager/audit review"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </label>

        <label className="mt-5 flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <input
            className="mt-1 h-4 w-4 accent-[#028FC1]"
            checked={confirm}
            type="checkbox"
            onChange={(event) => setConfirm(event.target.checked)}
          />
          <span>
            I confirm this is a full-order refund request for the entire paid transaction.
          </span>
        </label>

        <div className="mt-5 flex justify-end gap-3">
          <SecondaryButton onClick={onCancel}>Keep Transaction</SecondaryButton>
          <PrimaryButton
            className="bg-amber-600 hover:bg-amber-700"
            disabled={!canSubmit}
            icon={<ShieldCheck size={17} />}
            onClick={() => onSubmit(reason, note, managerPin)}
          >
            Submit Refund Request
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
}

function DiscountApprovalModal({
  onCancel,
  onApprove,
}: {
  onCancel: () => void;
  onApprove: (approval: DiscountApproval) => void;
}) {
  const [amount, setAmount] = useState("500");
  const [reason, setReason] = useState(discountReasons[0]);
  const [managerPin, setManagerPin] = useState("");
  const amountNumber = Number(amount || 0);
  const canApprove = amountNumber > 0 && reason && managerPin.trim().length >= 4;

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 px-4">
      <section className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#028FC1]">Manager approval</p>
            <h2 className="mt-1 text-xl font-semibold">Apply manual discount</h2>
          </div>
          <IconButton icon={<X size={16} />} label="Close" onClick={onCancel} />
        </div>
        <div className="mt-5 grid gap-4">
          <Field
            label="Discount Amount"
            required
            value={amount}
            onChange={setAmount}
          />
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Discount Reason <span className="text-red-600">*</span></span>
            <select
              className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            >
              {discountReasons.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <Field
            label="Manager PIN"
            placeholder="4+ digits"
            required
            value={managerPin}
            onChange={setManagerPin}
          />
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
          <PrimaryButton
            disabled={!canApprove}
            icon={<ShieldCheck size={17} />}
            onClick={() =>
              onApprove({
                amount: amountNumber,
                reason,
                manager: "Manager PIN verified",
                approvedAt: "14:31",
              })
            }
          >
            Approve Discount
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
}

function SuspendSaleModal({
  activeStudent,
  cart,
  onCancel,
  onSuspend,
}: {
  activeStudent: Student;
  cart: CartLine[];
  onCancel: () => void;
  onSuspend: (reason: string, note: string) => void;
}) {
  const [reason, setReason] = useState(suspendReasons[0]);
  const [note, setNote] = useState("");
  const requiresNote = reason === "Other";
  const canSuspend = reason && (!requiresNote || note.trim().length > 1);
  const totals = calculateTotals(cart);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 px-4">
      <section className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#028FC1]">Suspend sale</p>
            <h2 className="mt-1 text-xl font-semibold">{activeStudent.name}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {cartItemCount(cart)} items | {money(totals.total)}
            </p>
          </div>
          <IconButton icon={<X size={16} />} label="Close" onClick={onCancel} />
        </div>
        <div className="mt-5 grid gap-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Reason <span className="text-red-600">*</span>
            </span>
            <select
              className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            >
              {suspendReasons.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Note {requiresNote && <span className="text-red-600">*</span>}
            </span>
            <textarea
              className="mt-1 min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#028FC1] focus:ring-2 focus:ring-sky-100"
              placeholder="Optional detail for the next staff member"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </label>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
          <PrimaryButton
            disabled={!canSuspend}
            icon={<PauseCircle size={17} />}
            onClick={() => onSuspend(reason, note)}
          >
            Suspend Sale
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
}

function ScreenTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-[#028FC1]">{eyebrow}</p>
        <h2 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 py-2">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function ProfileList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm" key={item}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function StudentAlerts({ alerts }: { alerts: string[] }) {
  if (alerts.length === 0) return null;
  return (
    <section className="mb-5 rounded-lg border border-amber-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <AlertTriangle size={18} className="text-amber-700" />
        <h3 className="font-semibold">Student Alerts</h3>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {alerts.map((alert) => (
          <Badge key={alert} tone="amber">{alert}</Badge>
        ))}
      </div>
    </section>
  );
}

function PromotionPanel({ promotions }: { promotions: string[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <Tag size={17} className="text-[#028FC1]" />
        <h3 className="font-semibold">Eligible Promotions</h3>
      </div>
      <div className="mt-3 space-y-2">
        {promotions.length > 0 ? (
          promotions.map((promotion) => (
            <div className="rounded-md border border-sky-100 bg-sky-50 px-3 py-2 text-sm font-medium text-sky-900" key={promotion}>
              {promotion}
            </div>
          ))
        ) : (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
            No eligible promotions for this student.
          </div>
        )}
      </div>
    </section>
  );
}

function StudentTimeline({
  events,
}: {
  events: Array<{ id: string; time: string; title: string; detail: string; status: string }>;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <History size={17} className="text-[#028FC1]" />
        <h3 className="font-semibold">Student Timeline</h3>
      </div>
      <div className="mt-4 space-y-3">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="grid grid-cols-[120px_1fr] gap-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm" key={event.id}>
              <span className="text-xs font-semibold text-slate-500">{event.time}</span>
              <span>
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{event.title}</span>
                  <Badge tone={event.status.includes("failed") || event.status === "Cancelled" ? "red" : event.status.includes("Pending") || event.status.includes("Suspended") ? "amber" : "green"}>
                    {event.status}
                  </Badge>
                </span>
                <span className="mt-1 block text-slate-600">{event.detail}</span>
              </span>
            </div>
          ))
        ) : (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
            No timeline events yet.
          </div>
        )}
      </div>
    </section>
  );
}

function PurchaseSection({
  title,
  items,
}: {
  title: string;
  items: Array<TransactionItem & {
    purchaseDate: string;
    receiptId: string;
    status: string;
  }>;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold">{title}</h3>
        <Badge>{items.length}</Badge>
      </div>
      <div className="mt-3 space-y-2">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              key={`${item.receiptId}-${item.productId}-${index}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold">{item.name}</span>
                <Badge tone={item.status === "Expired" ? "red" : item.status.startsWith("Refund") || item.status === "Upcoming Live Class" ? "amber" : "green"}>
                  {item.status}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {item.type} | {item.purchaseDate} | {item.receiptId}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
            No items in this category.
          </div>
        )}
      </div>
    </section>
  );
}

const strategySlides = [
  {
    eyebrow: "Strategy",
    title: "Education POS First",
    subtitle: "Building toward Refund & Change Management step by step",
    body: (
      <div className="mt-8 rounded-lg border border-sky-200 bg-sky-50 p-5 text-lg font-semibold text-sky-950">
        POS-first is a lower-risk incremental delivery strategy.
      </div>
    ),
  },
  {
    eyebrow: "Current Challenge",
    title: "RCMS has many cases and many dependencies.",
    body: (
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {["ERP", "OMS", "Accounting", "Delivery", "Approval", "Legacy Systems", "Business Rules"].map((item) => (
          <div className="rounded-md border border-slate-200 bg-white px-4 py-3 text-center text-lg font-semibold text-slate-800" key={item}>
            {item}
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "What We Learned",
    title: "RCMS is still important.",
    subtitle: "The long-term vision remains unchanged. The delivery path should be incremental.",
    body: (
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="text-xl font-semibold">Keep the target</h3>
          <p className="mt-3 text-slate-600">Refund and Change Management remains part of the future operating model.</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="text-xl font-semibold">Deliver value sooner</h3>
          <p className="mt-3 text-slate-600">Start with Education POS, then release useful controls in smaller increments.</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="text-xl font-semibold">Reduce risk</h3>
          <p className="mt-3 text-slate-600">Frequent releases create feedback while lowering implementation risk.</p>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Proposed Direction",
    title: "Build Education POS first.",
    subtitle: "Then gradually expand POS with more refund and change controls.",
    body: (
      <PresentationFlow
        items={["Education POS", "Void", "Full Refund", "More Refund Cases", "Change Cases", "Advanced RCMS"]}
      />
    ),
  },
  {
    eyebrow: "Why POS First",
    title: "Value arrives earlier.",
    body: (
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <PresentationCard
          title="Business Value"
          bullets={["Useful for branch staff earlier", "Less system switching", "Better customer context"]}
        />
        <PresentationCard
          title="Technical Value"
          bullets={["POS owns transaction context", "Natural integration point for OMS, ERP, Payment, Delivery, Lark"]}
        />
        <PresentationCard
          title="Delivery Value"
          bullets={["Smaller releases", "Faster feedback", "Lower risk"]}
        />
      </div>
    ),
  },
  {
    eyebrow: "POS Workflow",
    title: "One cashier flow, with controls after payment.",
    body: (
      <PresentationFlow
        items={["Student / Walk-in", "Product", "Cart", "Delivery if Book", "Payment", "Receipt", "Void / Refund if needed"]}
      />
    ),
  },
  {
    eyebrow: "Phased Delivery",
    title: "Deliver in practical chunks.",
    body: (
      <div className="mt-8 grid gap-3">
        {[
          ["Phase 1", "Core Education POS"],
          ["Phase 2", "Void + Full Refund Request"],
          ["Phase 3", "Integrations"],
          ["Phase 4", "Advanced RCMS"],
        ].map(([phase, detail]) => (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4" key={phase}>
            <span className="text-sm font-semibold uppercase text-[#028FC1]">{phase}</span>
            <span className="text-xl font-semibold text-slate-900">{detail}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "Control Language",
    title: "Void vs Refund",
    body: (
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <PresentationCard title="Void" bullets={["Same-day correction", "Mistake correction before settlement"]} />
        <PresentationCard title="Refund" bullets={["Post-payment customer request", "Approval first, then Accounting handles payout"]} />
      </div>
    ),
  },
  {
    eyebrow: "Prototype Demo",
    title: "Show the operating flow.",
    body: (
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {["Home", "Student Search", "Catalog", "Cart", "Payment", "Receipt", "Transactions", "Void", "Refund Request", "Dashboard"].map((item) => (
          <div className="rounded-md border border-slate-200 bg-white px-4 py-3 text-lg font-semibold" key={item}>
            {item}
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "Discussion",
    title: "Decision to Align",
    subtitle: "Confirm POS-first as the incremental path toward RCMS.",
    body: (
      <div className="mt-10 max-w-3xl rounded-lg border border-sky-200 bg-sky-50 p-6 text-xl leading-8 text-sky-950">
        Align on the delivery approach first. Scope details can follow after direction is clear.
      </div>
    ),
  },
  {
    eyebrow: "Closing",
    title: "Deliver Smaller. Learn Faster. Build Toward RCMS.",
    body: (
      <div className="mt-8 rounded-lg border border-sky-200 bg-white p-6 text-2xl font-semibold text-[#028FC1]">
        Education POS is the first useful step, not the final destination.
      </div>
    ),
  },
];

function PresentationCard({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
      <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
        {bullets.map((item) => (
          <li className="flex gap-3" key={item}>
            <CheckCircle2 className="mt-1 shrink-0 text-[#028FC1]" size={18} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PresentationFlow({ items }: { items: string[] }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      {items.map((item, index) => (
        <div className="flex items-center gap-3" key={item}>
          <div className="rounded-lg border border-slate-200 bg-white px-5 py-5 text-center text-lg font-semibold text-slate-900 shadow-sm">
            {item}
          </div>
          {index < items.length - 1 && <ChevronRight className="text-[#028FC1]" size={24} />}
        </div>
      ))}
    </div>
  );
}

function PresentationSlide({
  slide,
  index,
  compact = false,
}: {
  slide: typeof strategySlides[number];
  index: number;
  compact?: boolean;
}) {
  return (
    <section className={`${compact ? "min-h-[calc(100vh-148px)]" : "min-h-[640px]"} rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 md:p-12`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-semibold uppercase text-[#028FC1]">{slide.eyebrow}</span>
        <span className="font-mono text-sm font-semibold text-slate-400">{String(index + 1).padStart(2, "0")} / {strategySlides.length}</span>
      </div>
      <h2 className={`${compact ? "mt-10 text-4xl md:text-6xl" : "mt-10 text-4xl md:text-6xl"} max-w-5xl font-semibold tracking-tight text-slate-950`}>
        {slide.title}
      </h2>
      {slide.subtitle && <p className="mt-6 max-w-4xl text-2xl leading-9 text-slate-600">{slide.subtitle}</p>}
      {slide.body}
    </section>
  );
}

function PosStrategyPresentationScreen({
  onBack,
  onHome,
  onOpenDemo,
}: {
  onBack: () => void;
  onHome: () => void;
  onOpenDemo: () => void;
}) {
  const [presentationMode, setPresentationMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const progress = ((activeSlide + 1) / strategySlides.length) * 100;
  const goNext = () => setActiveSlide((current) => Math.min(strategySlides.length - 1, current + 1));
  const goPrevious = () => setActiveSlide((current) => Math.max(0, current - 1));

  useEffect(() => {
    if (!presentationMode) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "Escape") setPresentationMode(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presentationMode]);

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6">
      <ScreenTitle
        action={
          <div className="flex flex-wrap gap-2">
            <PrimaryButton icon={<ChevronRight size={16} />} onClick={() => setPresentationMode(true)}>Presentation Mode</PrimaryButton>
            <SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back to Demo Tools</SecondaryButton>
            <SecondaryButton icon={<Home size={16} />} onClick={onHome}>Back to POS Home</SecondaryButton>
          </div>
        }
        eyebrow="Internal presentation"
        title="POS Strategy Presentation"
      />
      <div className="space-y-6">
        {strategySlides.map((slide, index) => (
          <div className="relative" key={slide.title}>
            <PresentationSlide index={index} slide={slide} />
            {index === 8 && (
              <PrimaryButton className="absolute bottom-10 left-12" icon={<ShoppingCart size={18} />} onClick={onOpenDemo}>Open POS Demo</PrimaryButton>
            )}
          </div>
        ))}
      </div>
      {presentationMode && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-100 p-4 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase text-[#028FC1]">Presentation Mode</p>
              <p className="text-xs text-slate-500">Use Left / Right arrows. Press Esc to exit.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-slate-500">
                {activeSlide + 1} / {strategySlides.length}
              </span>
              <SecondaryButton className="min-h-9 px-3" icon={<X size={15} />} onClick={() => setPresentationMode(false)}>Exit</SecondaryButton>
            </div>
          </div>
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-[#028FC1] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="min-h-0 flex-1 transition-opacity duration-300">
            <PresentationSlide compact index={activeSlide} slide={strategySlides[activeSlide]} />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <SecondaryButton disabled={activeSlide === 0} icon={<ArrowLeft size={17} />} onClick={goPrevious}>Previous</SecondaryButton>
            {activeSlide === 8 && <PrimaryButton icon={<ShoppingCart size={18} />} onClick={onOpenDemo}>Open POS Demo</PrimaryButton>}
            <PrimaryButton disabled={activeSlide === strategySlides.length - 1} icon={<ChevronRight size={17} />} onClick={goNext}>Next</PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

function InternalResourcesScreen({
  onBack,
  onPresentation,
  onHome,
}: {
  onBack: () => void;
  onPresentation: () => void;
  onHome: () => void;
}) {
  const resourceSections = [
    {
      title: "Project Documents",
      icon: <FileText size={20} />,
      items: [
        {
          title: "Product Requirement Document (PRD)",
          description: "Original PRD for RCMS.",
          url: "https://docs.google.com/document/d/1pyEWfvOVq4zRNZDsNAZRw7UzvkIIN5jzTtXqMf14uvg/edit?tab=t.0#heading=h.y5yaanpwz4e9",
        },
        {
          title: "First Requirement Sheet",
          description: "Initial requirement gathering.",
          url: "https://docs.google.com/spreadsheets/d/1sG2Hcjpp4dbGzczfIaKvA3kqKMmd9PLHN_jSGko73kI/edit?gid=2145260807#gid=2145260807",
        },
        {
          title: "Miro Brainstorm Board",
          description: "Flow discussion and brainstorming.",
          url: "https://miro.com/app/board/uXjVJ81y1EA=/",
        },
      ],
    },
    {
      title: "Design",
      icon: <Tag size={20} />,
      items: [
        {
          title: "UI Figma",
          description: "UI reference and design.",
          url: "https://www.figma.com/design/8h18bUKRCDnmFCbfWBlLn5/LearnService?node-id=7406-565403&p=f&t=SFQ8xxwQMbkEjeTL-0",
        },
        {
          title: "UI -> Database Mapping",
          description: "UI to database relationship overview.",
          url: "https://docs.google.com/presentation/d/1YWCPV5CIxhXEb1WJDmmtPDXkwPp0rST39baoT1ScFcs/edit?slide=id.g3c31c9da2d2_0_83#slide=id.g3c31c9da2d2_0_83",
        },
      ],
    },
    {
      title: "Demo",
      icon: <Video size={20} />,
      items: [
        {
          title: "RCMS Demo Video",
          description: "High-level demo.",
          url: "https://drive.google.com/file/d/1Qz5MI89yS7gn0CCKM8pjuYA4s7ms32UO/view?usp=drive_link",
        },
        {
          title: "Operation Training Videos",
          description: "Current operation workflow videos.",
          url: "https://drive.google.com/drive/u/0/folders/1Lmz80yCsa17LRB4wY_TkV2jheZ1JlmJF",
        },
      ],
    },
    {
      title: "Testing",
      icon: <TableProperties size={20} />,
      items: [
        {
          title: "Testing Accounts & SKU",
          description: "Accounts and SKU for testing.",
          url: "https://docs.google.com/spreadsheets/d/1XHOWNnd_KrnRlWfjRPQj5CddOgf-Gn8pv4V1ctdeO7E/edit?gid=0#gid=0",
        },
        {
          title: "RCMS Test Cases",
          description: "Business UAT scenarios.",
          url: "https://docs.google.com/spreadsheets/d/1cDXiDqMgmlCBRTb263hj-hfah8iGhXuh7Yn8RDWZu7w/edit?gid=0#gid=0",
        },
        {
          title: "Accounting Test Cases",
          description: "Accounting validation.",
          url: "https://docs.google.com/spreadsheets/d/1v6EGy8VtuIqvvGNjP2Fw6Iyl0duPp2NmHGa0UDNHgWo/edit?gid=1713189472#gid=1713189472",
        },
      ],
    },
    {
      title: "Technical",
      icon: <Database size={20} />,
      items: [
        {
          title: "Database Review",
          description: "Database review materials.",
          url: "https://drive.google.com/drive/folders/18GKwq5Pb4DX172SbMgbzIxqz_mp63qSg?usp=drive_link",
        },
        {
          title: "Lark Integration POC",
          description: "Prototype integration with Lark.",
          url: "https://docs.google.com/spreadsheets/d/1-C-Ahk0Q8TyFc_YF4ytWMVETIa5ymE8OsEh5pMPNWEw/edit?usp=sharing",
        },
        {
          title: "Report Requirements",
          description: "Reports required from Data Team.",
          url: "https://docs.google.com/spreadsheets/d/1A-UidRcRT9vrG8xX4v5v8U0Ff3RCdfOmd9LfyCkQq7M/edit?gid=127578612#gid=127578612",
        },
      ],
    },
    {
      title: "Business Process",
      icon: <FolderOpen size={20} />,
      items: [
        {
          title: "Current Operation Flow",
          description: "Current manual refund/change process used by Operations.",
          url: "https://docs.google.com/spreadsheets/d/1hml7jV9YFf-QhGbDVlxgRQRSxt4jX-L55-CdQIQkt1E/edit?gid=0#gid=0",
        },
        {
          title: "Refund & Change Policy",
          description: "Current business policy.",
          url: "https://docs.google.com/presentation/d/1r1hmt4yFq04IgpAOFCJDDst6hrw0kplLLm-x3JIK0zY/edit?slide=id.g2c622b2993e_0_295#slide=id.g2c622b2993e_0_295",
        },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6">
      <ScreenTitle
        action={
          <div className="flex flex-wrap gap-2">
            <SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back to Demo Tools</SecondaryButton>
            <SecondaryButton icon={<Home size={16} />} onClick={onHome}>Back to POS Home</SecondaryButton>
          </div>
        }
        eyebrow="Internal resources"
        title="Internal Product Hub"
      />
      <div className="mb-5 rounded-lg border border-sky-200 bg-sky-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase text-[#028FC1]">Internal Use Only</p>
            <h3 className="mt-1 text-xl font-semibold">Project resources for Product, Development, QA, Operations, and stakeholders</h3>
            <p className="mt-2 text-sm leading-6 text-sky-950">
              Central hub for the documents, videos, test cases, integration notes, and process references used around the POS and RCMS discussion.
            </p>
          </div>
          <PrimaryButton icon={<FileText size={17} />} onClick={onPresentation}>Open POS Strategy Presentation</PrimaryButton>
        </div>
      </div>
      <div className="space-y-6">
        {resourceSections.map((section) => (
          <section className="rounded-lg border border-slate-200 bg-white p-5" key={section.title}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sky-50 text-[#028FC1]">
                {section.icon}
              </div>
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {section.items.map((item) => (
                <article className="flex min-h-[168px] flex-col rounded-lg border border-slate-200 bg-slate-50 p-4" key={item.title}>
                  <h4 className="font-semibold text-slate-950">{item.title}</h4>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  <a
                    className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 hover:border-[#028FC1]"
                    href={item.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExternalLink size={15} />
                    Open
                  </a>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function DemoToolsScreen({
  scenario,
  transactions,
  suspendedSales,
  onBack,
  onInternalResources,
  onPresentation,
  onRefundDecision,
  onScenarioChange,
  onReset,
  onSeedTransactions,
  onSeedStudents,
  onSeedPending,
  onSeedSuspended,
}: {
  scenario: DemoScenario;
  transactions: Transaction[];
  suspendedSales: SuspendedSale[];
  onBack: () => void;
  onInternalResources: () => void;
  onPresentation: () => void;
  onRefundDecision: (transaction: Transaction, decision: "approve" | "reject") => void;
  onScenarioChange: (scenario: DemoScenario) => void;
  onReset: () => void;
  onSeedTransactions: () => void;
  onSeedStudents: () => void;
  onSeedPending: () => void;
  onSeedSuspended: () => void;
}) {
  const pendingCount = transactions.filter((transaction) => transaction.status === "Pending Payment").length;
  const voidedCount = transactions.filter((transaction) => transaction.status === "Voided").length;
  const refundRequests = transactions.filter((transaction) => transaction.refund?.status === "Refund Requested");

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6">
      <ScreenTitle
        action={<SecondaryButton icon={<ArrowLeft size={16} />} onClick={onBack}>Back</SecondaryButton>}
        eyebrow="Settings"
        title="Demo Tools"
      />
      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <button
              className="rounded-lg border border-sky-200 bg-white p-5 text-left hover:border-[#028FC1] hover:bg-sky-50"
              onClick={onPresentation}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#028FC1] text-white">
                <FileText size={20} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">POS Strategy Presentation</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Internal HTML deck explaining the POS-first path toward Refund, Change, and RCMS.
              </p>
            </button>
            <button
              className="rounded-lg border border-slate-200 bg-white p-5 text-left hover:border-[#028FC1] hover:bg-slate-50"
              onClick={onInternalResources}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-900 text-white">
                <Settings size={20} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Internal Resources</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Placeholder hub for demo videos, RCMS notes, documents, and prototype links.
              </p>
            </button>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="font-semibold">Scenario Switcher</h3>
            <p className="mt-1 text-sm text-slate-500">
              Swap the Siam Branch dataset while preserving the same POS interface.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {demoScenarios.map((item) => (
                <button
                  className={`rounded-md border px-4 py-3 text-left text-sm font-semibold ${
                    scenario === item
                      ? "border-[#028FC1] bg-sky-50 text-[#027da9]"
                      : "border-slate-200 bg-white text-slate-800 hover:border-[#028FC1]"
                  }`}
                  key={item}
                  onClick={() => onScenarioChange(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="font-semibold">Seed Controls</h3>
            <p className="mt-1 text-sm text-slate-500">
              Use these controls to restore or reseed operational queues during stakeholder demos.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <PrimaryButton icon={<RotateCcw size={17} />} onClick={onReset}>Reset Demo Data</PrimaryButton>
              <SecondaryButton icon={<RotateCcw size={17} />} onClick={() => onScenarioChange(scenario)}>Generate Fresh Demo Data</SecondaryButton>
              <SecondaryButton icon={<ReceiptText size={17} />} onClick={onSeedTransactions}>Seed Transactions</SecondaryButton>
              <SecondaryButton icon={<User size={17} />} onClick={onSeedStudents}>Seed Students</SecondaryButton>
              <SecondaryButton icon={<QrCode size={17} />} onClick={onSeedPending}>Seed Pending Payments</SecondaryButton>
              <SecondaryButton icon={<PauseCircle size={17} />} onClick={onSeedSuspended}>Seed Suspended Sales</SecondaryButton>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold">Refund Approval</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Prototype-only control. Real approval may later route through Lark, then Accounting.
                </p>
              </div>
              <Badge tone="amber">{refundRequests.length} requests</Badge>
            </div>
            <div className="mt-4 space-y-3">
              {refundRequests.length > 0 ? (
                refundRequests.slice(0, 8).map((transaction) => (
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3" key={transaction.id}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <span>
                        <span className="block font-mono text-sm font-semibold">{transaction.id}</span>
                        <span className="mt-1 block text-sm text-amber-950">
                          {transaction.student} | {money(transaction.refund?.amount ?? transaction.total)}
                        </span>
                        <span className="mt-1 block text-xs text-amber-900">
                          {transaction.refund?.reason}
                        </span>
                      </span>
                      <span className="flex flex-wrap gap-2">
                        <PrimaryButton
                          className="min-h-9 bg-emerald-600 px-3 hover:bg-emerald-700"
                          icon={<CheckCircle2 size={15} />}
                          onClick={() => onRefundDecision(transaction, "approve")}
                        >
                          Approve
                        </PrimaryButton>
                        <SecondaryButton
                          className="min-h-9 px-3"
                          icon={<X size={15} />}
                          onClick={() => onRefundDecision(transaction, "reject")}
                        >
                          Reject
                        </SecondaryButton>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
                  No refund requests waiting for demo approval.
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="font-semibold">Siam Branch Dataset</h3>
            <div className="mt-4 grid gap-3 text-sm">
              <Info label="Students" value={`${students.length} realistic records`} />
              <Info label="Products" value={`${products.length} catalog items`} />
              <Info label="Transactions" value={`${transactions.length} seeded records`} />
              <Info label="Pending QR" value={`${pendingCount} records`} />
              <Info label="Voided" value={`${voidedCount} records`} />
              <Info label="Suspended Sales" value={`${suspendedSales.length} queue records`} />
            </div>
          </div>
          <div className="rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm text-sky-950">
            <h3 className="font-semibold">Branch Scope</h3>
            <p className="mt-2 leading-6">
              Demo data is generated only for Siam Branch. Other branches are intentionally unavailable in this prototype.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(initialTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>(initialTransactions[0]);
  const [suspendedSales, setSuspendedSales] = useState<SuspendedSale[]>(initialSuspendedSales);
  const [selectedSuspendedSale, setSelectedSuspendedSale] = useState<SuspendedSale>(initialSuspendedSales[0]);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState<DeliveryAddress | null>(null);
  const [discountApproval, setDiscountApproval] = useState<DiscountApproval | null>(null);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<{ productName: string; purchaseDate: string; receiptId: string } | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(favoriteProductIds);
  const [selectedBranch, setSelectedBranch] = useState(branchName);
  const [lastCatalogFilter, setLastCatalogFilter] = useState("Favorites");
  const [lastPaymentMethod, setLastPaymentMethod] = useState<PaymentMethod>("Cash");
  const [recentlyViewedProductIds, setRecentlyViewedProductIds] = useState<string[]>([]);
  const [saleNotice, setSaleNotice] = useState("");
  const [lastReceipt, setLastReceipt] = useState("RC-260706-0189");
  const [lastTotal, setLastTotal] = useState(0);
  const [receiptBackScreen, setReceiptBackScreen] = useState<Screen>("success");
  const [demoScenario, setDemoScenario] = useState<DemoScenario>("Normal Day");
  const pendingPayments = transactionHistory.filter((transaction) => transaction.status === "Pending Payment");
  const activePromotions = eligiblePromotions(activeStudent, cart);
  const recentlyViewedProducts = recentlyViewedProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
  const recentlySold = useMemo(() => recentSoldProducts(transactionHistory), [transactionHistory]);
  const recommendations = useMemo(() => {
    const cartProductIds = new Set(cart.map((line) => line.product.id));
    const hasMath = cart.some((line) => line.product.subject === "Math");
    const hasLiveClass = cart.some((line) => line.product.type === "Live Class");
    const hasDigital = cart.some((line) => line.product.type === "Digital Course");
    const suggestedIds = [
      ...(hasMath ? ["P-612", "P-207"] : []),
      ...(hasLiveClass ? ["P-318"] : []),
      ...(hasDigital ? ["P-404", "P-612"] : []),
    ];
    return suggestedIds
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product))
      .filter((product, index, self) => self.findIndex((item) => item.id === product.id) === index)
      .filter((product) => !cartProductIds.has(product.id));
  }, [cart]);

  function addToCart(product: Product) {
    const duplicate = duplicatePurchaseForStudent(transactionHistory, activeStudent, product);
    setDuplicateWarning(duplicate);
    setRecentlyViewedProductIds((current) => [
      product.id,
      ...current.filter((id) => id !== product.id),
    ].slice(0, 5));
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.lineId === existing.lineId ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [
        ...current,
        makeCartLine(product),
      ];
    });
  }

  function changeQuantity(lineId: string, direction: 1 | -1) {
    setCart((current) =>
      current.map((line) =>
        line.lineId === lineId
          ? { ...line, quantity: Math.max(1, line.quantity + direction) }
          : line,
      ),
    );
  }

  function startNewSale() {
    setActiveStudent(null);
    setCart([]);
    setSelectedDeliveryAddress(null);
    setDiscountApproval(null);
    setDuplicateWarning(null);
    setSaleNotice("");
    setScreen("home");
  }

  function selectStudentForSale(student: Student) {
    setActiveStudent(student);
    setSelectedDeliveryAddress(defaultDeliveryAddress(student));
    setDuplicateWarning(null);
    setSaleNotice("");
    setScreen("student-profile");
  }

  function suspendSale(reason: string, note: string) {
    if (!activeStudent || cart.length === 0) return;
    const suspended: SuspendedSale = {
      id: `SUS-${Date.now()}`,
      date: "6 Jul 2026",
      time: "14:32",
      student: activeStudent,
      cart,
      discountApproval,
      staff: staffName,
      reason,
      note,
      status: "Suspended",
    };
    setSuspendedSales((current) => [suspended, ...current]);
    setSelectedSuspendedSale(suspended);
    setActiveStudent(null);
    setCart([]);
    setSelectedDeliveryAddress(null);
    setDiscountApproval(null);
    setDuplicateWarning(null);
    setSuspendModalOpen(false);
    setSaleNotice(`Sale suspended for ${activeStudent.name}.`);
    setScreen("home");
  }

  function resumeSale(sale: SuspendedSale) {
    setActiveStudent(sale.student);
    setCart(sale.cart);
    setSelectedDeliveryAddress(defaultDeliveryAddress(sale.student));
    setDiscountApproval(sale.discountApproval);
    setDuplicateWarning(null);
    setSuspendedSales((current) => current.filter((item) => item.id !== sale.id));
    setSaleNotice("");
    setScreen("catalog");
  }

  function cancelSuspendedSale(sale: SuspendedSale) {
    setSuspendedSales((current) => current.filter((item) => item.id !== sale.id));
    setSaleNotice(`Suspended sale canceled for ${sale.student.name}.`);
    setScreen("suspended-sales");
  }

  function proceedFromCart() {
    if (!activeStudent || cart.length === 0) return;
    if (!activeStudent.isNew && cartHasPhysicalBooks(cart) && !selectedDeliveryAddress) {
      setSelectedDeliveryAddress(defaultDeliveryAddress(activeStudent));
      setScreen("delivery-info");
      return;
    }
    if (!activeStudent.isNew && cartHasPhysicalBooks(cart)) {
      setScreen("delivery-info");
      return;
    }
    setScreen("order-summary");
  }

  function completePayment(method: PaymentMethod) {
    if (!activeStudent || cart.length === 0) return;
    const totals = calculateTotals(cart, discountApproval?.amount ?? 0);
    const receiptNumber = `RC-260706-${String(190 + transactionHistory.length).padStart(4, "0")}`;
    const transaction: Transaction = {
      id: receiptNumber,
      time: "14:33",
      student: activeStudent.isNew ? `Walk-in: ${activeStudent.name}` : activeStudent.name,
      studentId: activeStudent.isNew ? undefined : activeStudent.id,
      grade: activeStudent.grade,
      phone: activeStudent.phone,
      staff: staffName,
      method,
      status: activeStudent.isNew ? "SMS sent" : "Paid",
      total: totals.total,
      items: cartToTransactionItems(cart),
      discountApproval: discountApproval ?? undefined,
      deliveryAddress: selectedDeliveryAddress,
      promotionNames: activePromotions,
    };
    setTransactionHistory((current) => [transaction, ...current]);
    setSelectedTransaction(transaction);
    setLastTotal(totals.total);
    setLastReceipt(receiptNumber);
    setScreen("success");
  }

  function createPendingPayment(method: PaymentMethod) {
    if (!activeStudent || cart.length === 0) return;
    const totals = calculateTotals(cart, discountApproval?.amount ?? 0);
    const receiptNumber = `RC-260706-${String(200 + transactionHistory.length).padStart(4, "0")}`;
    const transaction: Transaction = {
      id: receiptNumber,
      time: "14:34",
      student: activeStudent.isNew ? `Walk-in: ${activeStudent.name}` : activeStudent.name,
      studentId: activeStudent.isNew ? undefined : activeStudent.id,
      grade: activeStudent.grade,
      phone: activeStudent.phone,
      staff: staffName,
      method,
      status: "Pending Payment",
      total: totals.total,
      items: cartToTransactionItems(cart),
      discountApproval: discountApproval ?? undefined,
      deliveryAddress: selectedDeliveryAddress,
      promotionNames: activePromotions,
    };
    setTransactionHistory((current) => [transaction, ...current]);
    setSelectedTransaction(transaction);
    setSaleNotice(`QR payment generated for ${activeStudent.name}. Monitor it in Pending Payments.`);
    setScreen("pending-payments");
  }

  function completePendingPayment(transaction: Transaction) {
    const completedStatus: TransactionStatus = transaction.studentId ? "Paid" : "SMS sent";
    const completed = { ...transaction, status: completedStatus };
    setTransactionHistory((current) =>
      current.map((item) => (item.id === transaction.id ? completed : item)),
    );
    setSelectedTransaction(completed);
    setActiveStudent(studentFromTransaction(completed));
    setCart(
      completed.items
        .map((item) => {
          const product = productFromItem(item);
          return product ? makeCartLine(product, item.quantity, item.discount) : null;
        })
        .filter((line): line is CartLine => Boolean(line)),
    );
    setSelectedDeliveryAddress(completed.deliveryAddress ?? null);
    setLastTotal(completed.total);
    setLastReceipt(completed.id);
    setScreen("success");
  }

  function cancelPendingPayment(transaction: Transaction) {
    const cancelled = { ...transaction, status: "Cancelled" as TransactionStatus };
    setTransactionHistory((current) =>
      current.map((item) => (item.id === transaction.id ? cancelled : item)),
    );
    setSelectedTransaction(cancelled);
    setSaleNotice(`Pending payment cancelled for ${transaction.student}.`);
    setScreen("pending-payments");
  }

  function resumePendingPayment(transaction: Transaction) {
    const student = studentFromTransaction(transaction);
    setActiveStudent(student);
    setCart(
      transaction.items
        .map((item) => {
          const product = productFromItem(item);
          return product ? makeCartLine(product, item.quantity, item.discount) : null;
        })
        .filter((line): line is CartLine => Boolean(line)),
    );
    setSelectedDeliveryAddress(transaction.deliveryAddress ?? defaultDeliveryAddress(student));
    setDiscountApproval(transaction.discountApproval ?? null);
    setLastPaymentMethod("QR Payment");
    setScreen("payment");
  }

  function duplicateSale(transaction: Transaction) {
    const copiedCart = transaction.items
      .map((item) => {
        const product = productFromItem(item);
        return product ? makeCartLine(product, item.quantity, item.discount) : null;
      })
      .filter((line): line is CartLine => Boolean(line));
    setCart(copiedCart);
    setActiveStudent(null);
    setDiscountApproval(null);
    setSaleNotice("Duplicate sale draft created. Select or create the student before checkout.");
    setScreen("home");
  }

  function voidTransaction(transaction: Transaction) {
    const voided = { ...transaction, status: "Voided" as TransactionStatus };
    setSelectedTransaction(voided);
    setTransactionHistory((current) =>
      current.map((item) => (item.id === transaction.id ? voided : item)),
    );
    setScreen("transaction-detail");
  }

  function submitRefundRequest(transaction: Transaction, reason: string, note: string, managerPin: string) {
    if (!isRefundEligible(transaction)) return;
    const requestedAt = "6 Jul 2026, 14:42";
    const refundRequestedTransaction: Transaction = {
      ...transaction,
      status: "Refund Requested",
      refund: {
        status: "Refund Requested",
        originalStatus: transaction.status as CompletedTransactionStatus,
        reason,
        note: note.trim(),
        requestedBy: staffName,
        managerApproval: `PIN ${managerPin.slice(-2).padStart(managerPin.length, "*")}`,
        requestedAt,
        amount: transaction.total,
        activity: [
          {
            status: "Refund Requested",
            time: requestedAt,
            staff: staffName,
          },
        ],
      },
    };
    setSelectedTransaction(refundRequestedTransaction);
    setTransactionHistory((current) =>
      current.map((item) => (item.id === transaction.id ? refundRequestedTransaction : item)),
    );
    setSaleNotice(`Refund requested for ${transaction.id}.`);
    setScreen("transaction-detail");
  }

  function decideRefund(transaction: Transaction, decision: "approve" | "reject") {
    if (!transaction.refund || transaction.refund.status !== "Refund Requested") return;
    const nextStatus: RefundStatus =
      decision === "approve" ? "Refund Approved / Sent to Accounting" : "Refund Rejected";
    const decisionAt = decision === "approve" ? "6 Jul 2026, 14:49" : "6 Jul 2026, 14:51";
    const decisionNote =
      decision === "approve"
        ? "Refund request approved and handed over to Accounting."
        : "Refund request rejected in demo approval control.";
    const updated: Transaction = {
      ...transaction,
      status: decision === "approve" ? "Refund Approved / Sent to Accounting" : transaction.refund.originalStatus,
      refund: {
        ...transaction.refund,
        status: nextStatus,
        decisionBy: "Demo Approver",
        decisionAt,
        decisionNote,
        activity: [
          ...transaction.refund.activity,
          {
            status: nextStatus,
            time: decisionAt,
            staff: "Demo Approver",
            note: decisionNote,
          },
        ],
      },
    };
    setSelectedTransaction(updated);
    setTransactionHistory((current) =>
      current.map((item) => (item.id === transaction.id ? updated : item)),
    );
  }

  function applyDemoScenario(scenario: DemoScenario) {
    const dataset = buildDemoDataset(scenario);
    setDemoScenario(scenario);
    setTransactionHistory(dataset.transactions);
    setSuspendedSales(dataset.suspendedSales);
    setSelectedTransaction(dataset.transactions[0]);
    setSelectedSuspendedSale(dataset.suspendedSales[0]);
    setActiveStudent(null);
    setCart([]);
    setSelectedDeliveryAddress(null);
    setDiscountApproval(null);
    setDuplicateWarning(null);
    setSaleNotice(`${scenario} demo data loaded for Siam Branch.`);
  }

  function resetDemoData() {
    applyDemoScenario("Normal Day");
  }

  function seedTransactions() {
    const seeded = createDemoTransactions([], students, products, demoScenario);
    setTransactionHistory(seeded);
    setSelectedTransaction(seeded[0]);
    setSaleNotice(`${seeded.length} Siam Branch transactions seeded.`);
  }

  function seedPendingPayments() {
    const pending = createDemoTransactions([], students, products, "Heavy Branch Traffic")
      .filter((transaction) => transaction.status === "Pending Payment")
      .slice(0, 18);
    setTransactionHistory((current) => [...pending, ...current.filter((transaction) => transaction.status !== "Pending Payment")]);
    setSaleNotice(`${pending.length} pending QR payments seeded.`);
  }

  function seedSuspendedSales() {
    const seeded = createDemoSuspendedSales([], students, products, demoScenario);
    setSuspendedSales(seeded);
    setSelectedSuspendedSale(seeded[0]);
    setSaleNotice(`${seeded.length} suspended sale cases seeded.`);
  }

  const content = (() => {
    switch (screen) {
      case "home":
        return (
          <HomeScreen
            branch={selectedBranch}
            pendingPayments={pendingPayments}
            saleNotice={saleNotice}
            suspendedSales={suspendedSales}
            transactions={transactionHistory}
            onDashboard={() => setScreen("dashboard")}
            onExisting={() => setScreen("student-search")}
            onNew={() => setScreen("new-student")}
            onPendingPayments={() => setScreen("pending-payments")}
            onResumeSale={resumeSale}
            onSuspendedSales={() => setScreen("suspended-sales")}
            onTransactions={() => setScreen("transactions")}
          />
        );
      case "dashboard":
        return (
          <DashboardScreen
            suspendedSales={suspendedSales}
            transactions={transactionHistory}
            onBack={() => setScreen("home")}
            onPendingPayments={() => setScreen("pending-payments")}
            onSuspendedSales={() => setScreen("suspended-sales")}
            onTransactions={() => setScreen("transactions")}
          />
        );
      case "student-search":
        return (
          <StudentSearchScreen
            onBack={() => setScreen("home")}
            onSelect={selectStudentForSale}
          />
        );
      case "student-profile":
        return activeStudent ? (
          <StudentProfileScreen
            student={activeStudent}
            suspendedSales={suspendedSales}
            transactions={transactionHistory}
            onBack={() => setScreen("student-search")}
            onCatalog={() => setScreen("catalog")}
            onResumeSale={resumeSale}
          />
        ) : null;
      case "new-student":
        return (
          <NewStudentScreen
            onBack={() => setScreen("home")}
            onCreate={(student) => {
              setActiveStudent(student);
              setScreen("catalog");
            }}
          />
        );
      case "catalog":
        return (
          <CatalogScreen
            activeStudent={activeStudent}
            cart={cart}
            discountApproval={discountApproval}
            duplicateWarning={duplicateWarning}
            favoriteIds={favoriteIds}
            lastFilter={lastCatalogFilter}
            recentlyViewedProducts={recentlyViewedProducts}
            recentlySold={recentlySold}
            recommendations={recommendations}
            promotions={activePromotions}
            onAdd={addToCart}
            onClearDiscount={() => setDiscountApproval(null)}
            onFilterChange={setLastCatalogFilter}
            onPayment={proceedFromCart}
            onProfile={() => setScreen("student-profile")}
            onQty={changeQuantity}
            onRequestDiscount={() => setDiscountModalOpen(true)}
            onRemove={(lineId) => setCart((current) => current.filter((line) => line.lineId !== lineId))}
            onSuspend={() => setSuspendModalOpen(true)}
            onToggleFavorite={(productId) =>
              setFavoriteIds((current) =>
                current.includes(productId)
                  ? current.filter((id) => id !== productId)
                  : [...current, productId],
              )
            }
          />
        );
      case "delivery-info":
        return activeStudent ? (
          <DeliveryInfoScreen
            selectedAddress={selectedDeliveryAddress}
            student={activeStudent}
            onBack={() => setScreen("catalog")}
            onContinue={() => setScreen("order-summary")}
            onSelectAddress={setSelectedDeliveryAddress}
          />
        ) : null;
      case "order-summary":
        return (
          <OrderSummaryScreen
            activeStudent={activeStudent}
            cart={cart}
            deliveryAddress={selectedDeliveryAddress}
            discountApproval={discountApproval}
            promotions={activePromotions}
            onBack={() =>
              activeStudent && !activeStudent.isNew && cartHasPhysicalBooks(cart)
                ? setScreen("delivery-info")
                : setScreen("catalog")
            }
            onContinue={() => setScreen("payment")}
          />
        );
      case "payment":
        return (
          <PaymentScreen
            activeStudent={activeStudent}
            cart={cart}
            deliveryAddress={selectedDeliveryAddress}
            discountApproval={discountApproval}
            lastPaymentMethod={lastPaymentMethod}
            onBack={() => setScreen("order-summary")}
            onPaymentMethodChange={setLastPaymentMethod}
            onPendingPayment={createPendingPayment}
            onSuccess={completePayment}
          />
        );
      case "success":
        return (
          <SuccessScreen
            activeStudent={activeStudent}
            cart={cart}
            receiptId={lastReceipt}
            total={lastTotal}
            onNewSale={startNewSale}
            onProfile={() => setScreen("student-profile")}
            onReceiptPreview={() => {
              setReceiptBackScreen("success");
              setScreen("receipt-preview");
            }}
          />
        );
      case "receipt-preview":
        return (
          <ReceiptPreviewScreen
            activeStudent={activeStudent}
            cart={cart}
            deliveryAddress={selectedDeliveryAddress}
            receiptId={lastReceipt}
            transaction={selectedTransaction}
            total={lastTotal}
            onBack={() => setScreen(receiptBackScreen)}
            onStartNewSale={startNewSale}
          />
        );
      case "suspended-sales":
        return (
          <SuspendedSalesScreen
            suspendedSales={suspendedSales}
            onBack={() => setScreen("home")}
            onCancelSale={cancelSuspendedSale}
            onOpenDetail={(sale) => {
              setSelectedSuspendedSale(sale);
              setScreen("suspended-detail");
            }}
            onResumeSale={resumeSale}
          />
        );
      case "pending-payments":
        return (
          <PendingPaymentsScreen
            transactions={transactionHistory}
            onBack={() => setScreen("home")}
            onCancelPayment={cancelPendingPayment}
            onCompletePayment={completePendingPayment}
            onResumePayment={resumePendingPayment}
          />
        );
      case "suspended-detail":
        return (
          <SuspendedSaleDetailScreen
            sale={selectedSuspendedSale}
            onBack={() => setScreen("suspended-sales")}
            onCancelSale={cancelSuspendedSale}
            onResumeSale={resumeSale}
          />
        );
      case "transactions":
        return (
          <TransactionsScreen
            suspendedSales={suspendedSales}
            transactions={transactionHistory}
            onBack={() => setScreen("home")}
            onOpen={(transaction) => {
              setSelectedTransaction(transaction);
              setScreen("transaction-detail");
            }}
            onReceiptPreview={(transaction) => {
              setSelectedTransaction(transaction);
              setLastReceipt(transaction.id);
              setLastTotal(transaction.total);
              setReceiptBackScreen("transactions");
              setScreen("receipt-preview");
            }}
            onOpenSuspended={(sale) => {
              setSelectedSuspendedSale(sale);
              setScreen("suspended-detail");
            }}
          />
        );
      case "transaction-detail":
        return (
          <TransactionDetailScreen
            transaction={selectedTransaction}
            onBack={() => setScreen("transactions")}
            onDuplicate={() => duplicateSale(selectedTransaction)}
            onRefund={() => setScreen("refund-request")}
            onReceiptPreview={() => {
              setLastReceipt(selectedTransaction.id);
              setLastTotal(selectedTransaction.total);
              setReceiptBackScreen("transaction-detail");
              setScreen("receipt-preview");
            }}
            onVoid={() => setScreen("void-flow")}
          />
        );
      case "refund-request":
        return (
          <RefundRequestScreen
            transaction={selectedTransaction}
            onCancel={() => setScreen("transaction-detail")}
            onSubmit={(reason, note, managerPin) => submitRefundRequest(selectedTransaction, reason, note, managerPin)}
          />
        );
      case "void-flow":
        return (
          <VoidFlowScreen
            transaction={selectedTransaction}
            onCancel={() => setScreen("transaction-detail")}
            onComplete={() => voidTransaction(selectedTransaction)}
          />
        );
      case "demo-tools":
        return (
          <DemoToolsScreen
            scenario={demoScenario}
            suspendedSales={suspendedSales}
            transactions={transactionHistory}
            onBack={() => setScreen("home")}
            onInternalResources={() => setScreen("internal-resources")}
            onPresentation={() => setScreen("pos-strategy-presentation")}
            onRefundDecision={decideRefund}
            onReset={resetDemoData}
            onScenarioChange={applyDemoScenario}
            onSeedPending={seedPendingPayments}
            onSeedStudents={() => setSaleNotice(`${students.length} Siam Branch student records are already loaded.`)}
            onSeedSuspended={seedSuspendedSales}
            onSeedTransactions={seedTransactions}
          />
        );
      case "pos-strategy-presentation":
        return (
          <PosStrategyPresentationScreen
            onBack={() => setScreen("demo-tools")}
            onHome={() => setScreen("home")}
            onOpenDemo={() => setScreen("home")}
          />
        );
      case "internal-resources":
        return (
          <InternalResourcesScreen
            onBack={() => setScreen("demo-tools")}
            onHome={() => setScreen("home")}
            onPresentation={() => setScreen("pos-strategy-presentation")}
          />
        );
      default:
        return null;
    }
  })();

  return (
    <main className="min-h-screen bg-[#f5f7f9] text-slate-950 md:pb-10">
      <Header
        activeStudent={activeStudent}
        branch={selectedBranch}
        cartCount={cart.reduce((sum, line) => sum + line.quantity, 0)}
        pendingCount={pendingPayments.length}
        suspendedCount={suspendedSales.length}
        suspendedSales={suspendedSales}
        transactions={transactionHistory}
        onBranchChange={setSelectedBranch}
        onDashboard={() => setScreen("dashboard")}
        onDemoTools={() => setScreen("demo-tools")}
        onHome={startNewSale}
        onPendingPayments={() => setScreen("pending-payments")}
        onProductSelect={(product) => {
          addToCart(product);
          setSaleNotice(activeStudent ? "" : "Product added. Select or create a student before checkout.");
          setScreen(activeStudent ? "catalog" : "home");
        }}
        onStudentSelect={selectStudentForSale}
        onTransactionSelect={(transaction) => {
          setSelectedTransaction(transaction);
          setScreen("transaction-detail");
        }}
        onSuspendedSales={() => setScreen("suspended-sales")}
        onSuspendedSaleSelect={(sale) => {
          setSelectedSuspendedSale(sale);
          setScreen("suspended-detail");
        }}
        onTransactions={() => setScreen("transactions")}
      />
      {activeStudent && (screen === "catalog" || screen === "payment" || screen === "order-summary" || screen === "delivery-info") && (
        <StudentBanner student={activeStudent} />
      )}
      {content}
      {discountModalOpen && (
        <DiscountApprovalModal
          onApprove={(approval) => {
            setDiscountApproval(approval);
            setDiscountModalOpen(false);
          }}
          onCancel={() => setDiscountModalOpen(false)}
        />
      )}
      {suspendModalOpen && activeStudent && (
        <SuspendSaleModal
          activeStudent={activeStudent}
          cart={cart}
          onCancel={() => setSuspendModalOpen(false)}
          onSuspend={suspendSale}
        />
      )}
      <SystemStatus branch={selectedBranch} />
    </main>
  );
}

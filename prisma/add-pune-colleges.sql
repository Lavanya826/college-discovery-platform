PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO "College" (
  "id",
  "name",
  "city",
  "state",
  "type",
  "tuition",
  "acceptanceRate",
  "ranking",
  "imageUrl",
  "website",
  "description",
  "createdAt",
  "updatedAt"
) VALUES
(
  'zeal-engineering-pune',
  'Zeal College of Engineering and Research',
  'Pune',
  'Maharashtra',
  'PRIVATE',
  125000,
  0.7,
  NULL,
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a',
  'https://zcoer.in/',
  'Private engineering college in Narhe, Pune, offering undergraduate and postgraduate technical programs.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'coep-tech-pune',
  'COEP Technological University',
  'Pune',
  'Maharashtra',
  'PUBLIC',
  175000,
  0.08,
  8,
  'https://upload.wikimedia.org/wikipedia/commons/8/8d/Coep_extc.jpg',
  'https://www.coeptech.ac.in/',
  'Historic public technological university in Shivajinagar, Pune, known for engineering education and research.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO "Program" ("id", "name", "degree", "collegeId") VALUES
  ('zeal-cs', 'Computer Engineering', 'BE', 'zeal-engineering-pune'),
  ('zeal-ai', 'Artificial Intelligence and Data Science', 'BE', 'zeal-engineering-pune'),
  ('zeal-mech', 'Mechanical Engineering', 'BE', 'zeal-engineering-pune'),
  ('coep-cs', 'Computer Engineering', 'BTech', 'coep-tech-pune'),
  ('coep-civil', 'Civil Engineering', 'BTech', 'coep-tech-pune'),
  ('coep-mech', 'Mechanical Engineering', 'BTech', 'coep-tech-pune');

// db/users.js

// Records from the slide
var records = [
  {
    id: 1,
    username: 'westcliff',
    password: 'secret',
    displayName: 'WestCliff',
    emails: [{ value: 'west@example.com' }]
  },
  {
    id: 2,
    username: 'westcliffclass',
    password: 'birthday',
    displayName: 'WestCliff University',
    emails: [{ value: 'cliff@example.com' }]
  }
];

exports.findById = function (id, cb) {
  const record = records.find((r) => r.id === id);
  if (!record) {
    return cb(null, null);
  }
  return cb(null, record);
};

exports.findByUsername = function (username, cb) {
  const record = records.find((r) => r.username === username);
  if (!record) {
    return cb(null, null);
  }
  return cb(null, record);
};

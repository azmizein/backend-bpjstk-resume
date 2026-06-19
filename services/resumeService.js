const db = require('../config/db');

const createProfile = async (profileData) => {
  const {
    wantedJobTitle,
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    address,
    postalCode,
    drivingLicense,
    nationality,
    placeOfBirth,
    dateOfBirth
  } = profileData;

  const query = `
    INSERT INTO profiles (
      wantedJobTitle, firstName, lastName, email, phone, 
      country, city, address, postalCode, drivingLicense, nationality, 
      placeOfBirth, dateOfBirth
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    wantedJobTitle,
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    address,
    postalCode,
    drivingLicense,
    nationality,
    placeOfBirth,
    dateOfBirth
  ];

  const [result] = await db.execute(query, values);

  return result.insertId;
};


const updateProfile = async (id, profileData) => {
  const {
    wantedJobTitle,
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    address,
    postalCode,
    drivingLicense,
    nationality,
    placeOfBirth,
    dateOfBirth
  } = profileData;

  const query = `
    UPDATE profiles SET 
      wantedJobTitle = ?, firstName = ?, lastName = ?, email = ?, phone = ?, 
      country = ?, city = ?, address = ?, postalCode = ?, drivingLicense = ?, nationality = ?, 
      placeOfBirth = ?, dateOfBirth = ?
    WHERE id = ?
  `;

  const values = [
    wantedJobTitle,
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    address,
    postalCode,
    drivingLicense,
    nationality,
    placeOfBirth,
    dateOfBirth,
    id
  ];

  await db.execute(query, values);

  return id;
};

const getProfile = async (id) => {
  const query = `
    SELECT 
      id, wantedJobTitle, firstName, lastName, email, phone, 
      country, city, address, postalCode, drivingLicense, nationality, 
      placeOfBirth, dateOfBirth
    FROM profiles 
    WHERE id = ?
  `;
  
  const [rows] = await db.execute(query, [id]);
  
  if (rows.length === 0) {
    return null;
  }
  
  const profile = rows[0];
  
  // Format response exactly as requested
  return {
    profileCode: profile.id,
    wantedJobTitle: profile.wantedJobTitle,
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    country: profile.country,
    city: profile.city,
    address: profile.address,
    postalCode: profile.postalCode ? Number(profile.postalCode) : null,
    drivingLicense: profile.drivingLicense,
    nationality: profile.nationality,
    placeOfBirth: profile.placeOfBirth,
    dateOfBirth: profile.dateOfBirth,
    photoUrl: `/app/upload/photo/${profile.id}.png`
  };
};

const getAllProfiles = async () => {
  const query = `SELECT id, firstName, lastName FROM profiles ORDER BY created_at DESC`;
  const [rows] = await db.execute(query);
  return rows;
};

const updateWorkingExperience = async (id, experienceData) => {
  const { workingExperience } = experienceData;
  const query = `UPDATE profiles SET workingExperience = ? WHERE id = ?`;
  await db.execute(query, [workingExperience, id]);
  return workingExperience;
};

const getWorkingExperience = async (id) => {
  const query = `SELECT workingExperience FROM profiles WHERE id = ?`;
  const [rows] = await db.execute(query, [id]);
  
  if (rows.length === 0) {
    return null;
  }
  
  return rows[0];
};

const addEmployment = async (profileId, data) => {
  const { jobTitle, employer, startDate, endDate, city, description } = data;
  const query = `
    INSERT INTO employments (profile_id, jobTitle, employer, startDate, endDate, city, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [profileId, jobTitle, employer, startDate, endDate, city, description];
  const [result] = await db.execute(query, values);
  return result.insertId;
};

const editEmployment = async (id, data) => {
  const { jobTitle, employer, startDate, endDate, city, description } = data;
  const query = `
    UPDATE employments
    SET jobTitle = ?, employer = ?, startDate = ?, endDate = ?, city = ?, description = ?
    WHERE id = ?
  `;
  await db.execute(query, [jobTitle, employer, startDate, endDate, city, description, id]);
};

const deleteEmployment = async (id) => {
  const query = `DELETE FROM employments WHERE id = ?`;
  await db.execute(query, [id]);
};

const getEmployments = async (profileId) => {
  const query = `
    SELECT id, jobTitle, employer, startDate, endDate, city, description
    FROM employments
    WHERE profile_id = ?
    ORDER BY created_at ASC
  `;
  const [rows] = await db.execute(query, [profileId]);
  return rows;
};

const addEducation = async (profileId, data) => {
  const { school, degree, startDate, endDate, city, description } = data;
  const query = `
    INSERT INTO educations (profile_id, school, degree, startDate, endDate, city, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [profileId, school, degree, startDate, endDate, city, description];
  const [result] = await db.execute(query, values);
  return result.insertId;
};

const editEducation = async (id, data) => {
  const { school, degree, startDate, endDate, city, description } = data;
  const query = `
    UPDATE educations
    SET school = ?, degree = ?, startDate = ?, endDate = ?, city = ?, description = ?
    WHERE id = ?
  `;
  await db.execute(query, [school, degree, startDate, endDate, city, description, id]);
};

const deleteEducation = async (id) => {
  const query = `DELETE FROM educations WHERE id = ?`;
  await db.execute(query, [id]);
};

const getEducations = async (profileId) => {
  const query = `
    SELECT id, school, degree, startDate, endDate, city, description
    FROM educations
    WHERE profile_id = ?
    ORDER BY created_at ASC
  `;
  const [rows] = await db.execute(query, [profileId]);
  return rows;
};

const addSkill = async (profileId, data) => {
  const { skill, level } = data;
  const query = `
    INSERT INTO skills (profile_id, skill, level)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.execute(query, [profileId, skill, level]);
  return result.insertId;
};

const editSkill = async (id, data) => {
  const { skill, level } = data;
  const query = `
    UPDATE skills
    SET skill = ?, level = ?
    WHERE id = ?
  `;
  await db.execute(query, [skill, level, id]);
};

const deleteSkill = async (id) => {
  const query = `DELETE FROM skills WHERE id = ?`;
  await db.execute(query, [id]);
};

const getSkills = async (profileId) => {
  const query = `
    SELECT id, skill, level
    FROM skills
    WHERE profile_id = ?
    ORDER BY created_at ASC
  `;
  const [rows] = await db.execute(query, [profileId]);
  return rows;
};

module.exports = {
  createProfile,
  updateProfile,
  getProfile,
  getAllProfiles,
  updateWorkingExperience,
  getWorkingExperience,
  getEmployments,
  addEmployment,
  editEmployment,
  deleteEmployment,
  getEducations,
  addEducation,
  editEducation,
  deleteEducation,
  getSkills,
  addSkill,
  editSkill,
  deleteSkill
};

const db = require('./config/db');

const setupDatabase = async () => {
  try {
    const profileQuery = `
      CREATE TABLE IF NOT EXISTS profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        wantedJobTitle VARCHAR(255),
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        country VARCHAR(100),
        city VARCHAR(100),
        address TEXT,
        postalCode VARCHAR(20),
        drivingLicense VARCHAR(50),
        nationality VARCHAR(100),
        placeOfBirth VARCHAR(100),
        dateOfBirth VARCHAR(50),
        workingExperience TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;
    await db.execute(profileQuery);
    console.log('Table "profiles" created or already exists.');

    const employmentQuery = `
      CREATE TABLE IF NOT EXISTS employments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profile_id INT NOT NULL,
        jobTitle VARCHAR(255),
        employer VARCHAR(255),
        startDate VARCHAR(50),
        endDate VARCHAR(50),
        city VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
      );
    `;
    await db.execute(employmentQuery);
    console.log('Table "employments" created or already exists.');

    const educationQuery = `
      CREATE TABLE IF NOT EXISTS educations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profile_id INT NOT NULL,
        school VARCHAR(255),
        degree VARCHAR(255),
        startDate VARCHAR(50),
        endDate VARCHAR(50),
        city VARCHAR(100),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
      );
    `;
    await db.execute(educationQuery);
    console.log('Table "educations" created or already exists.');

    const skillQuery = `
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profile_id INT NOT NULL,
        skill VARCHAR(255) NOT NULL,
        level VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
      );
    `;
    await db.execute(skillQuery);
    console.log('Table "skills" created or already exists.');

    process.exit(0);
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
};

setupDatabase();

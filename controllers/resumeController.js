const resumeService = require('../services/resumeService');
const { successResponse, errorResponse } = require('../helpers/responseHelper');

const createProfile = async (req, res) => {
  try {
    const profileData = req.body;
    
    // Basic validation
    if (!profileData.firstName || !profileData.email) {
      return errorResponse(res, 'First name and email are required', 400);
    }

    const profileCode = await resumeService.createProfile(profileData);
    
    return successResponse(res, { profileCode }, 201);
  } catch (error) {
    console.error('Error creating profile:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const editProfile = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const profileData = req.body;
    
    // Basic validation
    if (!profileData.firstName || !profileData.email) {
      return errorResponse(res, 'First name and email are required', 400);
    }

    await resumeService.updateProfile(profileCode, profileData);
    
    // Use Number() to convert the parameter string back to a number
    return successResponse(res, { profileCode: Number(profileCode) }, 200);
  } catch (error) {
    console.error('Error updating profile:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const getProfile = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    
    const profile = await resumeService.getProfile(profileCode);
    
    if (!profile) {
      return errorResponse(res, 'Profile not found', 404);
    }
    
    return successResponse(res, profile, 200);
  } catch (error) {
    console.error('Error getting profile:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const data = await resumeService.getAllProfiles();
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error getting all profiles:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const fs = require('fs');
const path = require('path');

const uploadPhoto = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const { base64img } = req.body;
    
    if (!base64img) {
      return errorResponse(res, 'base64img is required', 400);
    }
    
    // Create directory if it doesn't exist
    const uploadDir = path.join(__dirname, '..', 'upload', 'photo');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Extract base64 data
    const matches = base64img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return errorResponse(res, 'Invalid base64 string', 400);
    }
    
    const imageBuffer = Buffer.from(matches[2], 'base64');
    const filePath = path.join(uploadDir, `${profileCode}.png`);
    
    fs.writeFileSync(filePath, imageBuffer);
    
    return successResponse(res, { profileCode: Number(profileCode) }, 200);
  } catch (error) {
    console.error('Error uploading photo:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const getPhoto = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const filePath = path.join(__dirname, '..', 'upload', 'photo', `${profileCode}.png`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Photo not found');
    }
    
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString('base64');
    
    res.send(`data:image/png;base64,${base64Image}`);
  } catch (error) {
    console.error('Error getting photo:', error);
    return res.status(500).send('Internal server error');
  }
};

const deletePhoto = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const filePath = path.join(__dirname, '..', 'upload', 'photo', `${profileCode}.png`);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    return successResponse(res, { profileCode: Number(profileCode) }, 200);
  } catch (error) {
    console.error('Error deleting photo:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const updateWorkingExperience = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const { workingExperience } = req.body;
    
    if (workingExperience === undefined) {
      return errorResponse(res, 'workingExperience is required', 400);
    }
    
    await resumeService.updateWorkingExperience(profileCode, req.body);
    
    // The user specifically requested this exact response format
    return successResponse(res, { profileCode: `update ${workingExperience}` }, 200);
  } catch (error) {
    console.error('Error updating working experience:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const getWorkingExperience = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const result = await resumeService.getWorkingExperience(profileCode);
    
    if (!result) {
      return errorResponse(res, 'Profile not found', 404);
    }
    
    return successResponse(res, { workingExperience: result.workingExperience }, 200);
  } catch (error) {
    console.error('Error getting working experience:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const getEmployments = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const data = await resumeService.getEmployments(profileCode);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error getting employments:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const addEmployment = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const id = await resumeService.addEmployment(profileCode, req.body);
    return res.status(201).json({ profileCode: Number(profileCode), id });
  } catch (error) {
    console.error('Error adding employment:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const editEmployment = async (req, res) => {
  try {
    const { id } = req.params;
    await resumeService.editEmployment(id, req.body);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error editing employment:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const deleteEmployment = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const id = req.query.id;
    
    if (!id) {
      return errorResponse(res, 'Employment id is required in query params', 400);
    }
    
    await resumeService.deleteEmployment(id);
    return res.status(200).json({ profileCode: Number(profileCode) });
  } catch (error) {
    console.error('Error deleting employment:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const getEducations = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const data = await resumeService.getEducations(profileCode);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error getting educations:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const addEducation = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const id = await resumeService.addEducation(profileCode, req.body);
    return res.status(201).json({ profileCode: Number(profileCode), id });
  } catch (error) {
    console.error('Error adding education:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const editEducation = async (req, res) => {
  try {
    const { id } = req.params;
    await resumeService.editEducation(id, req.body);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error editing education:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const deleteEducation = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const id = req.query.id;
    
    if (!id) {
      return errorResponse(res, 'Education id is required in query params', 400);
    }
    
    await resumeService.deleteEducation(id);
    return res.status(200).json({ profileCode: Number(profileCode) });
  } catch (error) {
    console.error('Error deleting education:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const getSkills = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const data = await resumeService.getSkills(profileCode);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error getting skills:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const addSkill = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const id = await resumeService.addSkill(profileCode, req.body);
    return res.status(201).json({ profileCode: Number(profileCode), id });
  } catch (error) {
    console.error('Error adding skill:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const editSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await resumeService.editSkill(id, req.body);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error editing skill:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

const deleteSkill = async (req, res) => {
  try {
    const profileCode = req.params.profileCode;
    const id = req.query.id;
    
    if (!id) {
      return errorResponse(res, 'Skill id is required in query params', 400);
    }
    
    await resumeService.deleteSkill(id);
    return res.status(200).json({ profileCode: Number(profileCode) });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
};

module.exports = {
  createProfile,
  editProfile,
  getProfile,
  getAllProfiles,
  uploadPhoto,
  getPhoto,
  deletePhoto,
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

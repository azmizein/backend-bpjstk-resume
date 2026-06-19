const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

// Profile endpoints
router.post('/api/profile', resumeController.createProfile);
router.put('/api/profile/:profileCode', resumeController.editProfile);
router.get('/api/profile/:profileCode', resumeController.getProfile);
router.get('/api/profile', resumeController.getAllProfiles);

// Photo endpoints  
router.put('/api/photo/:profileCode', resumeController.uploadPhoto);
router.get('/api/photo/:profileCode', resumeController.getPhoto);
router.delete('/api/photo/:profileCode', resumeController.deletePhoto);

// Working experience endpoints
router.put('/api/working-experience/:profileCode', resumeController.updateWorkingExperience);
router.get('/api/working-experience/:profileCode', resumeController.getWorkingExperience);

// Employment endpoints
router.post('/api/employment/:profileCode', resumeController.addEmployment);
router.get('/api/employment/:profileCode', resumeController.getEmployments);
router.put('/api/employment/edit/:id', resumeController.editEmployment);
router.delete('/api/employment/:profileCode', resumeController.deleteEmployment);

// Education endpoints
router.post('/api/education/:profileCode', resumeController.addEducation);
router.get('/api/education/:profileCode', resumeController.getEducations);
router.put('/api/education/edit/:id', resumeController.editEducation);
router.delete('/api/education/:profileCode', resumeController.deleteEducation);

// Skill endpoints
router.post('/api/skill/:profileCode', resumeController.addSkill);
router.get('/api/skill/:profileCode', resumeController.getSkills);
router.put('/api/skill/edit/:id', resumeController.editSkill);
router.delete('/api/skill/:profileCode', resumeController.deleteSkill);

module.exports = router;

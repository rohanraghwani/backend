const Admin = require('../models/Admin');

// GET admin phone number
exports.getAdminNumber = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    return res.status(200).json({
      success: true,
      phoneNumber: admin.phoneNumber
    });
  } catch (error) {
    console.error('Error fetching admin number:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching admin phone number',
      error: error.message
    });
  }
};



exports.updateAdminNumber = async (req, res) => {
  try {
    let { phoneNumber } = req.body;

    // Handle string 'null' as null
    if (phoneNumber === 'null') {
      phoneNumber = null;
    }

    // Update or create admin entry
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin({ phoneNumber });
    } else {
      admin.phoneNumber = phoneNumber;
    }

    await admin.save();

    return res.status(200).json({
      success: true,
      message: phoneNumber ? 'Admin phone number updated successfully' : 'Admin phone number cleared',
      phoneNumber: admin.phoneNumber
    });

  } catch (error) {
    console.error('Error updating admin number:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating admin phone number',
      error: error.message
    });
  }
};



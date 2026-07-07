const Contact = require("../models/Contact");

// Save Contact Message
const saveMessage = async (req, res) => {

    try {

        const contact = new Contact({

            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            subject: req.body.subject,
            message: req.body.message

        });

        await contact.save();

        // Return to the same page
        res.redirect(req.body.returnUrl + "?success=1");

    }

    catch (error) {

        console.log(error);

        res.redirect(req.body.returnUrl + "?error=1");

    }

};

module.exports = {

    saveMessage

};
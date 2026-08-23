import jwt from "jsonwebtoken";

const AdminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorized, login again"
            });
        }

        const token_decode = jwt.verify(
            token,
            process.env.JWT_Secrty
        );

        if (
            token_decode !==
            process.env.Admin_Email + process.env.AdminPassword
        ) {
            return res.json({
                success: false,
                message: "Not Authorized, login again"
            });
        }

        next();

    } catch (error) {
        console.log("AdminAuth error:", error.message);

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export default AdminAuth;
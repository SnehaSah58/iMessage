export async function checkAuth(req,res,next) {
    if(!req.user) {
        res.status(200).json({ message: "Unauthorized"});
}

    res.status(200).json(req.user);
}
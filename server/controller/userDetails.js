import getUserDetailsFromToken from "../helpers/getUsersDetailsFromToken.js"

const userDetailsController = {

    userDetails: (req, res) => {
        const token = req.cookies.token || ""
        const user = getUserDetailsFromToken(token)

        return res.json(user)
    }

}

export default userDetailsController
const { signUp, signIn, checkCookie } = require('../Service/user.service');

const signup = async (req, res) => {
    const regNo = req.body.regNo;
    const password = req.body.password;
    const name = req.body.name;
    const type = req.body.type || 'USER';

    if (!regNo || !password || !name) {
        res.json({
            error: 'regNo or password or name is missing'
        })
        return;
    }

    const userCreation = await signUp(regNo, password, name, type);
    res.status(201).json({
        ...userCreation
    })
    return;
}

const signin = async (req, res) => {
    const regNo = req.body.regNo;
    const password = req.body.password;

    if (!regNo || !password ) {
        res.json({
            error: 'regNo or password is missing'
        })
        return;
    }

    const getUser = await signIn(regNo, password);
    if (getUser.status) {
        res.cookie('authToken', getUser.authToken, { maxAge: 3600000 });
        res.status(200).json({
            ...getUser
        });
        return;
    }
    res.status(401).json({
        ...getUser
    });
    return;
    
}

const validateUser = async (req, res) => {
    const userId = res.locals.userId;

    const getUser = await checkCookie(userId);
    if (getUser.status) {
        res.cookie('authToken', getUser.authToken, { maxAge: 3600000 });
        res.status(200).json({
            ...getUser
        });
        return;
    }
    res.status(401).json({
        ...getUser
    });
    return;
    
}

module.exports = {
    signin,
    signup,
    validateUser
}
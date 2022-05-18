var pool = require('../../../models/dbconnection');
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {lookup} = require('geoip-lite');
const moment = require('moment-timezone');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwtDecode = require('jwt-decode');

let handleLogin = (email, password, ip) => {
    return new Promise(async (resolve, reject) => {
        //check email is exist or not
        let user = await findUserByEmail(email);
        if (user) {
            //check user account is active
            let activeUser = await findUserById(user.id)
            if (activeUser) {
                //compare password
                let _comparePassword = await comparePassword(password, activeUser)
                if (_comparePassword) {
                    //update the session
                    let _updateSession = await updateSessionData(activeUser, ip);
                    if (_updateSession) {
                        //create token
                        let _createToken = await createToken(activeUser);
                        if (_createToken) {
                            resolve({
                                code: 1,
                                message: 'Successfully loggedin',
                                data: _createToken
                            });
                        } else {
                            reject({
                                code:0,
                                message: 'Unable to generate your session'
                            })
                        }

                    } else {
                        reject({
                            code: 0,
                            message: 'Problem in updating session'
                        });
                    }
                } else {
                    reject({
                        code: 0,
                        message: 'Oops! Wrong Password'
                    })
                }
            } else {
                reject({
                    code: 0,
                    message: `This user - "${email}" account is deactivated`
                });
            }
        } else {
            reject({
                code: 0,
                message: `This user email "${email}" doesn't exist`
            });
        }
    });
};


let findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection((err0, connection) => {
                if (err0) {
                    reject(err0)
                } else {
                    connection.query(
                        ' SELECT * FROM `users` WHERE `username` = ?  ', email,
                        function (err1, rows) {
                            if (err1) {
                                connection.release();
                                reject(err1)
                            }
                            let user = rows[0];
                            connection.release();
                            resolve(user);
                        }
                    );
                }
            })
        } catch (err2) {
            reject(err2);
        }
    });
};

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection((err0, connection) => {
                if (err0) {
                    reject(err0)
                } else {
                    connection.query(
                        ' SELECT * FROM luftekin_luftapp.users WHERE id = ?  ', id,
                        function (err1, rows) {
                            if (err1) {
                                connection.release();
                                reject(err1)
                            }
                            if (rows[0].active) {
                                let user = rows[0];
                                connection.release();
                                resolve(user);
                            } else {
                                connection.release();
                                resolve(false);
                            }
                        }
                    );
                }
            })
        } catch (err2) {
            reject(err2);
        }
    });
};

let comparePassword = (password, activeUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(password, activeUser.encryptedPassword).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let updateSessionData = (activeUser, ip) => {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection((err0, connection) => {
                if (err0) {
                    reject(err0)
                } else {

                    const currentDate = moment(new Date()).tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
                    const currentDateDB = moment(activeUser.currentLoggedInDate).format('YYYY-MM-DD HH:mm:ss');
                    var query = "UPDATE luftekin_luftapp.users SET  lastLoggedInDate = '" + currentDateDB +
                        "', lastLoggedInIP = '" + activeUser.currentLoggedInIP + "', lastLoggedInLocation = '" +
                        activeUser.currentLoggedInLocation + "', currentLoggedInDate = '" + currentDate +
                        "', currentLoggedInIP = '" + ip + "', currentLoggedInLocation = '" +
                        JSON.stringify(lookup(ip)) + "' WHERE(id = '" + activeUser.id + "');"
                    connection.query(query, (err1, result) => {
                        if (err1) {
                            connection.release();
                            reject(err1)
                        } else {
                            if (result && result.affectedRows == 1) {
                                connection.release();
                                resolve(true)
                            } else {
                                connection.release();
                                resolve(false)
                            }
                        }
                    })


                }
            })


        } catch (e) {

        }
    })
}

let createToken = (activeUser) => {
    return new Promise((resolve, reject) => {
        try {
            var token = {
                token: jwt.sign({
                        email: activeUser.username,
                        userData: activeUser
                    },
                    process.env.JWT_SECRET, {
                        expiresIn: "50m"
                    }
                ),
            };
            resolve(token)
        } catch (error) {
            reject(error);
        }
    })
}

let checkAuth = (req, res, next) => {
    if (req.headers.authorization){
        var token = req.headers.authorization;
        const decoded = jwtDecode(token);
        next();
        // return decoded;
    } else {
        res.status(401).send('Un Authorized Access!')
    }
}

let userLoggedIn = (req) => {
    if (req.headers.authorization) {
    var token = req.headers.authorization;
    const decoded = jwtDecode(token);
    return decoded;
    } else { return null};
}

module.exports = {
    handleLogin: handleLogin,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    comparePassword: comparePassword,
    checkAuth: checkAuth,
    userLoggedIn: userLoggedIn
};
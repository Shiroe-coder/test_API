const passport = require("passport"); 
const LocalStratery = require("passport-local").Strategy;
const JwtStratery = require("passport-jwt").Strategy;
const User = require("../model/User");

passport.use(
    new LocalStratery((user,pass,done) =>{
        User.findOne({user}, (err,user) =>{
            if (err) return done(err);
            if (!user) return done(null,false);
            user.comparePassword(passport,done)
        })
    })
)


const cookiesExtractor = (req) => {
    let token = null
    if(req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

passport.use(
    new JwtStratery({
        jwtFromRequest: cookiesExtractor,
        secretOrKey: "hoangan",
    },
    (payload, done) =>{
        User.findById({_id:payload.sub},(err,user) =>{
            if(err) return done(err, false);
            if(user) return done(null,user);
            else return done(null,false)
        })
    }
    )
)


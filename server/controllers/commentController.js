const { CardBody } = require('react-bootstrap');
const db = require('../db_config.js');
const bcrypt = require('bcryptjs');


const comment = {
    getComments: async (req, res, next) => {
        try {
          //TODO check if and how front end is sending showID to back end
          //const showId = req.body.show_id
          const showId = req.query.showId;
          
          const result = await db.any('SELECT userName, show_id, body, episode_number, season_number from comments WHERE show_id = $1', [showId]);

          res.locals.comments = result;
          


          return next();
        } catch (err) {
          const errObj = {
            log: `get comments failed: ${err}`,
            message: { err: 'get comments failed, check server log for details' },
          };
          return next(errObj);
        }
      },

    addComment: async (req, res,next) => {
      try {
        console.log("req.body.commentInfo", req.body.commentInfo);
        const {body , show_id, season, episode} = req.body.commentInfo;
        //const userId = req.cookies.ssid;
        //for testing postman
        const userId = "15e72508-cdee-4039-8a96-313b601b20fd";
        //console.log("userId", userId);

        const userName = await db.one(`SELECT username FROM users WHERE id = $1`, [userId]);

        const newComment = await db.none(`INSERT into comments (user_id, username, show_id, body, episode_number, season_number) VALUES ($1, $2, $3, $4, $5, $6)`,
          [userId, userName, show_id, body, episode, season]
        );

        
        


        return next();
      } catch (err) {
        const errObj = {
          log: `add comment failed: ${err}`,
          message: { err: 'add comment failed, check server log for details' },
        };
        return next(errObj);
      }


    }
};

module.exports = comment;
/*This file defines the postgres purposeful test database table structure */

var Sequelize = require("./pg_database.js").Sequelize;
var db = require("./pg_database.js").db;
var VERBOSE = require("./pg_database.js").VERBOSE;


const User = db.define('users', {
		id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
		name: {type: Sequelize.STRING, allowNull: false}, 
		email: {type: Sequelize.STRING, allowNull: false, unique: true},
		password: {type: Sequelize.STRING, allowNull: false},
	},
	{
		//remove password field when returning from query
	  	instanceMethods: {
		    toJSON: () => {
		      var return_vals = Object.assign({}, this.get());
		      delete return_vals.password;
		      return return_vals;
		    }
		}
	}
  }
);


const Interest = db.define('interests', {
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
	interest: {type: Sequelize.STRING, allowNull: false}, 
});


const Skill = db.define('skills', {
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
	name: {type: Sequelize.STRING, allowNull: false, unique: true}, 
	level: {type: Sequelize.STRING},
});


const Mentorship = db.define('mentorships', {
	id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
});
/* the foreignKey values are intentionally switched, though this may seem incorrect.
* otherwise the accessors auto-generated by Sequelize (user.getMentors() and user.getMentees()) 
* store keys in the opposite of what we expect. 
*/
User.belongsToMany(User, { through: Mentorship, as: "Mentors", foreignKey: "mentee_uid"});
User.belongsToMany(User, { through: Mentorship, as: "Mentees", foreignKey: "mentor_uid"});


const User_Skill_Map = db.define('user_skill_map', {
	level: {type: Sequelize.STRING}
});
User.belongsToMany(Skill, { through: User_Skill_Map });
Skill.belongsToMany(User, { through: User_Skill_Map });


const User_Inter_Map = db.define('user_inter_map', {
});
User.belongsToMany(Interest, { through: User_Inter_Map });
Interest.belongsToMany(User, { through: User_Inter_Map });


const db_tables = {
	Users: User,
	Skills: Skill,
	Interests: Interest, 
	Mentorships: Mentorship,
	User_Skill_Map: User_Skill_Map,
	User_Inter_Map: User_Inter_Map,
};


module.exports = {db_tables, VERBOSE};


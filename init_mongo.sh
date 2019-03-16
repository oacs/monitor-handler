mongo--"$MONGO_DB" << EOF
var user = 'admin';
var passwd = 'pass';
var admin = db.getSiblingDB('admin');
admin.auth(user, passwd);
db.createUser({
    user: user,
    pwd: passwd,
    roles: ["readWrite"]
});
EOF
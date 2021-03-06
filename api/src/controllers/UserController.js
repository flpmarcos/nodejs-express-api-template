const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    async welcome(req,res){
      res.status(200).send("Welcome 🙌 ");
    },

    async index(req, res){
        /* #swagger.tags = ['User']
        #swagger.description = 'Endpoint para adicionar um usuário.' */

        /* #swagger.parameters['newUser'] = {
                in: 'body',
                description: 'Informações do usuário.',
                required: true,
                type: 'object',
                schema: { $ref: "#/definitions/AddUser" }
        } */

        const newUser = req.body

        if (true) {
            // #swagger.responses[201] = { description: 'Usuário registrado com sucesso!' }
            return res.status(201).send(data)
        }
        return res.status(500)    // #swagger.responses[500]
        // const { page = 1 } = req.query;
        // const products = await Product.paginate({}, { page, limit : 10});
        // return res.json(products);
    },   


    async show(req, res){
        // #swagger.tags = ['User']
        // #swagger.description = 'Endpoint para obter um usuário.'
        // #swagger.parameters['id'] = { description: 'ID do usuário.' }

        /* #swagger.parameters['filtro'] = {
                description: 'Um filtro qualquer.',
                type: 'string'
        } */
        const filtro = req.query.filtro

        if(false)
            return res.status(404).send(false)
    
        /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/User" },
                description: 'Usuário encontrado.' 
        } */
        
        // return res.status(200).send(data)
        // const product = await Product.findById(req.params.id);
        // return res.json(product);
    },


    async login(req, res){
        // Our login logic starts here
        try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here
    },


    async register(req, res){
        console.log(process.env.TOKEN_KEY);
        // Our register logic starts here
        try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here
    },


};

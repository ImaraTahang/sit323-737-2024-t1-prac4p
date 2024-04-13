const express= require("express");
const res = require("express/lib/response");
const app= express();
const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
const add= (n1,n2) => {
    return n1+n2;
}
app.get("/add", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    
    logger.info('Parameters '+n1+' and '+n2+' received for addition');
    const result = add(n1,n2);
    res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});

app.get("/subtract", (req, res) => {
  try {
      const n1 = parseFloat(req.query.n1);
      const n2 = parseFloat(req.query.n2);
      if (isNaN(n1)) {
          logger.error("n1 is incorrectly defined");
          throw new Error("n1 incorrectly defined");
      }
      if (isNaN(n2)) {
          logger.error("n2 is incorrectly defined");
          throw new Error("n2 incorrectly defined");
      }

      logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for subtraction');
      const result = n1 - n2;
      res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
      logger.error(error.toString());
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/multiply", (req, res) => {
  try {
      const n1 = parseFloat(req.query.n1);
      const n2 = parseFloat(req.query.n2);
      if (isNaN(n1)) {
          logger.error("n1 is incorrectly defined");
          throw new Error("n1 incorrectly defined");
      }
      if (isNaN(n2)) {
          logger.error("n2 is incorrectly defined");
          throw new Error("n2 incorrectly defined");
      }

      logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for multiplication');
      const result = n1 * n2;
      res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
      logger.error(error.toString());
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/divide", (req, res) => {
  try {
      const n1 = parseFloat(req.query.n1);
      const n2 = parseFloat(req.query.n2);
      if (isNaN(n1)) {
          logger.error("n1 is incorrectly defined");
          throw new Error("n1 incorrectly defined");
      }
      if (isNaN(n2)) {
          logger.error("n2 is incorrectly defined");
          throw new Error("n2 incorrectly defined");
      }
      if (n2 === 0) {
          logger.error("Division by zero is not allowed");
          throw new Error("Division by zero is not allowed");
      }

      logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for division');
      const result = n1 / n2;
      res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
      logger.error(error.toString());
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

//Additional operations for 4.1C

app.get("/exponentiate", (req, res) => {
    try {
        const base = parseFloat(req.query.base);
        const exponent = parseFloat(req.query.exponent); // Change variable name to exponent
        if (isNaN(base)) {
            logger.error("Base is incorrectly defined");
            throw new Error("Base incorrectly defined");
        }
        if (isNaN(exponent)) {
            logger.error("Exponent number is incorrectly defined");
            throw new Error("Exponent number incorrectly defined");
        }
  
        logger.info('Base ' + base + ' and exponent ' + exponent + ' received for exponentiation');
        const result = Math.pow(base, exponent);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
  });

app.get("/sqrt", (req, res) => {
    try {
        const num = parseFloat(req.query.num);
        if (isNaN(num)) {
            logger.error("Number is incorrectly defined");
            throw new Error("Number incorrectly defined");
        }
        if (num < 0) {
            logger.error("Cannot find square root of a negative number");
            throw new Error("Cannot find square root of a negative number");
        }

        logger.info('Square root of ' + num+' recieved');
        const result = Math.sqrt(num);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

app.get("/modulo", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        if (n2 === 0) {
            logger.error("Cannot be divided by zero");
            throw new Error("Cannot be divided by zero");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for modulo operation');
        const result = n1 % n2;
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port"+port);
})


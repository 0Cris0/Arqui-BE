const { Op } = require("sequelize");
const Stock = require('../models/stock');
//const db = require('../util/database');

// Controles CRUD

// Obtener todos los stocks
exports.getStocks = (req, res, next) =>{
    let page = req.query.page;
    let count = req.query.count;
    if(page == undefined || page < 1){
        page = 1
    }
    if(count == undefined){
        count = 25
    }

    Stock.findAll({
        limit: count,
        offset: count*(page-1)
    })
    .then(stocks=>{
        res.status(200).json({ stocks: stocks });
    })
    .catch(err => console.log(err));
}

// Obtener un stock en base a su id
exports.getStock = (req, res, next) =>{
    const stockId = req.params.stockId;
    Stock.findByPk(stockId)
    .then(stock=>{
        if(!stock){
            return res.status(404).json({
                message: "Stock no encontrado"
            });
        }
        res.status(200).json({ stock: stock});
    })
    .catch(err => console.log(err));
}

// Obtener stocks en base a su symbol
exports.getStockBySymbol = (req, res, next) =>{
    const symbol = req.params.symbol;
    let page = req.query.page;
    let count = req.query.count;
    if(page == undefined || page < 1){
        page = 1
    }
    if(count == undefined){
        count = 25
    }

    let price = req.query.price;
    let quantity = req.query.quantity;
    let date = req.query.date;
    // Caso ninguno
    if(price == undefined && quantity == undefined && date == undefined){
        Stock.findAll(
            {
            where: {
              symbol: symbol,
            },
            limit: count,
            offset: count*(page-1)
          })
        .then(stocks=>{
            if(!stocks){
                return res.status(404).json({
                    message: `No hay stocks asociados al symbol: ${symbol}`
                });
            }
            res.status(200).json({ stocks: stocks});
        })
        .catch(err => console.log(err));
    }
    else{
        Stock.findAll(
            {
            where: condicion_filtros(req),
            limit: count,
            offset: count*(page-1)
          })
        .then(stocks=>{
            if(!stocks){
                return res.status(404).json({
                    message: `No hay stocks asociados al symbol: ${symbol}`
                });
            }
            res.status(200).json({ stocks: stocks});
        })
        .catch(err => console.log(err));

        function condicion_filtros(req){
            condiciones = {};
            condiciones.symbol = symbol;
            if(price){
                condiciones.price = {
                    [Op.lt]: price
                };
            }
            if(quantity){
                condiciones.quantity = {
                    [Op.lte]: quantity
                };
            }
            if(date){
                let pedazos =  date.split("-");
                let formatted_date = `${pedazos[2]}-${pedazos[1]}-${pedazos[0]}`
                condiciones.date = formatted_date;
            }
            return condiciones;
        }
    }
}

// Crear un stock
exports.createStock = (req, res, next) =>{
    const symbol = req.body.symbol;
    const price = req.body.price;
    const shortName = req.body.shortName;
    const longName = req.body.longName;
    const quantity = req.body.quantity;
    const timestamp = req.body.timestamp;
    Stock.create({
        symbol: symbol,
        price: price,
        shortName: shortName,
        longName: longName,
        quantity: quantity,
        timestamp: timestamp,
        date: timestamp
    })
    .then(result=>{
        console.log("Stock ha sido creado");
        res.status(201).json({
            message: "Stock creado correctamente",
            stock: result 
        });
    })
    .catch(err => console.log(err));
}

// Actualizar un stock
exports.updateStock = (req, res, next) =>{
    const stockId = req.params.stockId;
    const neo_symbol = req.body.symbol;
    const neo_price = req.body.price;
    const neo_shortName = req.body.shortName;
    const neo_longName = req.body.longName;
    const neo_quantity = req.body.quantity;
    const neo_timestamp = req.body.timestamp;
    Stock.findByPk(stockId)
    .then(stock=>{
        if(!stock){
            return res.status(404).json({
                message: "Stock no encontrado"
            });
        }
        stock.symbol = neo_symbol;
        stock.price = neo_price;
        stock.shortName = neo_shortName;
        stock.longName = neo_longName;
        stock.quantity = neo_quantity;
        stock.timestamp = neo_timestamp;
        return stock.save();
    })
    .then(result=>{
        res.status(200).json({ 
            message: "Stock actualizado",
            stock: result});
    })
    .catch(err => console.log(err));
}
// Eliminar un stock
exports.deleteStock = (req, res, next) =>{
    const stockId = req.params.stockId;
    Stock.findByPk(stockId)
    .then(stock=>{
        if(!stock){
            return res.status(404).json({
                message: "Stock no encontrado"
            });
        }
        return Stock.destroy({
            where:{
                id: stockId
            }
        });
    })
    .then(result=>{
        res.status(200).json({ 
            message: "Stock borrada"
        });
    })
    .catch(err => console.log(err));
}
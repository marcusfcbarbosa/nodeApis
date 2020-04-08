'use strict';

exports.post = ('/',(req,res,next)=> {
    res.status(201).send(req.body);
});

exports.put = ('/:id',(req,res,next)=> {
    const id = req.params.id;
    res.status(201).send({
        id:id,
        item:req.body
    });
});

exports.delete = ('/:id',(req,res,next)=> {
    const id = req.params.id;
    res.status(201).send({
        id:id,
        item:'delete'
    });
});


import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());

app.get('/produto', async (req, resp) => {
    try{
        let r = await db.tb_produto.findAll({order: [[ 'id_produto', 'desc' ]] });
        resp.send(r);
    } catch(e) {
        resp.send(e.toString);
    }
})

app.post('/produto', async (req, resp) => {
    try{ 
        let { nome, categoria, precoDE, precoPOR, avaliacao, dsproduto, estoque, imgproduto } = req.body;
        let produtoOK = await db.tb_produto.findOne({ where: { nm_produto: nome}})
        if(produtoOK !== null)
            return resp.send({ erro: '⚠️ Produto já existe no sistema'})
        
        let r = await db.tb_produto.create({
            nm_produto: nome,
            ds_categoria: categoria,
            vl_preco_de: precoDE,
            vl_preco_por: precoPOR,
            vl_avaliacao: avaliacao,
            ds_produto: dsproduto,
            qtd_estoque: estoque,
            img_produto: imgproduto,
            bt_ativo: 1,
            dt_inclusao: new Date()
        });
        resp.send(r);
    } catch(e) {
        resp.send({erro: "Deu erro"})
    }
})

app.put('/produto/:id', async (req, resp) =>{

    let {id} = req.params;
    let { nome, categoria, precoDE, precoPOR, avaliacao, dsproduto, estoque, imgproduto, ativo, inclusao } = req.body;
    try{

        let r = await db.tb_produto.update(
        { 
                nm_produto: nome,
                ds_categoria: categoria,
                vl_preco_de: precoDE,
                vl_preco_por: precoPOR,
                vl_avaliacao: avaliacao,
                ds_produto: dsproduto,
                qtd_estoque: estoque,
                img_produto: imgproduto,
                bs_ativo: 1,
                dt_inclusao: new Date()
        },
        {
                where: { id_produto: id}
        });
   
            resp.sendStatus(200);
        } catch (e) {
            resp.send({ erro: e.toString() })
        }

})

app.delete('/produto/:id', async (req, resp) => {
    try{
        let {id} = req.params;

        let r = await db.tb_produto.destroy({ where: { id_produto: id }  })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})



app.listen(process.env.PORT,

x => console.log(`Server up at port ${process.env.PORT}`))
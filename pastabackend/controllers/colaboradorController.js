
const db = require('../db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM colaboradores', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { nome, cpf, email, telefone, cargo } = req.body;
  db.query(
    'INSERT INTO colaboradores (nome, cpf, email, telefone, cargo) VALUES (?, ?, ?, ?, ?)',
    [nome, cpf, email, telefone, cargo],
    err => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Colaborador adicionado' });
    }
  );
};

exports.update = (req, res) => {
  const { nome, cpf, email, telefone, cargo } = req.body;
  db.query(
    'UPDATE colaboradores SET nome=?, cpf=?, email=?, telefone=?, cargo=? WHERE id=?',
    [nome, cpf, email, telefone, cargo, req.params.id],
    err => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Colaborador atualizado' });
    }
  );
};

exports.remove = (req, res) => {
  db.query('DELETE FROM colaboradores WHERE id=?', [req.params.id], err => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Colaborador removido' });
  });
};

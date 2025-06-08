import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [colaboradores, setColaboradores] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cargo: '',
    telefone: '',
    cpf: '',
  });
  const [editandoId, setEditandoId] = useState(null);

  const [termoBusca, setTermoBusca] = useState('');
  const [campoBusca, setCampoBusca] = useState('nome');

  useEffect(() => {
    loadColaboradores();
  }, []);

  const loadColaboradores = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/colaboradores');
      setColaboradores(res.data);
    } catch (err) {
      console.error('Erro ao carregar colaboradores:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`http://localhost:3001/api/colaboradores/${editandoId}`, formData);
        setEditandoId(null);
      } else {
        await axios.post('http://localhost:3001/api/colaboradores', formData);
      }
      setFormData({ nome: '', email: '', cargo: '', telefone: '', cpf: '' });
      loadColaboradores();
    } catch (err) {
      console.error('Erro ao salvar colaborador:', err);
    }
  };

  const handleEdit = (colab) => {
    setFormData({
      nome: colab.nome,
      email: colab.email,
      cargo: colab.cargo,
      telefone: colab.telefone,
      cpf: colab.cpf,
    });
    setEditandoId(colab.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/colaboradores/${id}`);
      loadColaboradores();
    } catch (err) {
      console.error('Erro ao excluir colaborador:', err);
    }
  };

  const colaboradoresFiltrados = colaboradores.filter((colab) =>
    colab[campoBusca]?.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{editandoId ? 'Editar' : 'Cadastrar'} Colaborador</h2>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" className="form-control" required />
        </div>
        <div className="col-md-6">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="form-control" required />
        </div>
        <div className="col-md-6">
          <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Cargo" className="form-control" required />
        </div>
        <div className="col-md-6">
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" className="form-control" required />
        </div>
        <div className="col-md-6">
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" className="form-control" required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">
            {editandoId ? 'Atualizar' : 'Cadastrar'}
          </button>
        </div>
      </form>

      <h3 className="mt-5">Lista de Colaboradores</h3>

      <div className="row mb-3">
        <div className="col-md-3">
          <select className="form-select" value={campoBusca} onChange={(e) => setCampoBusca(e.target.value)}>
            <option value="nome">Nome</option>
            <option value="email">Email</option>
            <option value="cargo">Cargo</option>
            <option value="telefone">Telefone</option>
            <option value="cpf">CPF</option>
          </select>
        </div>
        <div className="col-md-9">
          <input
            type="text"
            placeholder={`Pesquisar por ${campoBusca}...`}
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      <ul className="list-group">
        {colaboradoresFiltrados.map(colab => (
          <li key={colab.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{colab.nome}</strong> | {colab.email} | {colab.cargo} | {colab.telefone} | {colab.cpf}
            </div>
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(colab)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(colab.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

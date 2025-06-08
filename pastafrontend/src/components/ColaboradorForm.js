
import React from 'react';

const ColaboradorForm = ({ formData, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} style={{ maxWidth: '600px', margin: '1rem auto' }}>
    <div className="row mb-2">
      <div className="col">
        <input
          className="form-control"
          placeholder="Nome completo"
          name="nome"
          value={formData.nome}
          onChange={onChange}
          required
        />
      </div>
      <div className="col">
        <input
          className="form-control"
          placeholder="CPF"
          name="cpf"
          type="text"
          value={formData.cpf}
          onChange={onChange}
          required
        />
      </div>
    </div>
    <div className="row mb-2">
      <div className="col">
        <input
          className="form-control"
          placeholder="E‑mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>
      <div className="col">
        <input
          className="form-control"
          placeholder="Cargo"
          name="cargo"
          value={formData.cargo}
          onChange={onChange}
          required
        />
      </div>
      <div className="col">
        <input
          className="form-control"
          placeholder="Telefone"
          name="telefone"
          type="text"
          value={formData.telefone}
          onChange={onChange}
          required
        />
      </div>
    </div>
    <button className="btn btn-success" type="submit">
      Salvar
    </button>
  </form>
);

export default ColaboradorForm;

// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import {
  Title,
  Form,
  Repositories,
  Error,
} from './styles';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  // eslint-disable-next-line camelcase
  full_name: string;
  owner: {
    login: string;
    // eslint-disable-next-line camelcase
    avatar_url: string;
    description: string;
  };
}

// eslint-disable-next-line arrow-body-style
const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  // eslint-disable-next-line
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    } return [];
  });

  // Permitir disparar uma função quando a variável repositories mudar
  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Digite autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca desse repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          placeholder="Digite o nome do repositório"
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      { inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.owner.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};
export default Dashboard;

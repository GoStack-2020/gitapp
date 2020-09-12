/* eslint-disable no-use-before-define */
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';
import logoImg from '../../assets/logo.svg';


// eslint-disable-next-line arrow-body-style
const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/15816672?s=460&u=71fca47aae76a640d7b38ac1dc1e9515021d7205&v=4"
            alt="Indiara Duarte"
          />
          <div>
            <strong>rocketseat</strong>
            <p>jdnasjdnsajkdnsajdn</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};
export default Dashboard;

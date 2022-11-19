import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isTemplateExpression } from 'typescript';
import logo from '../../assets/logo.svg'
import { api } from '../../services/api';
import {Title, Formulario, Repo} from './styles'

export const DashBoard: React.FC = () => {
    // cria uma interface que contém os campos de um repositório no git
    interface IGithubRepository {
        full_name: string;
        description: string;
        owner: {
            login: string;
            avatar_url: string
        }
    }
    // cria um estado (variável) que representa um novo repositório
    const [novoRepo, setNovoRepo] = useState('')
    // cria uma lista de repositórios vazia
    const [repos, setRepos] = useState<IGithubRepository[]>([])

    // função executada quando usuários digita na caixa de texto
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void{
        setNovoRepo(event.target.value)
    }

    // função executada quando usuário pressiona o botão
    async function handleAddRepo(event: React.FormEvent<HTMLFormElement>, ): Promise<void> {
        // não atualiza a página
        event.preventDefault()
        console.log(`Entrou`)
        // chama a api
        try {
            const resp = await api.get<IGithubRepository>(`repos/${novoRepo}`)
            const aux = resp.data
            console.log(aux)
            setRepos([...repos, aux])
        }
        catch{
            console.log(`Repositório não encontrado`)
        }
    }

    return (
         <> 
            <img src={logo} alt="Git Collection"/>
            <Title> Catálogo de repositórios </Title>
            <Formulario onSubmit={handleAddRepo}>
                <input onChange={handleInputChange} placeholder="username/nome_repo"/>
                <button type="submit"> Buscar </button>
            </Formulario>
            {/* lista os repositórios contidos no vetor repos*/}
            <Repo>
                { repos.map( (item, indice) => (
                        //o fullname do repositório terá a troca da / por -
                        // isso é preciso para não dar problema na rota, pois full_name tem /
                        <Link 
                            to={`/repositories/${item.full_name.replace("/", "-")}`}
                            key={item.full_name + indice}>
                            <img src={item.owner.avatar_url} alt={item.owner.login}/>
                            <div>
                                <strong> {item.full_name}</strong>
                                <p> {item.description} </p>
                            </div>
                        </Link>
                    ))
                }    
            </Repo>
         </>
    )
}   
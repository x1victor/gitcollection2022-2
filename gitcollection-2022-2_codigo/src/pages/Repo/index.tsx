import React from 'react'
import { Link, useParams } from "react-router-dom"
import { api } from '../../services/api';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import {Header, RepoInfo, Issue} from './styles'

{/* tipo de dado para guardar dados do repositório */}
interface GithubRepository {
    full_name: string;
    description: string;
    forks_count: number;
    open_issues_count: number;
    stargazers_count: number;
    owner:{
        login: string;
        avatar_url:string;
    }
}

{/* tipo de dado para guardar issues do repositório */}
interface GithubIssue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string
    }
}

{/* tipo de dado para guardar o nome do repositório vindo na rota */}
interface RepositoryParams {
    repository: string;
}

export const Repo: React.FC = () => {

    // recupera o conteúdo da rota depois repositories/:repository
    const { repository } = useParams()

    {/* cria variável do tipo da interface GithubRepository iniciando-a com null} */}
    const [repo, setRepo] = React.useState<GithubRepository | null>(null);
    {/* vetor contendo as issues */}
    const [issues, setIssues] = React.useState<GithubIssue[]>([])
    // como repository tem -, temos que converter novamente para /
    let aux = repository?.replace("-", "/")
    
    {/* será executado quando a página for carregada ou a variável aux for alterada*/}

    React.useEffect( () => {
        api
            .get<GithubRepository>(`repos/${aux}`)
            .then(resultado => {
                setRepo((resultado.data))
            })
        
        api
           .get<GithubIssue[]>(`repos/${aux}/issues`)
           .then( resposta => setIssues(resposta.data)) 
    } , [aux] )

    
    return (
        <>
            <Header>
                <img src={logo} alt="GitCollection"/>
                <Link 
                    to="/">
                    <FiChevronLeft/>
                </Link>
            </Header>
            {repo && (
                <RepoInfo>
                    <header>
                        <img src={repo.owner.avatar_url} alt={repo.owner.login}/>
                        <div>
                            <strong> {repo.full_name} </strong>
                            <p> {repo.description} </p>
                        </div>
                    </header>
                    <ul>
                        <li> 
                            <strong> {repo.stargazers_count} </strong> <span> Stars </span>
                        </li>
                        <li>
                            <strong> {repo.forks_count} </strong> <span> Forks </span>
                        </li>
                        <li>
                            <strong> {repo.open_issues_count} </strong> <span> Issues abertas </span>
                        </li>
                    </ul>
                </RepoInfo>
            )}

            <Issue>
                {
                    issues.map( issue => (
                        <a href={issue.html_url} key={issue.id}>
                            <div>
                                <strong> {issue.title}</strong>
                                <p> {issue.user.login} </p>
                            </div>
                            <FiChevronRight size={20}/>
                        </a>
                    ))
                }
            </Issue>
        </>
    )
}   
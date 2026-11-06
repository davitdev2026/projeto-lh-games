import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('projeto-lh-games');

  // Controla se estamos na página 'home' ou na página 'login'
  paginaAtiva: string = 'home';

  // Controla se dentro do login estamos na aba 'login' ou 'cadastro'
  telaAutenticacao: string = 'login';

  // Dados guardados do cadastro
  usuarioCadastrado = {
    usuario: '',
    email: '',
    senha: '',
  };

  // Dados digitados no login
  loginDados = {
    usuario: '',
    senha: '',
  };

  // Dados digitados no cadastro
  cadastroDados = {
    usuario: '',
    email: '',
    senha: '',
  };

  mensagemErro: string = '';

  // Função para mudar de página principal (Home / Login)
  irParaPagina(pagina: string) {
    this.paginaAtiva = pagina;
    this.mensagemErro = '';
  }

  // Função para alternar entre login e cadastro dentro da página de autenticação
  mudarTelaAuth(tela: string) {
    this.telaAutenticacao = tela;
    this.mensagemErro = '';
  }

  // Atalho para evitar qualquer erro de compatibilidade de nomes no HTML
  mudarTela(tela: string) {
    this.mudarTelaAuth(tela);
  }

  fazerCadastro(event: Event) {
    event.preventDefault();
    this.usuarioCadastrado = { ...this.cadastroDados };
    alert('Cadastro realizado com sucesso! Faça o seu login.');
    this.cadastroDados = { usuario: '', email: '', senha: '' };
    this.mudarTelaAuth('login');
  }

  fazerLogin(event: Event) {
    event.preventDefault();
    this.mensagemErro = '';

    if (!this.loginDados.usuario || !this.loginDados.senha) {
      this.mensagemErro = 'Por favor, preencha todos os campos.';
      return;
    }

    if (!this.usuarioCadastrado.usuario) {
      this.mensagemErro = 'Usuário não encontrado. Cadastre-se primeiro!';
      return;
    }

    if (
      this.loginDados.usuario === this.usuarioCadastrado.usuario &&
      this.loginDados.senha === this.usuarioCadastrado.senha
    ) {
      alert('Login efetuado com sucesso!');
      this.loginDados = { usuario: '', senha: '' };
      this.irParaPagina('home');
    } else {
      this.mensagemErro = 'Usuário ou senha incorretos. Tente novamente!';
    }
  }
}

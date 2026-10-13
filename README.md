# TAVALIM — redesign da homepage (versão 1)

Site estático (HTML, CSS e JavaScript puros, sem dependências). Funciona no GitHub + Netlify sem build.

## Arquivos
- `index.html` — página completa
- `css/style.css` — estilos
- `js/main.js` — cabeçalho, menu, vídeo, rolagem
- `js/artists.js` — **lista de artistas (preencher)**
- `assets/` — logotipo e favicon atuais

## Como testar
Abra `index.html` no navegador. Na seção de artistas, arraste para o lado (mouse ou dedo), use as setas do teclado ou os botões.

## Antes de publicar
1. As fotos `assets/1.JPEG` a `4.JPEG` já existem no repositório do site principal; copie esta pasta por cima mantendo-as.
2. Artistas: edite `js/artists.js` e coloque as fotos (proporção 3:4, ex.: 1200x1600) em `assets/artistas/`. Sem foto, o cartão mostra as iniciais.
3. Formulário: usa Netlify Forms (`data-netlify`). Ative a notificação por e-mail em Netlify > Forms.
4. Publique primeiro em uma branch (Netlify gera um link de prévia) e só depois faça merge na `main`.

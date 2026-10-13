/*
  ARTISTAS ATENDIDOS PELA TAVALIM
  --------------------------------
  Esta lista alimenta a seção "Artistas" (baralho). Para adicionar alguém, copie uma linha.
  Enquanto a lista estiver vazia, a seção e o link do menu ficam ocultos.

  Campos:
    name  — nome exibido (obrigatório)
    photo — foto em PROPORÇÃO 3:4 (retrato), ex.: 1200 x 1600 px. Opcional: se o arquivo
            não existir, o cartão mostra as iniciais com a cor da marca.
    note  — texto curto opcional (ex.: "Turnê 2025"). Só escreva o que for verdade.

  Coloque as fotos em assets/artistas/ (JPG ou WebP). Use apenas imagens com autorização de uso.
*/
window.TAVALIM_ARTISTS = [
  { name: "Zé Vaqueiro",    photo: "assets/artistas/ze-vaqueiro.jpg" },
  { name: "Tarcisio",       photo: "assets/artistas/tarcisio.jpg" },
  { name: "Kadu Martins",   photo: "assets/artistas/kadu-martins.jpg" },
  { name: "Willy Vaqueiro", photo: "assets/artistas/willy-vaqueiro.jpg" },
  { name: "Tayrone",        photo: "assets/artistas/tayrone.jpg" },
  { name: "Talita Mel",     photo: "assets/artistas/talita-mel.jpg" },
  { name: "Waldonys",       photo: "assets/artistas/waldonys.jpg" }
];

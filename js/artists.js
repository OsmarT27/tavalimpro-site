/*
  ARTISTAS ATENDIDOS PELA TAVALIM
  --------------------------------
  Esta lista alimenta o baralho de cartas. Para adicionar alguém, copie uma linha.
  A carta "Entre outros" deve ficar por último (more: true).

  Campos:
    name  — nome exibido (obrigatório)
    photo — foto em retrato 3:4, ex.: 1200 x 1600 px, salva em assets/artistas/.
            Opcional: sem foto, a carta mostra as iniciais com uma cor da marca.
            Exemplo: { name: "Zé Vaqueiro", photo: "assets/artistas/ze-vaqueiro.jpg" }
    note  — texto curto opcional (ex.: "Turnê 2025"). Só escreva o que for verdade.
    more  — true apenas na carta "Entre outros".

  Use somente imagens com autorização de uso.
*/
window.TAVALIM_ARTISTS = [
  { name: "Zé Vaqueiro", photo: "assets/artistas/ze-vaqueiro.webp" },
  { name: "Tarcísio do Acordeon", photo: "assets/artistas/tarcisio.webp" },
  { name: "Kadu Martins", photo: "assets/artistas/kadu.webp" },
  { name: "Willy Vaqueiro", photo: "assets/artistas/willy.webp" },
  { name: "Tayrone", photo: "assets/artistas/tayrone.webp" },
  { name: "Talita Mel", photo: "assets/artistas/talita.webp" },
  { name: "Yrlan Costa", photo: "assets/artistas/yrlan.webp" },
  { name: "Waldonys", photo: "assets/artistas/waldonys.webp" },
  { name: "Forró Medôin", photo: "assets/artistas/medoin.webp" },
  { name: "Forró De Nois", photo: "assets/artistas/nois.webp" },
  { name: "Guilherme Ferri", photo: "assets/artistas/ferri.webp" },
  { name: "Wallas Arrais", photo: "assets/artistas/wallas.webp" },
  { name: "Nanara Bello", photo: "assets/artistas/nanara.webp" },
  { name: "Fulô de Mandacaru", photo: "assets/artistas/fulo.webp" },
  { name: "Capim com Mel", photo: "assets/artistas/capim.webp" },
  { name: "Flávio Leandro", photo: "assets/artistas/FlavioL.webp" },
  { name: "Batista Lima", photo: "assets/artistas/barista.webp" },
  { name: "Ranieri", photo: "assets/artistas/ranieri.webp" },
  { name: "Edson Gomes", photo: "assets/artistas/edson.webp" },
  { name: "Túlio Duarte", photo: "assets/artistas/tulio.webp" },
  { name: "Devinho Novaes", photo: "assets/artistas/devinho.webp" },
  { name: "Kevi Jonny", photo: "assets/artistas/kevi.webp" },
  { name: "Marcelo & Rayane", photo: "assets/artistas/marcelo.webp" },
  { name: "Caninana", photo: "assets/artistas/caninana.webp" },
  { name: "Entre outros", note: "E muitos outros palcos.", more: true }
];

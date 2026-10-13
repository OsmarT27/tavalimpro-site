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
  { name: "Zé Vaqueiro", photo: "assets/artistas/ze-vaqueiro.jpg" },
  { name: "Tarcísio do Acordeon", photo: "assets/artistas/tarcisio.jpg" },
  { name: "Kadu Martins", photo: "assets/artistas/kadu.jpg" },
  { name: "Willy Vaqueiro", photo: "assets/artistas/willy.jpg" },
  { name: "Tayrone", photo: "assets/artistas/tayrone.jpg" },
  { name: "Talita Mel", photo: "assets/artistas/talita.jpg" },
  { name: "Yrlan Costa", photo: "assets/artistas/yrlan.jpg" },
  { name: "Waldonys", photo: "assets/artistas/waldonys.jpg" },
  { name: "Forró Medôin", photo: "assets/artistas/medoin.jpg" },
  { name: "Forró De Nois", photo: "assets/artistas/nois.jpg" },
  { name: "Guilherme Ferri", photo: "assets/artistas/ferri.jpg" },
  { name: "Wallas Arrais", photo: "assets/artistas/wallas.jpg" },
  { name: "Nanara Bello", photo: "assets/artistas/nanara.jpg" },
  { name: "Fulô de Mandacaru", photo: "assets/artistas/fulo.jpg" },
  { name: "Capim com Mel", photo: "assets/artistas/capim.jpg" },
  { name: "Flávio Leandro", photo: "assets/artistas/FlavioL.jpg" },
  { name: "Batista Lima", photo: "assets/artistas/barista.jpg" },
  { name: "Ranieri", photo: "assets/artistas/ranieri.jpg" },
  { name: "Edson Gomes", photo: "assets/artistas/edson.jpg" },
  { name: "Túlio Duarte", photo: "assets/artistas/tulio.jpg" },
  { name: "Devinho Novaes", photo: "assets/artistas/devinho.jpg" },
  { name: "Kevi Jonny", photo: "assets/artistas/kevi.jpg" },
  { name: "Marcelo & Rayane", photo: "assets/artistas/marcelo.jpg" },
  { name: "Caninana", photo: "assets/artistas/caninana.jpg" },
  { name: "Entre outros", note: "E muitos outros palcos.", more: true }
];

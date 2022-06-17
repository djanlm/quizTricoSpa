const feminino = document.getElementById("feminino");
const masculino = document.getElementById("masculino");

const liso = document.getElementById("liso");
const ondulado = document.getElementById("ondulado");
const crespo = document.getElementById("crespo");
const curto = document.getElementById("curto");

const coloracao = document.getElementById("coloracao");
const loiros = document.getElementById("loiros");
const alisamento = document.getElementById("alisamento");
const alongamentoQueratina = document.getElementById("alongamento-queratina");
const alongamentoFita = document.getElementById("alongamento-fita");
const semQuimica = document.getElementById("sem-quimica");

const raizOleosa = document.getElementById("raiz-oleosa");
const raizNormal = document.getElementById("raiz-normal");
const raizCoceira = document.getElementById("raiz_coceira_descamacao");

const fioRessecado = document.getElementById("fio-ressecado");
const fioNormal = document.getElementById("fio-normal");
const fioCurto = document.getElementById("curto");
const fioNaoHidratado = document.getElementById("fio-nao-hidratado");

//const coceira = document.getElementById("coceira");
const caspa = document.getElementById("caspa");
const feridas = document.getElementById("feridas");
//const ardencia = document.getElementById("ardencia");
const oleosidade = document.getElementById("oleosidade");
const ressecamento = document.getElementById("ressecamento");
//const descamacao = document.getElementById("descamacao");
const queda = document.getElementById("queda");
const calvicie = document.getElementById("calvicie");
const naoSei = document.getElementById("nao-sei");
const nenhumProblema = document.getElementById("nenhum-problema");
const parentes = document.getElementById("parentes");

const comeCarne = document.getElementById("carne");
const naoComeCarne = document.getElementById("nao-come-carne");
const atividadeFisica = document.getElementById("atividade-fisica");
const dormeBem = document.getElementById("dorme");

const tireoide = document.getElementById("tireoide");
const ovario = document.getElementById("ovario");
const menopausa = document.getElementById("menopausa");
const hormonios = document.getElementById("hormonios");
const estresse = document.getElementById("estresse");
const doencaAutoimune = document.getElementById("doenca-autoimune");
const medicamentos = document.getElementById("medicamentos");
const posParto = document.getElementById("pos-parto");
const amamentando = document.getElementById("amamentando");
const anestesia = document.getElementById("anestesia");
const cirurgia = document.getElementById("cirurgia");
const transplanteCapilar = document.getElementById("transplante-capilar");
const cabeloPresoMolhado = document.getElementById("cabelo-preso");
const dormindoMolhado = document.getElementById("dormindoCabeloMolhado");
const oleosECremes = document.getElementById("oleos-cremes");
const praia = document.getElementById("praia");
const gel = document.getElementById("gel");
const fuma = document.getElementById("fuma");
const infeccao = document.getElementById("infeccao");
const nenhumaOpcao = document.getElementById("nenhuma-opcao");

const crescimento = document.getElementById("crescimento");
const hidratacao = document.getElementById("hidratacao");
const controleDeOleosidade = document.getElementById("controle-de-oleosidade");
const reparacaoImediata = document.getElementById("reparacao-imediata");
const fortificacaoFios = document.getElementById("fortificacao-fios");
const antiFrizz = document.getElementById("anti-frizz");
const prevencaoQueda = document.getElementById("prevencao-queda");
const controleDescamacao = document.getElementById("controle-descamacao");

// *************************************************************************** //
var produtosArray = [];
var currentBoxIndex = 0; //keeps track of which box is showing in the screen
var canMoveToNextBox = false; //permite mudar pra o próximo box ao apertar o botão de próximo quando algum botao tiver sido marcado
var allBoxes = document.getElementsByClassName("box"); //todas as box do questionario
const divMedicamentosTomados = document.getElementById(
  "div-medicamentos-tomados"
);
const divNumeroDePerguntas = document.getElementById("div-numero-de-perguntas"); //o número de perguntas vai depender no número de boxes com perguntas
const closeButton = document.getElementById("close-button"); //botão que fecha o teste
const botaoIniciarTeste = document.querySelector("#div-teste-button > button"); //botão que vai abrir a div com a pagina de abertura do questionario
const divResultados = document.querySelector(".resultados");

const divContainerQuestionario = document.querySelector(
  ".container-questionario"
);
const allNextButtons = document.getElementsByClassName("botao-guia-proximo");
const allPrevButtons = document.getElementsByClassName("botao-guia-anterior");
const divAlerta = document.getElementsByClassName("alerta"); // div de alerta que aparece quando o usuário tenta passar pra próxima pergunta sem ter respondido à pergunta atual

divNumeroDePerguntas.innerHTML = `${allBoxes.length - 1} perguntas`;
// adiciona eventListener de click nos botões de navegação
Array.from(allNextButtons).forEach((element) => {
  element.addEventListener("click", moveToTheNextBox);
});
Array.from(allPrevButtons).forEach((element) => {
  element.addEventListener("click", moveToThePreviousBox);
});

botaoIniciarTeste.addEventListener("click", abrirQuestionario);
closeButton.addEventListener("click", encerraTeste);
masculino.addEventListener("click", handleClickOnMasculinoRadioButton);
feminino.addEventListener("click", handleClickOnFemininoRadioButton);

async function fetchData() {
  const requestURL = "../imagensIcones.json";
  const request = new Request(requestURL);

  const response = await fetch(request);
  const data = await response.json();
  return data;
}
async function handleClickOnMasculinoRadioButton() {
  ovario.parentElement.classList.add("oculta");
  menopausa.parentElement.classList.add("oculta");
  posParto.parentElement.classList.add("oculta");
  amamentando.parentElement.classList.add("oculta");

  const dataImages = await fetchData();
  const radioButtonImgArray = document.querySelectorAll(
    ".div-radio-button-content >img"
  );

  for (let i = 0; i < dataImages.imagensParaHomems.length; i++) {
    radioButtonImgArray[i].src = dataImages.imagensParaHomems[i];
  }
}

async function handleClickOnFemininoRadioButton() {
  ovario.parentElement.classList.remove("oculta");
  menopausa.parentElement.classList.remove("oculta");
  posParto.parentElement.classList.remove("oculta");
  amamentando.parentElement.classList.remove("oculta");

  const dataImages = await fetchData();
  const radioButtonImgArray = document.querySelectorAll(
    ".div-radio-button-content >img"
  );

  for (let i = 0; i < dataImages.imagensParaMulheres.length; i++) {
    radioButtonImgArray[i].src = dataImages.imagensParaMulheres[i];
  }
}

function encerraTeste() {
  divResultados.classList.add("oculta");
  divContainerQuestionario.classList.add("oculta");
  divMedicamentosTomados.classList.remove("box");
  Array.from(listaDeProdutos).forEach((produto) => {
    if (produtosArray.includes(produto.id)) {
      console.log(produto.id);
      produto.classList.add("oculta");
    }
  });
  //reseta variaveis
  currentBoxIndex = 0;
  canMoveToNextBox = false;
  produtosArray = [];
}

function abrirQuestionario() {
  allBoxes[0].classList.remove("oculta");
  divContainerQuestionario.classList.remove("oculta");
}

function moveToTheNextBox() {
  validadeBoxForm(allBoxes[currentBoxIndex]); //checa se o usuario respondeu a pergunta e altera o valor da variavel canMoveToNextBox

  const question = allBoxes[currentBoxIndex].querySelector(".div-pergunta > p"); //armazena a pergunta pra que seja possível alterar a cor dela quando o usuario não responder a pergunta

  // caso o usuário tenha respondido à pergunta
  if (canMoveToNextBox) {
    divAlerta[currentBoxIndex - 1].style.display = "none"; // caso o texto de alerta tenha sido mostrado, ele vai desaparecer novamente
    question.style.color = "rgba(0, 0, 0, 0.9)"; // volta pra cor normal da pergunta
    question.textContent = question.textContent.split("*")[0]; // remove o asterisco da pergunta

    allBoxes[currentBoxIndex].classList.remove("animate-alerta");
    allBoxes[currentBoxIndex].classList.add("oculta"); // esconde a box atual
    currentBoxIndex++;
    if (currentBoxIndex < allBoxes.length) {
      allBoxes[currentBoxIndex].classList.remove("oculta"); // mostra a próxima box
    }
  } else {
    question.style.color = "red";
    question.append("*");
    divAlerta[currentBoxIndex - 1].style.display = "flex";

    allBoxes[currentBoxIndex].classList.add("animate-alerta"); // causa a animação pra chamar atenção do usuário que não respondeu a pergunta
  }
}

function moveToThePreviousBox() {
  allBoxes[currentBoxIndex].classList.add("oculta");
  if (currentBoxIndex > 0) currentBoxIndex--;
  allBoxes[currentBoxIndex].classList.remove("oculta");
}

function iniciarQuestionario() {
  allBoxes[0].classList.add("oculta");
  currentBoxIndex++;
  allBoxes[currentBoxIndex].classList.remove("oculta");
}

function validadeBoxForm(currentBox) {
  // se não for o box que tem o input de texto então checa pelos radio ou checkbox buttons
  if (currentBox.querySelectorAll("input[type=text]").length === 0) {
    toggleCanMoveToNextBoxBasedOnButtons(
      currentBox.querySelectorAll("input:checked")
    );
  } else {
    toggleCanMoveToNextBoxBasedOnTextInput(
      currentBox.querySelectorAll("input[type=text]")
    );
  }
}

function toggleCanMoveToNextBoxBasedOnButtons(clickedButtonsArray) {
  if (checkIfAnyInputButtonWasClicked(clickedButtonsArray)) {
    canMoveToNextBox = true;
  } else {
    canMoveToNextBox = false;
  }
}

function toggleCanMoveToNextBoxBasedOnTextInput(textFieldsArray) {
  textFieldsArray.forEach((textField) => {
    if (checkIfTextFieldIsEmpty(textField)) {
      canMoveToNextBox = false;
    } else {
      canMoveToNextBox = true;
    }
  });
}

function checkIfAnyInputButtonWasClicked(clickedButtonsArray) {
  if (clickedButtonsArray.length === 0) return false;
  return true;
}
function checkIfTextFieldIsEmpty(textField) {
  // If the length of the element's string is 0 then returns true
  if (textField.value.length == 0) return true;
  return false;
}

function addMedicamentoQuestionBox(element) {
  if (element.checked) {
    console.log(divMedicamentosTomados);
    divMedicamentosTomados.classList.add("box");
    allBoxes = document.getElementsByClassName("box");
  } else {
    divMedicamentosTomados.classList.remove("box");
    allBoxes = document.getElementsByClassName("box");
  }
}

function addShampooEstimulanteOrShampooCremeDeLimpeza() {
  if (oleosidade.checked || raizOleosa.checked) {
    produtosArray.push("shampooEstimulante");
  } else {
    produtosArray.push("shampooCremeDeLimpeza3Em1");
  }
}

function addProteina() {
  produtosArray.push("proteinas");
}

function removeProteina() {
  while (produtosArray.includes("proteinas")) {
    produtosArray.splice(produtosArray.indexOf("proteinas"), 1);
  }
}

function addVitaminasMulher() {
  produtosArray.push("vitaminas-mulher");
}

function addVitaminasHomem() {
  produtosArray.push("vitaminas-homem");
}

function addShampooCremeDeLimpeza3Em1() {
  produtosArray.push("shampooCremeDeLimpeza3Em1");
}

function addLeaveIn() {
  produtosArray.push("leaveIn");
}

function addMascaraHydraBalm() {
  produtosArray.push("mascaraHydraBalm");
}

function addCondicionadorNeutrum() {
  produtosArray.push("condicionadorNeutrum");
}

function addCondicionadorHydrabalm() {
  produtosArray.push("condicionadorHydrabalm");
}

function addShampooDanificados() {
  produtosArray.push("shampooDanificados");
}

function addShampooCabelosSecosESensiveis() {
  produtosArray.push("shampooCabelosSecosESensiveis");
}

function addShampooNeutrum() {
  produtosArray.push("shampooNeutrum");
}

function addEnergyPower() {
  produtosArray.push("energyPower");
}

function addCondicionadorDanificados() {
  produtosArray.push("condicionadorDanificados");
}

function addMascaraDanificados() {
  produtosArray.push("mascaraDanificados");
}

function addKitSOS() {
  produtosArray.push("kitSOS");
}

function addMascaraRefreshScalp() {
  produtosArray.push("mascaraRefreshScalpTherapy");
}

function addCondicionadorEstimulante() {
  produtosArray.push("condicionadorEstimulante");
}

function addShampooEnergizante() {
  produtosArray.push("shampooEnergizante");
}

function addTonico() {
  produtosArray.push("tonico");
}

function addShampooEstimulante() {
  produtosArray.push("shampooEstimulante");
}

function addCondicionadorEnergizante() {
  produtosArray.push("condicionadorEnergizante");
}

function addCondicionadorOleosos() {
  produtosArray.push("condicionadorOleosos");
}

function addShampooGreasyHair() {
  produtosArray.push("shampooGreasyHair");
}

const listaDeProdutos = document.getElementsByClassName("card-produto");

function showTestResult(event) {
  event.preventDefault();

  populateArrayDeProdutos();
  //filtra elementos repetidos
  let produtosArraySemRepetidos = produtosArray.filter((produto, index) => {
    return produtosArray.indexOf(produto) === index; //indexOf retorna o indice do primeiro elemento encontrado, portanto o segundo elemento repetido retorna falso
  });

  Array.from(listaDeProdutos).forEach((produto) => {
    if (produtosArraySemRepetidos.includes(produto.id)) {
      console.log(produto.id);
      produto.classList.remove("oculta");
    }
  });

  moveToTheNextBox();

  divResultados.classList.remove("oculta");

  //form.submit();
  form.reset();
  console.log(produtosArraySemRepetidos);
  // console.log(produtosArray);
}

function esvaziaArrayDeProdutos() {
  produtosArray.splice(0, produtosArray.length);
}

function populateArrayDeProdutos() {
  if (feminino.checked) {
    if (liso.checked) {
    } else if (ondulado.checked) {
    } else if (crespo.checked) {
    } else if (curto.checked) {
    }

    if (raizOleosa.checked) {
      addShampooEstimulante();
      addCondicionadorDanificados();
      addProteina();
      addVitaminasMulher();
      addMascaraRefreshScalp();
      addTonico();
    } else if (raizNormal.checked) {
      addShampooEstimulante();
      addCondicionadorHydrabalm();
      addTonico();
      addVitaminasMulher();
      addProteina();
      addMascaraDanificados();
    } else if (raizCoceira.checked) {
      addShampooEstimulante();
      addShampooCremeDeLimpeza3Em1();
      addMascaraRefreshScalp();
      addCondicionadorDanificados();
      addVitaminasMulher();
      addProteina();
      addTonico();
    }

    if (fioRessecado.checked) {
    } else if (fioNormal.checked) {
    } else if (fioCurto.checked) {
    } else if (fioNaoHidratado.checked) {
    }

    // if (coceira.checked) {
    //   addShampooEstimulante();
    //   addMascaraRefreshScalp();
    //   addShampooCremeDeLimpeza3Em1();
    // }

    if (oleosidade.checked) {
    }

    if (feridas.checked) {
    }

    if (caspa.checked) {
    }

    if (queda.checked) {
    }

    // if (descamacao.checked) {

    // }

    if (antiFrizz.checked) {
      addLeaveIn();
      addEnergyPower();
      addKitSOS();
    }

    if (fortificacaoFios.checked) {
    }

    if (reparacaoImediata.checked) {
      addLeaveIn();
      addEnergyPower();
      addKitSOS();
    }
    if (crescimento.checked) {
    }
    if (hidratacao.checked) {
    }

    if (controleDescamacao.checked) {
      //addShampooEstimulanteOrShampooCremeDeLimpeza();
    }

    if (prevencaoQueda.checked) {
    }
  } else if (masculino.checked) {
    ///////////// homens

    if (liso.checked) {
    } else if (ondulado.checked) {
    } else if (crespo.checked) {
    } else if (curto.checked) {
    }

    if (fioRessecado.checked) {
    } else if (fioNormal.checked) {
    } else if (fioCurto.checked) {
    } else if (fioNaoHidratado.checked) {
    }
    if (raizOleosa.checked) {
      addShampooEstimulante();
      addTonico();
      addCondicionadorEstimulante();
      addVitaminasHomem();
    } else if (raizNormal.checked) {
      addTonico();
      addShampooEnergizante();
      addVitaminasHomem();
      addCondicionadorEnergizante();
    } else if (raizCoceira.checked) {
      addShampooEstimulante();
      addMascaraRefreshScalp();
      addTonico();
      addVitaminasHomem();
    }

    // if (coceira.checked) {
    //   addShampooEstimulante();
    //   addMascaraRefreshScalp();
    // }

    if (oleosidade.checked) {
    }

    if (feridas.checked) {
    }

    if (caspa.checked) {
    }

    if (queda.checked) {
    }

    // if (descamacao.checked) {
    //   addShampooEstimulante();
    //   addMascaraRefreshScalp();
    // }

    if (antiFrizz.checked) {
      addMascaraRefreshScalp();
    }

    if (fortificacaoFios.checked) {
    }

    if (reparacaoImediata.checked) {
    }
    if (crescimento.checked) {
    }
    if (hidratacao.checked) {
      addMascaraRefreshScalp();
    }
    if (controleDescamacao.checked) {
    }

    if (prevencaoQueda.checked) {
    }
  } ///fim homens

  // if (
  //   coloracao.checked ||
  //   loiros.checked ||
  //   alisamento.checked ||
  //   alongamentoQueratina.checked ||
  //   alongamentoFita.checked
  // ) {
  //   addProteina();
  //   addCondicionadorDanificados();
  //   addEnergyPower();
  //   addShampooDanificados();
  // }

  //remove proteina (pre-shampoo) caso cabelo oleoso esteja marcado
  // if (oleosidade.checked || raizOleosa.checked) {
  //   removeProteina();
  // }
}

const form = document.getElementById("form-questionario");
form.addEventListener("submit", showTestResult);
